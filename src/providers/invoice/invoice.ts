import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable, Observer, Subscription } from 'rxjs/Rx';
import { AppConfig } from '../../app/app.config';
import { Storage } from '@ionic/storage';
import { BaseServiceProvider } from '../base-service/base-service';

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

export interface Client {
  id? : number,
  name? : string,
  description? : string,
  phone? : string,
  fax? : string,
  address? : string,
}

export interface Invoice {
  id? : number,
  code? : string,
  remarks? : string,
  shipFrom? : string,
  shipTo? : string,
  termsOfPayment? : string,
  blDescription? : string
  volume? : number,
  consignee? : Client,
  shipper? : Client,
  consigneeData? : string,
  shipperData? : string,
  packingListData? : string;
  totalCarton? : number;
  totalQty? : number;
  totalWeight? : number;
  totalVolume? : number;
  totalProduct? : number;
}


@Injectable()
export class InvoiceProvider extends BaseServiceProvider{

  constructor(protected http: Http, protected appConfig: AppConfig,
    protected storage: Storage) {
    super(http, appConfig, storage);
    console.log('Hello AuthService Provider');
  }

  public getInvoices() {
    return this.getData('invoices');
  }

  public addInvoice(invoice : Invoice) {
    invoice.shipperData = JSON.stringify(this.appConfig.shipperInfo);
    console.log('InvoiceProvider addInvoice :', invoice);
    return this.postData(`invoice`, invoice);
  }

  public getProduct(id : number) {
    return this.getData(`invoice/${id}`);
  }

  public getShipper() : Client {
    return this.appConfig.shipperInfo ? this.appConfig.shipperInfo : {};
  }

}