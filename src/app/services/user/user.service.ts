import { Injectable } from '@angular/core';
import {IUser} from '../../../app/models/users';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser | null;
  private token: string | null;

  constructor(private http: HttpClient) {
  }


  getUser(): IUser | null{
    return this.user
  };
  setUser(user: IUser) {
    this.user = user;
  };
  setToken(token: string): void {
    this.token = token;
  }
  getToken(): string | null{
    return this.token;
  }
  setToStore (token: string) {
    window.localStorage.setItem('userToken', token)
  }
  getFromStore() {
    return window.localStorage.getItem('userToken');
  }
  getAllToken(): string | null {
    if (this.token) {
       return this.token
    } else {
      return this.getFromStore()
    }
  }

  removeUser(): void {
   this.user = null;
   this.token = null;
    window.localStorage.removeItem('userToken')
  }

  getUserById(userId: string) {
    return this.http.get("http://localhost:3000/users/" + userId)
  }


}
