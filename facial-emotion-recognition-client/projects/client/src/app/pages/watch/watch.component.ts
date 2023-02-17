import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap, take, takeUntil, scan, startWith, shareReplay, buffer } from 'rxjs/operators';
import { WatchService } from './watch.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit, OnDestroy, AfterViewInit {
  private ngOnInit$$ = new Subject()
  private ngAfterViewInit$$ = new Subject()
  private ngOnDestroy$$ = new Subject()

  @ViewChild('webcam') webcamVideo?: ElementRef<HTMLVideoElement>
  get webcamVideoEl() {
    const el = this.webcamVideo?.nativeElement
    return el instanceof HTMLVideoElement ? el : null
  }

  private webcamOpening$$ = new Subject<boolean>()
  webcamOpening$ = this.webcamOpening$$.pipe(scan((acc, value) => value === undefined ? !acc : value, true), startWith(true))
  webcamOpeningSub = this.webcamOpening$.subscribe(opening => {
    if (opening) {
      this.ws.getWebcamStream().pipe(take(1)).subscribe(s => this._webcamStream$.next(s))
    } else {
      const stream = this._webcamStream$.value
      if (stream) this.ws.stopTracks(stream)
      this._webcamStream$.next(null)
    }
  })

  private _webcamStream$ = new BehaviorSubject<MediaStream | null>(null)
  webcamStream$ = this._webcamStream$.asObservable()

  playingTime$?: Observable<string>

  detectingResult$ = this.ngAfterViewInit$$.pipe(
    switchMap(() => this.webcamOpening$),
    filter(opening => opening && this.webcamVideoEl instanceof HTMLVideoElement),
    switchMap(() => this.ws.startDetecting(this.webcamVideoEl!).pipe(
      takeUntil(this.webcamOpening$.pipe(filter(opening => !opening))),
    )),
    shareReplay(),
  )
  detectingResultSub = this.detectingResult$.subscribe(console.log)
  detectingResultBuffer$ = this.detectingResult$.pipe(buffer(this.ngOnDestroy$$))

  saveResults$$ = new Subject()
  saveResultsSub = this.detectingResult$.pipe(
    buffer(this.saveResults$$),
    switchMap(results => this.ws.saveResults(results))
  ).subscribe()

  emotionText$ = this.detectingResult$.pipe(
    // throttleTime(2000),
    // map(({ value, expressionCn }) => value ? `当前情绪可能是${expressionCn}` : '未检测到人脸'),
    map(({ value, expression }) => value ? expression : 'Please try to turn your face around'),
  )

  webcamButtonText$ = this.webcamOpening$.pipe(map(opening => opening ? '关闭摄像头' : '开启摄像头'))

  constructor(
    private ws: WatchService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.ngOnInit$$.next()
    this.ngOnInit$$.complete()
    
    this.playingTime$ = this.ws.startTimer()
  }

  ngAfterViewInit(): void {
    this.ngAfterViewInit$$.next()
    this.ngAfterViewInit$$.complete()
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$$.next()
    this.ngOnDestroy$$.complete()

    this.webcamOpening$$.next(false)
    this.detectingResultSub.unsubscribe()
    this.saveResultsSub.unsubscribe()
    this.webcamOpeningSub.unsubscribe()

    this.saveResults$$.complete()
  }

  toggleWebcam(opening?: boolean) {
    this.webcamOpening$$.next(opening)
  }

  leave() {
    this.location.back()
    this.saveResults$$.next()
  }

}
