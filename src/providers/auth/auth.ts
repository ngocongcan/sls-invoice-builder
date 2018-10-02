import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable, Observer, Subscription } from 'rxjs/Rx';
import { BaseServiceProvider } from '../base-service/base-service';
import { AppConfig } from '../../app/app.config';
import { Storage } from '@ionic/storage';
import * as Base64 from 'base-64';
import { Client } from '../invoice/invoice'

export interface User {
  email? : string,
  password? : string,
  name?: string,
  company ?: Client
  companyInfo? : string  
}

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider extends BaseServiceProvider{

  constructor(protected http: Http, protected appConfig: AppConfig,
    protected storage: Storage) {
    super(http, appConfig, storage);
    console.log('Hello AuthService Provider');
  }

  public checkAutoLogin() : Observable<any>  {
     return Observable.fromPromise(
      this.storage.get('access-token')
    );
  }

  public loginApiCall(username: string, password : string): Observable<any> {
       let body = {
         '_username' : username,
         '_password' : password
       }
      console.log("body ", body);
      return this.postData(`login_check`,body).map(this.handleLoginResponse.bind(this))
        .catch((err) => {
          console.log(err);
          return Observable.throw(false);
        });
  }
      
  private handleLoginResponse(res) {
    console.log("handleLoginResponse : ", res);
    this.appConfig.accessToken = res;
    this.storage.set('access-token', res);
    return res;
  }

  public register(user: User): Observable<any> {
      user.companyInfo = JSON.stringify(user.company);
      console.log('register : ', user);
      return this.postData(`register`,user);
  }

}

