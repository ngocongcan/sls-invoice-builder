import { Component } from '@angular/core';
import { NavController, NavParams , ModalController} from 'ionic-angular';
import { ProductProvider, Product } from '../../providers/product/product'
import { LoadingComponent } from '../../components/loading/loading';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AddProductModelComponent } from '../../components/add-product-model/add-product-model';


/**
 * Generated class for the ProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
  providers: [BarcodeScanner]

})
export class ProductPage {

  products : [Product];

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,
  private barcodeScanner: BarcodeScanner, 
  private productProvider : ProductProvider, private loading: LoadingComponent) {
    // this.products = this.productProvider.getLocalProducts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

  ionViewWillEnter() {
   this.products = this.productProvider.getLocalProducts();
  }

  private onClickScan() {
    console.log('onClickScan');
    this.startBarCodeScanner();
  }

  private onClickAdd(){
      this.presentAddProductModal();
  }

  private onClickProduct(product) {
    // this.navCtrl.push(AddProductPage, {product : product});
    this.presentAddProductModal(product.barcode, product);
  }

  private startBarCodeScanner() {
    this.barcodeScanner.scan().then((barcodeData) => {
      console.log('scan success data ', JSON.stringify(barcodeData));
    // Success! Barcode data is here
    if (barcodeData.text) {
        this.searchProduct(barcodeData.text);
    }
    }, (err) => {
        // An error occurred
        console.log('scan err  ', err);
    });
  }

  private searchProduct(barcode : string) {
    let product = this.productProvider.searchByBarcode(barcode)
    this.presentAddProductModal(barcode,product)
  }

  presentAddProductModal(barcode? : string , product? : any) {
    console.log("presentAddProductModal ", barcode , " product : ", product);
    let addModal = this.modalCtrl.create(AddProductModelComponent, { barcode: barcode , product : product});
    addModal.onDidDismiss(data => {
      console.log('presentAddProductModal onDidDismiss :',  data);
      if (data && data.data) {
        this.refreshProduct();
      }

    });
    addModal.present();
 }

  refreshProduct() {
    this.productProvider.getProducts().subscribe((res) => {
      console.log("get products : ", res);
    }, (err) => {
      console.log("get products err: ", err);
    });
  }

}
