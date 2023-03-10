import { Injectable, OnDestroy } from '@angular/core';
import { from, interval, Observable, of } from 'rxjs'
import { nets, detectSingleFace, TinyFaceDetectorOptions, FaceExpressions } from 'face-api.js';
import { map, mergeMap, shareReplay, switchMap } from 'rxjs/operators';
import { tag } from 'rxjs-spy/operators'
import { LogService } from 'projects/services/src/public-api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WatchService implements OnDestroy {

  constructor(
    private http: HttpClient,
    private log: LogService,
  ) { }

  ngOnDestroy(): void {
  }

  getWebcamStream() {
    return from(navigator.mediaDevices.getUserMedia({ video: true, audio: false })).pipe(
      tag('getWebcamStream'),
    )
  }

  startDetecting(videoEl: HTMLVideoElement, period: number = 1000): Observable<DetectingResult> {
    return from(this.loadModel()).pipe(
      switchMap(() => interval(period)),
      mergeMap(() => {
        const time = Date.now()
        return from(this.detect(videoEl)).pipe(
          map(result => ({ time, result }))
        )
      }),
      map(({ time, result }) => {
        const expressions = result?.expressions
        const expression = expressions?.asSortedArray()?.[0]
        const expressionCn = WatchService.expressionsLevel[expression?.expression as ExpressionName]?.cn
        return { time, value: this.expressionToValue(expression), expressions, expression: expression?.expression, expressionCn }
      }),
    )
  }

  stopTracks(stream: MediaStream) {
    stream.getTracks().forEach(t => t.stop())
  }

  setTracksEnabled(stream: MediaStream, enabled: boolean) {
    stream.getTracks().forEach(t => t.enabled = enabled)
  }

  startTimer(period: number = 1000) {
    return of(Date.now()).pipe(
      switchMap((startTime) => interval(period).pipe(
        map(() => Date.now() - startTime)
      )),
      map(this.timeDiffToString)
    )
  }

  saveResults(results: DetectingResult[]) {
    return this.http.post('/api/watch-log', {courseId: 1, emotion: JSON.stringify(results)}).pipe(
      this.log.tap1('saveResults'),
      shareReplay(),
    )
  }

  private async loadModel() {
    if (!nets.tinyFaceDetector.params) await nets.tinyFaceDetector.load('/assets/models')
    if (!nets.faceExpressionNet.params) await nets.faceExpressionNet.load('/assets/models')
  }

  private async detect(videoEl: HTMLVideoElement) {
    return await detectSingleFace(videoEl, new TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: 0.5 })).withFaceExpressions()
  }

  private expressionToValue(expr?: { expression: string; probability: number; }) {
    if (expr) {
      const base = WatchService.expressionsLevel[expr?.expression as ExpressionName].baseValue
      return base < 0 ? base - expr.probability : base + expr.probability
    } else return
  }

  private timeDiffToString(milliseconds: number): string {
    const hh = Math.floor(milliseconds / 1000 / 60 / 60);
    milliseconds -= hh * 1000 * 60 * 60;
    const mm = Math.floor(milliseconds / 1000 / 60);
    milliseconds -= mm * 1000 * 60;
    const ss = Math.floor(milliseconds / 1000);
    milliseconds -= ss * 1000;
    return `${hh}??????${mm}??????${ss}???`
  }

  static expressionsLevel = {
    "surprised": {
      cn: '??????',
      baseValue: 2,
    },
    "happy": {
      cn: '??????',
      baseValue: 1,
    },
    "neutral": {
      cn: '??????',
      baseValue: 0,
    },
    "sad": {
      cn: '??????',
      baseValue: -1,
    },
    "disgusted": {
      cn: '??????',
      baseValue: -2,
    },
    "fearful": {
      cn: '??????',
      baseValue: -3,
    },
    "angry": {
      cn: '??????',
      baseValue: -4,
    },
  } as const

}

type ExpressionName = keyof typeof WatchService.expressionsLevel

export interface DetectingResult {
  time: number,
  value?: number,
  expressions?: FaceExpressions,
  expression?: string
  expressionCn?: string
}
