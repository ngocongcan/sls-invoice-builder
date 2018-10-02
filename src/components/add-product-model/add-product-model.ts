import { Component } from '@angular/core';
import { ViewController, NavParams, ActionSheetController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadingComponent } from '../loading/loading';
import { ProductProvider, Product } from '../../providers/product/product'
/**
 * Generated class for the AddProductModelComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'add-product-model',
  templateUrl: 'add-product-model.html'
})
export class AddProductModelComponent {

  addProductForm: FormGroup;
  product : Product;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, 
    public formBuilder: FormBuilder,private camera: Camera, public actionSheetCtrl: ActionSheetController,
    private productProvider: ProductProvider, private loading: LoadingComponent) {
    
    this.product = {
      barcode : navParams.get('barcode')
    };
    if (navParams.get('product')) {
      this.product = navParams.get('product') 
    }

    this.addProductForm = this.formBuilder.group({
            name: new FormControl(this.product.name, Validators.required),
            barcode: new FormControl(this.product.barcode),
            ingredient: new FormControl(this.product.ingredient),
            price: new FormControl(this.product.price, Validators.required),
            origin: new FormControl(this.product.origin, Validators.required),
            weight: new FormControl(this.product.weight, Validators.required)
            
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }
  private save() {
    
    this.product.name = this.addProductForm.value.name;
    this.product.ingredient = this.addProductForm.value.ingredient;
    this.product.price = this.addProductForm.value.price;
    this.product.origin = this.addProductForm.value.origin;
    this.product.weight = this.addProductForm.value.weight;
  
    console.log("save product: ", JSON.stringify(this.product));
    this.loading.showLoading();
    if (this.product.id) {
      this.productProvider.updateProduct(this.product.id,this.product).subscribe(res => {
        console.log('Update Product success ', JSON.stringify(res));
        this.loading.hideLoading().then(()=>{
          this.dismiss(res);
        });
      }, (err) => {
        console.log('Update Product err ', err);
        this.loading.hideLoading();
      })
    } else {
      this.productProvider.addProduct(this.product).subscribe(res => {
        console.log('Add Product success ', JSON.stringify(res));
        this.loading.hideLoading().then(()=>{
          this.dismiss(res);
        });
        
      }, (err) => {
        console.log('Add Product err ', err);
        this.loading.hideLoading();
      })
    }
    
  }

  addPhoto() {
    let actionSheet = this.actionSheetCtrl.create({
        // title: 'Photo',
        buttons: [
            {
                text: 'Camera',
                handler: () => {
                    this.openMedia(this.camera.PictureSourceType.CAMERA);
                }
            }, {
                text: 'Choose from Gallery',
                handler: () => {
                    this.openMedia(this.camera.PictureSourceType.PHOTOLIBRARY);
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

  private openMedia(type) {
        let cameraOptions = {
            sourceType: type,
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 400,
            targetHeight: 300,
            encodingType: this.camera.EncodingType.JPEG,
            correctOrientation: true
        }
        this.getPicture(cameraOptions);
    }

  private getPicture(options: any) {
        this.camera.getPicture(options).then((data) => {
            let image = "data:image/jpeg;base64," + data;
            this.product.base64_image = image;
        }).catch(err => { })
    }

  private dismiss(res) {
      this.viewCtrl.dismiss(res);
  }

  private cancel(){
    this.dismiss(null);
  }


}
