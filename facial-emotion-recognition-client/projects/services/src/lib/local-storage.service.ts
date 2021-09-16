import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements Storage {
  private _storageChanged$ = new Subject<RawStorageChangeEvent>()
  public storageChanged$ = this._storageChanged$.asObservable()

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
    this._storageChanged$.next({key, value})
  }

  private getValueObservable<T extends StorageChangeEvent>(ob$: Observable<T>, key: string, fn: (key: string) => T['value'] | null) {
    return ob$.pipe(
      filter(e => e.key === key),
      map(e => e.value),
      startWith(fn(key)),
    )
  }

  setAuthorization(authorization: string) {
    this.setItem('authorization', authorization)
  }
  get authorization$() {
    return this.getValueObservable(this._storageChanged$, 'authorization', this.getItem.bind(this))
  }

}

interface StorageChangeEvent {
  key: string,
  value: string
}

interface RawStorageChangeEvent extends StorageChangeEvent {
}
