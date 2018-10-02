import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController, ModalController} from 'ionic-angular';
import { ProductProvider, Product } from '../../../providers/product/product'
import { LoadingComponent } from '../../../components/loading/loading';
import * as moment from 'moment';
import * as _ from 'lodash';
/**
 * Generated class for the AddProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-filter-product',
  templateUrl: 'filter-product.html'

})
export class FilterProductPage {


  products : [Product];

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,
  private viewCtrl: ViewController,
  private productProvider : ProductProvider, private loading: LoadingComponent) {
      this.products = this.productProvider.getLocalProducts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterProductPage');
  }

  private onClickProduct(product) {
    this.viewCtrl.dismiss(product);
  }

  getItems($event) {
    let val = $event.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.products = this.productProvider.filterProductByNameOrBarCode(val);
    } else {
      this.products = this.productProvider.getLocalProducts();
    }
  }

  cancel(){
     this.viewCtrl.dismiss(null);
  }
  
  
}
