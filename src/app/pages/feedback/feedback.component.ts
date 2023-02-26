import { Component, OnInit } from '@angular/core';

import {MessageService} from 'primeng/api';
import { UserService } from 'src/app/services/user/user.service';
import { IFeedback } from 'src/app/models/feedback';

import { ConfigService } from 'src/app/services/config/config.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ServerError } from 'src/app/models/error';



@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  name: string;
  feedback: string;
  saveFeedbackInStore: boolean;

  constructor(private messageService: MessageService,
   
    private http: HttpClient) { }


  ngOnInit(): void {
    
  }
  sendFeedback(ev: Event): void | boolean{
    if (this.feedback == null) {
      this.messageService.add({severity:'error', summary:'Введите свой отзыв.'});
    } else
      {return this.messageService.add({severity:'success', summary:'Спасибо! Отзыв будет опубликован после проверки модератором.'});}
    
    
    const feedbackObj: IFeedback = {
      name: this.name,
      feedback: this.feedback,

    }


/*
 this.http.post<IFeedback>('http://localhost:3000/feedback/', feedbackObj).subscribe((data) => {
  if (this.feedback == '123')
  this.messageService.add({severity:'success', summary:'Спасибо за ваш отзыв'});

}, (err: HttpErrorResponse)=> {
  console.log('err', err)
  const ServerError = <ServerError>err.error;
  this.messageService.add({severity:'warn', summary: 'Введите свой отзыв'});
});
*/
  }
 
}
