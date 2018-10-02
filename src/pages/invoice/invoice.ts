import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingComponent } from '../../components/loading/loading';
import { AlertBoxComponent } from '../../components/alert-box/alert-box';
import { CartonContainer } from '../../models/carton-container';
import { InvoiceProvider, Invoice, Client } from '../../providers/invoice/invoice'
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

/**
 * Generated class for the InvoicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
  providers: [AlertBoxComponent]
})
export class InvoicePage {

  addInvoiceForm: FormGroup;
  invoice : Invoice;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public formBuilder: FormBuilder, private alert: AlertBoxComponent,
  private invoiceProvider : InvoiceProvider, private loading: LoadingComponent,
  public cartonContainer: CartonContainer) {
      this.reloadForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicePage');
  }

  ionViewWillEnter() {
    this.updateInvoice();
  }

  private reloadForm(){
      this.invoice = {
      totalCarton : this.cartonContainer.getTotalCarton(),
      totalProduct : this.cartonContainer.getTotalProducts(),
      totalQty: this.cartonContainer.getTotalQty(),
      totalVolume : this.cartonContainer.getTotalVolume(),
      totalWeight: this.cartonContainer.getTotalWeight(),
      termsOfPayment : 'T/T',
      remarks : 'T/T　有償 (Commercial Value)',
      consignee : {},
      shipper : this.invoiceProvider.getShipper(),
    }

    this.addInvoiceForm = this.formBuilder.group({
              totalCarton: new FormControl(this.invoice.totalCarton, Validators.required),
              totalProduct: new FormControl(this.invoice.totalQty, Validators.required),
              totalQty: new FormControl(this.invoice.totalQty, Validators.required),
              totalVolume: new FormControl(this.invoice.totalVolume, Validators.required),
              totalWeight: new FormControl(this.invoice.totalWeight, Validators.required),
              code: new FormControl(this.invoice.code, Validators.required),
              from: new FormControl(this.invoice.shipFrom),
              to: new FormControl(this.invoice.shipTo),
              volume: new FormControl(this.invoice.totalVolume),
              termsOfPayment: new FormControl(this.invoice.termsOfPayment, Validators.required),
              blDescription: new FormControl(this.invoice.blDescription),
              remarks: new FormControl(this.invoice.remarks),
              consignee_name: new FormControl(this.invoice.consignee.name, Validators.required),
              consignee_address: new FormControl(this.invoice.consignee.address, Validators.required),
              consignee_phone: new FormControl(this.invoice.consignee.phone, Validators.required),
              consignee_fax: new FormControl(this.invoice.consignee.fax),
              shipper_name: new FormControl(this.invoice.shipper.name, Validators.required),
              shipper_address: new FormControl(this.invoice.shipper.address, Validators.required),
              shipper_phone: new FormControl(this.invoice.shipper.phone, Validators.required),
              shipper_fax: new FormControl(this.invoice.shipper.fax),
          });
  }
   private updateInvoice() {
      this.invoice.totalCarton = this.cartonContainer.getTotalCarton()
      this.invoice.totalProduct = this.cartonContainer.getTotalProducts()
      this.invoice.totalQty = this.cartonContainer.getTotalQty()
      this.invoice.totalVolume = this.cartonContainer.getTotalVolume()
      this.invoice.totalWeight = this.cartonContainer.getTotalWeight()  
      this.invoice.volume = this.invoice.totalVolume;
      console.log('updateInvoice : ', this.invoice);
  }

  private cancel() {
    this.reloadForm();
  }

  private save() {
    
    this.invoice.code = this.addInvoiceForm.value.code;
    this.invoice.remarks = this.addInvoiceForm.value.remarks;
    this.invoice.blDescription = this.addInvoiceForm.value.blDescription;
    this.invoice.termsOfPayment = this.addInvoiceForm.value.termsOfPayment;
    this.invoice.shipFrom = this.addInvoiceForm.value.from;
    this.invoice.shipTo = this.addInvoiceForm.value.to;
    // this.invoice.volume = this.addInvoiceForm.value.volume;
    this.invoice.consignee.name = this.addInvoiceForm.value.consignee_name;
    this.invoice.consignee.description = this.addInvoiceForm.value.consignee_description
    this.invoice.consignee.phone = this.addInvoiceForm.value.consignee_phone
    this.invoice.consignee.fax = this.addInvoiceForm.value.consignee_fax
    this.invoice.consignee.address = this.addInvoiceForm.value.consignee_address
    this.invoice.consigneeData = JSON.stringify(this.invoice.consignee);
    this.invoice.shipperData = JSON.stringify(this.invoice.shipper);
    this.invoice.packingListData = JSON.stringify(this.cartonContainer);
  
    console.log("save Invoice: ", this.invoice);
    this.loading.showLoading();
    if (this.invoice.id) {
     
    } else {
      this.invoiceProvider.addInvoice(this.invoice).subscribe(res => {
        console.log('Add invoice success ', JSON.stringify(res));
        this.loading.hideLoading().then(()=>{
            this.alert.createInfoAlert(`Success`, `Invoice ${this.invoice.code} is processing, it will be sent to your email soon. You can continue with new Invoice.`)
            .present();
            this.cartonContainer.cartons = null;
            this.reloadForm();
        });
        
      }, (err) => {
        console.log('Add invoice err ', err);
          this.loading.hideLoading().then(()=> {
              this.alert.createInfoAlert(null, `Error when proccessing invoice, please check the required data carefully before report this error via email vicnisoft@gmail.com`).present();
          });
      })
    }
  }


}
