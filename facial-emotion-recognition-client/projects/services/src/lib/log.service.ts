import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  // https://www.samanthaming.com/tidbits/40-colorful-console-message/
  colors = {
    primary: 'color: #000; background: #0f0; font-size: 16px;',
    secondary: 'color: #000; background: #fe0; font-size: 14px;',
  }

  constructor() { }

  tap1(...msgs: any[]) {
    const [title, ...restMsg] = msgs
    return this.tapInfo(`%c${title}`, this.colors.primary, ...restMsg)
  }

  tap2(...msgs: any[]) {
    const [title, ...restMsg] = msgs
    return this.tapInfo(`%c${title}`, this.colors.secondary, ...restMsg)
  }

  tapInfo(...msgs: any[]) {
    return tap((...args: any[]) => this.log(...msgs, ...args));
  }

  tapWarn(...msgs: any[]) {
    return tap((...args: any[]) => this.warn(...msgs, ...args));
  }

  tapError(...msgs: any[]) {
    return tap((...args: any[]) => this.error(...msgs, ...args));
  }

  log(...msgs: any[]) {
    return level(1) && console.log(...msgs)
  }

  warn(...msgs: any[]) {
    return level(10) && console.warn(...msgs)
  }

  error(...msgs: any[]) {
    return level(20) && console.error(...msgs)
  }

}

function level(level: number) {
  // @ts-ignore
  const logLevel = window.logLevel;
  return logLevel ? level >= logLevel : true
}
