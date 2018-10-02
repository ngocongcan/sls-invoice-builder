import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Device } from 'ionic-native';
import { InAppPurchase } from '@ionic-native/in-app-purchase';

export interface IapProduct {
    productId? : string,
    title? : string,
    description? : string,
    price? : string,
    transactionId? : string,
    receipt? : string,
    signature? : string,
    productType? : string,
}

@Injectable()
export class AppConfig {


    appName: string = "SLS Invoice Builder";
    apiKey: string = "";
    accessToken : string = "";
    imageurl: string = "";
    apiUrl: string = "";
    noreplyEmail : string = "";
    shipperInfo? : any
    user? : any
    iapProducts? : [IapProduct]
    constructor(private platform: Platform, private iap: InAppPurchase) {

        platform.ready().then(() => {
            this.getIAPProducts();
        }).catch((err) => {
            console.log(err);
        });
        
    }

    private getIAPProducts(){
        this.iap
        .getProducts(['com.***.purchases.****', 'com.sls.purchases.monthlysubcription'])
        .then((products) => {
            this.iapProducts = products;
            console.log("getIAPProducts susccess :", JSON.stringify(products));
        })
        .catch((err) => {
            console.log("getIAPProducts error :", JSON.stringify(err));
        });
    }


};