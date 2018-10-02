import { Injectable } from '@angular/core';
import { Product } from '../providers/product/product';
import * as _ from 'lodash';

@Injectable()
export class ProductContainer {

    products : [Product]

    constructor() {
        
    }

    public contains(item: Product) {
       return this.products ? _.find(this.products, function(o) { return o.id == item.id ; }) : false;
    }

    searchProductByBarcode(barcode: string) {
        return this.products ? _.find(this.products, function(o) { return o.barcode == barcode; }) : false;
    }

    searchProductByName(name: string) {
        return this.products ? _.find(this.products, function(o) { return o.name == name; }) : false;
    }

    filterProductByNameOrBarCode(value: string) {
        return this.products ? _.filter(this.products, function(o) { 
            return (_.includes(o.name, value) || _.includes(o.barcode, value));
        }) : [];
    }


};