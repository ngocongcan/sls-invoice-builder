import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddPackingListPage } from './add-packing-list/add-packing-list';
import { PackingListProvider, ProductItem, CartonItem } from '../../providers/packing-list/packing-list'
import { LoadingComponent } from '../../components/loading/loading';
import { CartonContainer } from '../../models/carton-container';

/**
 * Generated class for the PackingListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-packing-list',
  templateUrl: 'packing-list.html',
})
export class PackingListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private packingListProvider: PackingListProvider, private loading: LoadingComponent,
    public cartonContainer: CartonContainer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PackingListPage');
  }

  ionViewWillEnter() {
    
  }

  private onClickCartonItem(cartonItem:CartonItem) {
    this.navCtrl.push(AddPackingListPage, {cartonItem : cartonItem});
  }

  private onClickAddNew() {
    this.navCtrl.push(AddPackingListPage);
  }

  private getVolume(cartonItem: CartonItem) {
    return (cartonItem.length * cartonItem.width * cartonItem.height)/1000000;
  }

}
