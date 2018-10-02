import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable, Observer, Subscription } from 'rxjs/Rx';
import { AppConfig } from '../../app/app.config';
import { Storage } from '@ionic/storage';
import { BaseServiceProvider } from '../base-service/base-service';
import { ProductContainer } from '../../models/product-container';

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

export interface Product {
  id? : number,
  name? : string,
  barcode? : string,
  ingredient? : string,
  price? : number,
  origin? : string,
  weight? : number ,
  base64_image? : string,
  thumbnail_url? : string,
}


@Injectable()
export class ProductProvider extends BaseServiceProvider{

  constructor(protected http: Http, protected appConfig: AppConfig,
    protected storage: Storage, public productContainer: ProductContainer) {
    super(http, appConfig, storage);
    console.log('Hello AuthService Provider');
  }

  public getLocalProducts() {
    return this.productContainer.products;
  }

  public getProducts() {
    return this.getData('products').map(this.handleProducts.bind(this));
  }

  private handleProducts(res) {
    if(res.success) {
      this.productContainer.products = res.data;
    }
    return res;
  }

  public searchByBarcode(barcode: string) {
    return this.productContainer.searchProductByBarcode(barcode);
  }

  public filterProductByNameOrBarCode(value : string) {
    return this.productContainer.filterProductByNameOrBarCode(value);
    // return this.getData(`search/product?barcode=${barcode}&name=${name}`);
  }

  public addProduct(product : Product) {

    return this.postData(`product`, product)
    .map(this.handleAddProductResponse.bind(this));

  }

  private handleAddProductResponse(data) {
    if(data && data.success && data.data) {
      console.log('handleAddProductResponse : ', data.data);
      this.productContainer.products.push(data.data);
    }
    return data;
  }

  public updateProduct(id : number ,product : Product) {

    return this.putData(`product/${id}`, product);

  }

  public recycleProduct(id : number) {
    return this.getData(`recycle/product/${id}`);
  }

}
