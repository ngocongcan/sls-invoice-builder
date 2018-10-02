import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable, Observer, Subscription } from 'rxjs/Rx';
import { AppConfig } from '../../app/app.config';
import { Storage } from '@ionic/storage';
import { BaseServiceProvider } from '../base-service/base-service';
import { Product } from '../product/product'
import { CartonContainer } from '../../models/carton-container';

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

export interface CartonItem {
  id? : number,
  name? : string,
  product_items? : [ProductItem]
  productItems? : string,
  grossWeight? : number,
  length? : number,
  width? : number,
  height? : number,
  netWeight? : number,
}

export interface ProductItem {
  id? : number,
  productId? : number,
  product? : Product,
  quantity? : number ,
}

@Injectable()
export class PackingListProvider extends BaseServiceProvider{

  constructor(protected http: Http, protected appConfig: AppConfig,
    protected storage: Storage, public cartonContainer: CartonContainer) {
    super(http, appConfig, storage);
    console.log('Hello AuthService Provider');
  }

  public getPackingLists() {
    return this.getData(`packing-lists`);
  }

  public addPackingList(cartonItem : CartonItem) {
    this.cartonContainer.addCartonItem(cartonItem);
    return this.postData(`packing-list`, cartonItem);

  }

  public updatePackingList(id : number ,cartonItem : CartonItem) {
    return this.putData(`packing-list/${id}`, cartonItem);
  }

  public getPackingList(id) {
    return this.getData(`packing-list/${id}`);
  }


}