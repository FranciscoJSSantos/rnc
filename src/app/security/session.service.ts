import { Injectable } from '@angular/core';
import { SessionStorage } from '../models/session-storage';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  sessionStorageModel: SessionStorage = {} as SessionStorage;

  constructor() { }

  public set(key: string, value: string){
    this.sessionStorageModel[key] = value;
  }

  public get(key: string) {
    return this.sessionStorageModel[key];
  }

  public remove(key: string) {
    this.sessionStorageModel[key] = null;
  }

  public clear() {
    this.sessionStorageModel = {} as SessionStorage;
  }
}
