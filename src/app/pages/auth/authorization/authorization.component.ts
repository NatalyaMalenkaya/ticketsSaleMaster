import { Component, OnInit } from "@angular/core";
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {UserService} from '../../../../app/services/user/user.service';
import {ConfigService} from '../../../services/config/config.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit {
  loginText= 'Логин';
  pswText= 'Пароль';
  psw: string;
  login: string;
  selectedValue: boolean;
  cardNumber: string;
  authTextButton: string;
  useCardNumber: boolean;


  constructor(private authService: AuthService,
              private router: Router,
              private messageService: MessageService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.authTextButton = "Авторизоваться";
    this.useCardNumber = ConfigService.config.useUserCard;
  }

  ngOnDestroy(): void{
    //console.log('destroy');
  }

  vipStatusSelected():void{

  }
  onAuth(ev: Event):void{
    const authUser: IUser = {
      psw : this.psw,
      login : this.login,
      cardNumber: this.cardNumber,
    }
    if (this.authService.checkUser(authUser)){

      this.userService.setUser(authUser);

      this.userService.setToken('user-private-token');
      this.userService.setToStore('user-private-token');

      this.router.navigate(['tickets/tickets-list']);
    }
    else{
      this.messageService.add({severity:'error', summary: 'Проверьте введенные данные'});
    }
  }
}
