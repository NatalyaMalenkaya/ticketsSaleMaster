import { Injectable } from '@angular/core';
import {Observable, Subject, take} from 'rxjs';
import { IAccount } from 'src/app/models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
   private accountSubject: Subject<IAccount> = new Subject<IAccount>();
  constructor() { }

  loadUserAccount(): Observable<IAccount> {
    const settingObservable = new Observable<IAccount> ((subscriber) => {
      const accountData: IAccount = {
        saveToken: true
      };
      subscriber.next(accountData)
    });
    return settingObservable;
  }

  loadUserAccountSubject(data: IAccount): any {
    this.accountSubject.next(data);
  }

  getAccountSubjectObservable(): Observable<IAccount> {
    return this.accountSubject.asObservable();
  }
}
