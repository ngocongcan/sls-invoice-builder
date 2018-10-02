import { Component } from '@angular/core';
import { NavController, NavParams , Events} from 'ionic-angular';
import { SettingsProvider } from '../../providers/settings/settings';
import { AppConfig, IapProduct } from '../../app/app.config';
import { LoginPage } from '../login/login';
import { LoadingComponent } from '../../components/loading/loading';
import { ProductPage } from '../product/product';
import { EmailComposer } from '@ionic-native/email-composer';
import { EditUserInfoPage } from './edit-user-info/edit-user-info'
/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [EmailComposer]
})
export class SettingsPage {


  constructor(public navCtrl: NavController, public navParams: NavParams,
     private appConfig: AppConfig, private events: Events,
    private settingsProvider: SettingsProvider, private loading: LoadingComponent,
    private emailComposer:EmailComposer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  private logout() {
    this.loading.showLoading()
    this.settingsProvider.logout().subscribe((res)=> {
      console.log('Logout res :', res);
      this.loading.hideLoading().then(()=>{
        this.events.publish('logout:triggered', true);
      }).catch(err => {

      })
      
    }, (err)=> {
        this.loading.hideLoading().then(()=>{

            }).catch(err => {
              
            })
    })
  }

  private onClickPurchase(product : IapProduct) {
    this.loading.showLoading()
    this.settingsProvider.purchase(product).subscribe((res) => {
      console.log("onClickPurchase res : ", JSON.stringify(res))
      this.loading.hideLoading()
    } , (err) => {
      console.log("onClickPurchase err : ", JSON.stringify(err))
      this.loading.hideLoading()
    })
  }

  private onClickProfile() {
    this.navCtrl.push(EditUserInfoPage);
  }

  private onClickProducts() {
    this.navCtrl.push(ProductPage);
  }

  private onClickHelp() {

    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        console.log("onClickHelp can send mail");
        //Now we know we can send
          let email = {
            to: this.appConfig.noreplyEmail,
            subject: 'Need a help',
          };
          
          this.emailComposer.open(email);
        } else {
          console.log("onClickHelp can not send mail");
        }
     });
  }

  private onClickFeebacks() {
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        console.log("onClickFeebacks can send mail");
        //Now we know we can send
          let email = {
            to: this.appConfig.noreplyEmail,
            subject: 'Send a feedback',
          };
          
          this.emailComposer.open(email);
        } else {
          console.log("onClickFeebacks can not send mail");
        }
     });
  }

}
