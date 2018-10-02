import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ResetSuccessPage } from '../reset-success/reset-success';
import { LoadingComponent } from '../../../components/loading/loading';
import { AlertBoxComponent } from '../../../components/alert-box/alert-box';
/*
  Generated class for the ForgotPassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {

  checkForgot: FormGroup = this.formBuilder.group({
    email: ['', Validators.compose([
      Validators.email,
      Validators.required
      ])]

  });
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private alertCtr: AlertBoxComponent,
    private loading: LoadingComponent) { }

  ionViewDidLoad() {
    this.checkForgot.valueChanges
      .debounceTime(400)
      .subscribe(data => this.onValueChanged(data));
  }

  navSendEmail() {
      
  }
  
  onValueChanged(data?: any) {
    if (!this.checkForgot) { return; }
    const form = this.checkForgot;
    for (const field in this.formErrors) {
      // clear previous error message
      this.formErrors[field] = [];
      this.checkForgot[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field].push(messages[key]);
        }
      }
    }
  }
  formErrors = {
    'email': []
  };

  validationMessages = {
    'email': {
      'required': 'Email is required',
      'email': 'Email is invalided'
    }
  };

}
