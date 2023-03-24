import { Component, OnInit, OnDestroy } from '@angular/core';
import {ObservableExampleService} from '../../../services/testing/observable-example.service';
import {Subject, Subscription, take, takeUntil} from 'rxjs';
import { AccountService } from 'src/app/services/account/account.service';
import {AuthService} from "../../../services/auth/auth.service";
import {MessageService} from "primeng/api";
import {UserService} from "../../../services/user/user.service";
import {Router} from "@angular/router";
import {IUser} from "../../../models/users";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ServerError } from 'src/app/models/error';



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
     private subjectScore: Subject<any>;
     private subjectForUnsubscribe = new Subject();

     
     newPsw: string;
     repeatNewPsw: string;
     currentPsw: string;
   

  //accountData: Subscription;
    // accountDataSubject: Subscription;
    // private subjectUnsubscribe: Subscription;

  constructor(private  testing: ObservableExampleService,
              private accountService: AccountService,
              private authService: AuthService,
              private messageService: MessageService,
              private userService: UserService,
              private http: HttpClient) { }

  ngOnInit(): void {
    //this.subjectScore = this.testing.getSubject();

   // this.subjectUnsubscribe = this.subjectScore.subscribe((data: string) => {
   //  console.log('data', data)
   // });
   // this.subjectScore.next('subData');
    this.accountService.loadUserAccount().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) => {
      console.log('account data', data)
    });
   this.accountService.getAccountSubjectObservable().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) => {
      console.log('account data from subject', data)
    })
    //this.accountService.getAccountSubjectObservable().pipe(take(1)).subscribe((data) => {
    //  console.log('account data from subject', data)
    //})
  }

  ngOnDestroy() {
    //this.subjectUnsubscribe.unsubscribe();
    this.subjectForUnsubscribe.next(true);
    this.subjectForUnsubscribe.complete();
  }
  passwordChange(Ev: Event): void | boolean {

    const user = <IUser>this.userService.getUser();
    if (user.psw !== this.currentPsw) {
      this.messageService.add({severity: 'error', summary: 'Неверно введен текущий пароль'});
    } else {
      if (this.newPsw !== this.repeatNewPsw) {
        this.messageService.add({severity: 'error', summary: 'Новые пароли не совпадают'});
        // console.log("this.newPsw", this.newPsw);
        // console.log("this.repeatNewPsw", this.repeatNewPsw);
      } else {
        user.psw = this.newPsw;
        this.userService.setUser(user);
        const userString = JSON.stringify(user);
        window.localStorage.setItem(user.login, userString);
        // console.log("теперь пароль", user.psw);
        this.http.put<IUser>('http://localhost:3000/users/' + user.id + '', user)
          .subscribe((data) => {
            this.messageService.add({severity: 'success', summary: 'Пароль успешно изменен'});
          }, (err: HttpErrorResponse) => {
            //console.log('err', err)
            const serverError = <ServerError>err.error;
            //console.log('serverError', serverError)
            this.messageService.add({
              severity: 'warn',
              summary: 'Ошибка при установке пароля. ' + serverError.errorText
            });
          });


      }
    }
  }


}
