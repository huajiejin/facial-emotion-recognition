import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements Storage {

  private get storage(): Storage {
    return window.localStorage
  }

  get length(): number {
    return this.storage.length
  }

  clear(): void {
    return this.storage.clear()
  }

  key(index: number): string | null {
    return this.storage.key(index)
  }

  removeItem(key: string): void {
    return this.storage.removeItem(key)
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key)
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value)
  }

  private authorization$bs = new BehaviorSubject(this.getItem('authorization'))
  authorization$ = this.authorization$bs.asObservable()
  setAuthorization(authorization: string) {
    this.setItem('authorization', authorization)
    this.authorization$bs.next(authorization)
  }
  getAuthorization() {
    return this.authorization$bs.getValue()
  }

}
