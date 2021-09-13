import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, switchMap, take, tap, pairwise, takeUntil, scan, startWith, mergeMap, debounceTime, throttleTime, shareReplay, buffer } from 'rxjs/operators';
import { DetectingResult, WatchService } from './watch.service';
import { create } from 'rxjs-spy'
import { tag } from 'rxjs-spy/operators'
import { Location } from '@angular/common';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit, OnDestroy, AfterViewInit {
  private _ngOnInit$ = new Subject()
  private _ngAfterViewInit$ = new Subject()
  private _ngOnDestroy$ = new Subject()

  @ViewChild('webcam') webcamVideo?: ElementRef<HTMLVideoElement>
  get webcamVideoEl() {
    if (this.webcamVideo?.nativeElement instanceof HTMLVideoElement) return this.webcamVideo?.nativeElement
    else return null
  }

  private _webcamOpening$ = new Subject<boolean>()
  webcamOpening$ = this._webcamOpening$.pipe(scan((acc, value) => value === undefined ? !acc : value, true), startWith(true))
  webcamOpening$$ = this.webcamOpening$.subscribe(opening => {
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

  detectingResult$ = this._ngAfterViewInit$.pipe(
    switchMap(() => this.webcamOpening$),
    filter(opening => opening),
    switchMap(() => this.ws.startDetecting(this.webcamVideoEl!).pipe(
      takeUntil(this.webcamOpening$.pipe(filter(opening => !opening))),
    )),
    shareReplay(),
  )
  detectingResult$$ = this.detectingResult$.subscribe(console.log)
  detectingResultBuffer$ = this.detectingResult$.pipe(buffer(this._ngOnDestroy$))
  detectingResultBuffer$$ = this.detectingResultBuffer$.subscribe(console.warn)

  // emotionText$ = of('x')
  emotionText$ = this.detectingResult$.pipe(
    // throttleTime(2000),
    map(({ value, expressionCn }) => value ? `当前情绪可能是${expressionCn}` : '未检测到人脸'),
  )

  webcamButtonText$ = this.webcamOpening$.pipe(map(opening => opening ? '关闭摄像头' : '开启摄像头'))

  constructor(
    private ws: WatchService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this._ngOnInit$.next()
    this._ngOnInit$.complete()
    
    this.playingTime$ = this.ws.startTimer()
  }

  ngAfterViewInit(): void {
    this._ngAfterViewInit$.next()
    this._ngAfterViewInit$.complete()

    console.log('ngAfterViewInit', this.webcamVideoEl)
  }

  ngOnDestroy(): void {
    this._ngOnDestroy$.next()
    this._ngOnDestroy$.complete()

    this._webcamOpening$.next(false)
    this.detectingResult$$.unsubscribe()
    this.detectingResultBuffer$$.unsubscribe()
    this.webcamOpening$$.unsubscribe()
  }

  toggleWebcam(opening?: boolean) {
    this._webcamOpening$.next(opening)
  }

  leave() {
    this.location.back()
    this.ws.saveResults([]).subscribe(console.log)
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: BeforeUnloadEvent) {
    console.log('beforeunload', event)
    // this.ws.saveResults([]).subscribe(console.log)
    // event.preventDefault()
    // event.returnValue = 'saving'
  }

}
