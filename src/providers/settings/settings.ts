import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable, Observer, Subscription } from 'rxjs/Rx';
import { AppConfig, IapProduct } from '../../app/app.config';
import { Storage } from '@ionic/storage';
import { BaseServiceProvider } from '../base-service/base-service';
import { InAppPurchase } from '@ionic-native/in-app-purchase';

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

@Injectable()
export class SettingsProvider extends BaseServiceProvider{

  private product? : IapProduct;
  constructor(protected http: Http, protected appConfig: AppConfig,
    protected storage: Storage, private iap: InAppPurchase) {
    super(http, appConfig, storage);
    console.log('Hello AuthService Provider');
  }

  public getShipper() {
    return this.getData('settings/shipper').subscribe((res) => {
      console.log('SettingsProvider getShipper : ', JSON.stringify(res))
        if(res.data) {
          this.appConfig.shipperInfo = res.data;
          if(res.data.user) {
            this.appConfig.user = res.data.user;
          }
        }
    }, (err)=> {
      console.log('SettingsProvider getShipper err : ', err)
    });
  }

  public addShipper(shipperData : string) {
    console.log('SettingsProvider addShipper data : ', shipperData);
    return this.postData(`settings/shipper`, {shipperData: shipperData}).map(this.handleAddShipperResponse.bind(this));
  }

  private handleAddShipperResponse(res) {
      console.log('SettingsProvider handleAddShipperResponse : ', res)
      if(res.data) {
          this.appConfig.shipperInfo = res.data;
      }
      return res;
  }

  public logout() {
    return this.getData(`logout`).map(this.handleLogout.bind(this));
  }

  private handleLogout(res) {
    this.storage.remove('access-token');
    return res;
  }

  public purchase(product: IapProduct) {
    this.product = product;
    if(product.productId == `com.sls.purchases.5invoices`) {
      return Observable.fromPromise(
        this.iap
            .buy(product.productId)
        ).flatMap(this.handleBuyProduct.bind(this))
    } else {
      return Observable.fromPromise(
            this.iap.subscribe(product.productId)
        ).flatMap(this.handleSubcribe.bind(this))
    }
  }

  private handleBuyProduct(data) {
    console.log("handleBuyProduct data : ", JSON.stringify(data))
    if (!this.product) return Observable.throw(false);
    this.product.transactionId = data.transactionId;
    this.product.receipt = data.receipt;
    this.product.signature = data.signature;
    this.product.productType = data.productType;
    return Observable.fromPromise(
          this.iap.consume(data.productType, data.receipt, data.signature)
        ).flatMap(this.handleComsume.bind(this))
  }

  private handleComsume()  {
    console.log("handleComsume product ", JSON.stringify(this.product));
    return this.postData(`settings/purchase`, this.product).map(this.handleResponse.bind(this))
  }

  private handleSubcribe(data ) {
    console.log("handleSubcribe data : ", JSON.stringify(data))
    if (!this.product) return Observable.throw(false);
    this.product.transactionId = data.transactionId;
    this.product.receipt = data.receipt;
    this.product.signature = data.signature;
    this.product.productType = data.productType;
    console.log("product: ", JSON.stringify(this.product));
    return this.postData(`settings/purchase`, this.product).map(this.handleResponse.bind(this))
  }

  private handleResponse(res) {
      if(res.success && res.data) {
          this.appConfig.user = res.data
      }
      return res;
  }

}