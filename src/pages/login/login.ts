import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth'
import { LoadingComponent } from '../../components/loading/loading';
import { AlertBoxComponent } from '../../components/alert-box/alert-box';
import { SignUpPage } from './sign-up/sign-up';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credentials: FormGroup = this.formBuilder.group({
    username: ['', Validators.email],
    password: ['', Validators.compose([
      Validators.required,
      Validators.minLength(4)])
      ],
  });

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder , private authProvider: AuthProvider,
    private loading : LoadingComponent, private alert: AlertBoxComponent) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.authProvider.checkAutoLogin().subscribe((res)=> {
      if(res) {
        this.navCtrl.setRoot(TabsPage);
      }
    }, (err) => {

    })
  }

  login(): void {
    if (this.credentials.valid) {
      this.loading.showLoading("Authenticate...");
      let username = this.credentials.value['username'];
      let password = this.credentials.value['password'];
      this.authProvider.loginApiCall(username, password).subscribe((res) => {
        console.log("login res: ", res);
        this.loading.hideLoading().then(()=> {
          this.navCtrl.setRoot(TabsPage);
        });
        
      }, (err) => {
        console.log("login err : ", err);
        this.loading.hideLoading().then(()=> {
          // this.navCtrl.setRoot(TabsPage);
            this.alert.showInfoAlert(`Invalid credential`, `Please try again!`);
        });
      });
      
    } else {
    }

  }

  private signUp() {
    this.navCtrl.push(SignUpPage);
  }

  private navForgotPassword(){

  }

}
