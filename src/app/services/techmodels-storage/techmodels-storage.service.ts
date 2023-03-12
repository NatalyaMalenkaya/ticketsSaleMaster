import { Injectable } from '@angular/core';
import {ITechnic} from '../../models/technics'

@Injectable({
  providedIn: 'root'
})
export class TechmodelsStorageService {
  private techmodelStorage: ITechnic[]

  constructor() { }

  setStorage(data: ITechnic[]): void {
    this.techmodelStorage = data;
  }
  getStorage(): ITechnic[] {
    return this.techmodelStorage
  }
}
