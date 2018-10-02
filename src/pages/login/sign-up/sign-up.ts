import { Component, NgModule } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoadingComponent } from '../../../components/loading/loading';
import { AlertBoxComponent } from '../../../components/alert-box/alert-box';
import { AuthProvider, User } from '../../../providers/auth/auth'

/*
  Generated class for the SignUp page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {

  user : User;
  signUpForm: FormGroup ;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private authProvider:AuthProvider,
    private loading: LoadingComponent,
    private alert: AlertBoxComponent) {
      this.user = {
        company : {}
      };
      this.signUpForm = this.formBuilder.group({
          email: [this.user.email, Validators.compose([
            Validators.email,
            Validators.required])
            ],
          password: [this.user.password, Validators.compose(
            [Validators.required,
            Validators.pattern(`^[a-zA-Z0-9]*$`),
            Validators.minLength(6),
            Validators.maxLength(20)]
          )],
          // confirmPass: ['', Validators.required],
          name: [this.user.name, Validators.required],
          company_name: [this.user.company.name, Validators.required],
          company_address: [this.user.company.address, Validators.required],
          company_phone: [this.user.company.phone, Validators.required],
          company_fax: [this.user.company.fax],
        });


  }

  ionViewDidLoad() {
    this.signUpForm.valueChanges
      .debounceTime(400)
      .subscribe(data => this.onValueChanged(data));
  }

  doEmailSignUp() {
      this.user.email = this.signUpForm.value.email;
      this.user.password = this.signUpForm.value.password;
      this.user.name = this.signUpForm.value.name;
      this.user.company.name = this.signUpForm.value.company_name;
      this.user.company.address = this.signUpForm.value.company_address;
      this.user.company.phone = this.signUpForm.value.company_phone;
      this.user.company.fax = this.signUpForm.value.company_fax;
      this.loading.showLoading();
      this.authProvider.register(this.user).subscribe((res)=> {
        console.log('doEmailSignUp success : ', res);
        if(res.success) {
            this.loading.hideLoading().then(()=> {
              this.alert.showInfoAlert(`Register success!`, `You can login with your account right now.`);
              this.navCtrl.pop();
            })
        } else {
          this.loading.hideLoading();
        }

      }, (err) => {
        console.log('doEmailSignUp err : ', err);
        this.loading.hideLoading();
      })
  }
    

  onValueChanged(data?: any) {
    if (!this.signUpForm) { return; }
    const form = this.signUpForm;
    for (const field in this.formErrors) {
      // clear previous error message
      this.formErrors[field] = [];
      this.signUpForm[field] = '';
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
    'email': [],
    'password': [],
    // 'confirmPass': []
  };

  validationMessages = {
    'email': {
      'required': 'Email is required',
      'email': 'Email is invalid'
    },
    'password': {
      'required': 'Password is required',
      'minlength': 'Password must be at least 6 characters.',
      'maxlength': 'Password cannot be more than 20 characters.',
      'pattern': 'Password only allow alpha or numeric.'

    },
    // 'confirmPass': {
    //   'required': 'Confirm password is required.',
    //   'validateEqual': 'Confirm password does not match.'
    // }
  };

  showLogin() {
    this.navCtrl.pop();
  }

}
