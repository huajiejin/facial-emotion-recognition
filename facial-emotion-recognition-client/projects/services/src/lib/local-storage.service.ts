import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements Storage {
  private _storageChanged$ = new BehaviorSubject<StorageChangeEvent | null>(null)
  public storageChanged$ = this._storageChanged$.asObservable()
  private _jsonStorageChanged$ = new BehaviorSubject<JsonStorageChangeEvent | null>(null)
  public jsonStorageChanged$ = this._jsonStorageChanged$.asObservable()

  constructor() {
    window.addEventListener('storage', (e) => {
      console.log('storage', e)
    })
  }

  private get storage(): Storage {
    return window.localStorage
  }

  get length(): number {
    return this.storage.length
  }

  setIsLogin(isLogin: boolean) {
    this.setJson('isLogin', isLogin)
  }
  get isLogin$() {
    return this.jsonStorageChanged$.pipe(
      filter(e => e?.key === 'isLogin'),
      map(e => !!e?.value),
      startWith(this.getJson('isLogin'))
    )
  }

  setUser(user: User) {
    this.setJson('user', user)
  }
  get user$(): Observable<User> {
    return this.jsonStorageChanged$.pipe(
      filter(e => e?.key === 'user'),
      startWith({ value: this.getJson('user') }),
      map(e => Object.assign(new User(''), e?.value))
    )
  }

  setSourceUrl(sourceUrl: string) {
    this.setItem('sourceUrl', sourceUrl)
  }
  get sourceUrl$() {
    return this.storageChanged$.pipe(
      filter(e => e?.key === 'sourceUrl'),
      startWith({value: this.getItem('sourceUrl')}),
      map(e => e?.value || ''),
    )
  }

  setJson(key: string, value: object | boolean | number | string | null): void {
    this.setItem(key, JSON.stringify(value))
    this._jsonStorageChanged$.next({key, value})
  }

  getJson(key: string): object | null {
    const value = this.getItem(key)
    if (value === null) return null
    return JSON.parse(value)
  }

  clear(): void {
    return this.storage.clear()
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key)
  }

  key(index: number): string | null {
    return this.storage.key(index)
  }

  removeItem(key: string): void {
    return this.storage.removeItem(key)
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value)
    this._storageChanged$.next({key, value})
  }
}

interface StorageChangeEvent {
  key: string,
  value: string
}

interface JsonStorageChangeEvent {
  key: string,
  value: object | boolean | number | string | null
}

class User {
  constructor(
    public name: string
  ) {}
}
