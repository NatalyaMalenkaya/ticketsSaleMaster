import { Component, OnInit, OnDestroy } from '@angular/core';
import {ObservableExampleService} from '../../../services/testing/observable-example.service';
import {Subject, Subscription, take, takeUntil} from 'rxjs';
import {SettingsService} from '../../../services/settings/settings.service';
import {AuthService} from "../../../services/auth/auth.service";
import {MessageService} from "primeng/api";
import {UserService} from "../../../services/user/user.service";
import {Router} from "@angular/router";
import {IUser} from "../../../models/users";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ServerError } from 'src/app/models/error';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
     private subjectScore: Subject<any>;
     private subjectForUnsubscribe = new Subject();

     
     newPsw: string;
     repeatNewPsw: string;
     currentPsw: string;
   

  //settingsData: Subscription;
    // settingsDataSubject: Subscription;
    // private subjectUnsubscribe: Subscription;

  constructor(private  testing: ObservableExampleService,
              private settingsService: SettingsService,
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
    this.settingsService.loadUserSettings().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) => {
      console.log('settings data', data)
    });
   this.settingsService.getSettingsSubjectObservable().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) => {
      console.log('settings data from subject', data)
    })
    //this.settingsService.getSettingsSubjectObservable().pipe(take(1)).subscribe((data) => {
    //  console.log('settings data from subject', data)
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
