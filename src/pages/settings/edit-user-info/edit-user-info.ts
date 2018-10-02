import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Client } from '../../../providers/invoice/invoice';
import { SettingsProvider } from '../../../providers/settings/settings';
import { AppConfig } from '../../../app/app.config';
import { LoadingComponent } from '../../../components/loading/loading';

/**
 * Generated class for the EditUserInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-user-info',
  templateUrl: 'edit-user-info.html',
})
export class EditUserInfoPage {

  shipper? : Client
  addShipperForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public formBuilder: FormBuilder, private appConfig: AppConfig,
    private settingsProvider: SettingsProvider, private loading: LoadingComponent) {
      this.shipper = appConfig.shipperInfo;
      if(!this.shipper) {
        this.shipper = {}
      }
      this.addShipperForm = this.formBuilder.group({
            name: new FormControl(this.shipper.name, Validators.required),
            description: new FormControl(this.shipper.description),
            address: new FormControl(this.shipper.address, Validators.required),
            phone: new FormControl(this.shipper.phone, Validators.required),
            fax: new FormControl(this.shipper.fax)
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditUserInfoPage');
  }
  private save() {
    this.shipper.name = this.addShipperForm.value.name;
    this.shipper.description = this.addShipperForm.value.description;
    this.shipper.address = this.addShipperForm.value.address;
    this.shipper.phone = this.addShipperForm.value.phone;
    this.shipper.fax = this.addShipperForm.value.fax;
    this.loading.showLoading()

    this.settingsProvider.addShipper(JSON.stringify(this.shipper)).subscribe((res)=> {
      this.loading.hideLoading().then(()=>{

      }).catch(err => {

      })
    }, (err)=>{
        this.loading.hideLoading().then(()=>{

            }).catch(err => {
              
            })
    })
  }

}
