import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { LoadingComponent } from '../../../components/loading/loading';
import { ProductItem, CartonItem } from '../../../providers/packing-list/packing-list'
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ProductProvider, Product } from '../../../providers/product/product'
import { FilterProductPage } from '../../product/filter-product/filter-product';
import { AddProductModelComponent } from '../../../components/add-product-model/add-product-model';
import { CartonContainer } from '../../../models/carton-container';
import { AlertBoxComponent } from '../../../components/alert-box/alert-box';
import * as _ from 'lodash';


/**
 * Generated class for the AddPackingListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-packing-list',
  templateUrl: 'add-packing-list.html',
  providers: [BarcodeScanner, AlertBoxComponent]
})
export class AddPackingListPage {

  addPackingListForm: FormGroup;
  cartonItem : CartonItem;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alert : AlertBoxComponent,
  public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController,
  public formBuilder: FormBuilder, private barcodeScanner: BarcodeScanner,
  private productProvider : ProductProvider, private cartonContainer: CartonContainer, private loading: LoadingComponent) {
    console.log('AddPackingListPage navParams : ', navParams);
    this.cartonItem = {
    };
    if (navParams.get('cartonItem')) {
      this.cartonItem = navParams.get('cartonItem') 
    } else {
      
    }
    this.addPackingListForm = this.formBuilder.group({
            name: new FormControl(this.cartonItem.name, Validators.required),
            length: new FormControl(this.cartonItem.length, Validators.required),
            width: new FormControl(this.cartonItem.width, Validators.required),
            height: new FormControl(this.cartonItem.height, Validators.required),
            grossWeight: new FormControl(this.cartonItem.grossWeight, Validators.required),
        });

  }

  private onClickScan() {
    console.log('onClickScan');
    let actionSheet = this.actionSheetCtrl.create({
        // title: 'Photo',
        buttons: [
            {
                text: 'Scan Barcode',
                handler: () => {
                    this.startBarCodeScanner();
                }
            }, {
                text: 'Search Product',
                handler: () => {
                    this.showSearchProductModel();
                }
            }, {
                text: 'Close',
                role: 'cancel',
                handler: () => {
                }
            }
        ]
    });
    actionSheet.present();
  }

  private showSearchProductModel() {
    let filterModal = this.modalCtrl.create(FilterProductPage);
    filterModal.onDidDismiss(data => {
      console.log('presentAddProductModal onDidDismiss :',  data);
      if (data) {
        this.addItem(data);
      }
    });
    filterModal.present();
  }

  private startBarCodeScanner() {
    this.barcodeScanner.scan().then((barcodeData) => {
      console.log('scan success data ', JSON.stringify(barcodeData));
    // Success! Barcode data is here
      if (barcodeData.text) {
          this.searchProduct(barcodeData.text);
      }
    }, (err) => {
        console.log('scan err  ', err);
    });
  }

  private searchProduct(barcode : string) {
    let product =  this.productProvider.searchByBarcode(barcode);
    if(product) {
      this.addItem(product);
    } else {
      this.presentAddProductModal(barcode);
    }
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPackingListPage');
  }

  presentAddProductModal(barcode? : string , product? : any) {
    console.log("presentAddProductModal ", barcode , " product : ", product);
    let addModal = this.modalCtrl.create(AddProductModelComponent, { barcode: barcode , product : product});
    addModal.onDidDismiss(data => {
      console.log('presentAddProductModal onDidDismiss :',  data);
      if (data && data.data) {
        this.addItem(data.data);
      }

    });
    addModal.present();
 }

  private addItem(product: Product) {
    if(!this.cartonItem.product_items) {
      this.cartonItem.product_items = [{
        productId: product.id,
        product: product,
        // quantity : 0,
      
      }];
    } else {
      this.cartonItem.product_items.push(
        {
          productId: product.id,
          product: product,
          // quantity : 0,
        }
      );
    }
  }

  private remove(index) {
    console.log('add-packing-list remove index : ', index);
    this.cartonItem.product_items.splice(index, 1);        
    console.log('add-packing-list PackingItems : ', this.cartonItem.product_items);
  }

  private onClickSave() {

    let validProductItems =  this.cartonItem.product_items ? _.filter(this.cartonItem.product_items,
       function(o) { 
            return o.quantity;
        }) : [];

    if(validProductItems.length == 0) {
      this.alert.createInfoAlert(`Please add valid products & quantity`)
            .present();
      return;
    } 
    this.cartonItem.product_items = validProductItems;
    this.cartonItem.name = this.addPackingListForm.value.name;
    this.cartonItem.length = this.addPackingListForm.value.length;
    this.cartonItem.width = this.addPackingListForm.value.width;
    this.cartonItem.height = this.addPackingListForm.value.height;
    this.cartonItem.grossWeight = this.addPackingListForm.value.grossWeight;
    console.log("save packingList: ", this.cartonItem);
    if (this.cartonContainer.contains(this.cartonItem)) {
      
    } else {
      this.cartonContainer.addCartonItem(this.cartonItem);
    }
    this.navCtrl.pop();
  }

}
