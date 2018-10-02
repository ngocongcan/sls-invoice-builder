import { Injectable } from '@angular/core';
import { CartonItem } from '../providers/packing-list/packing-list'
import * as _ from 'lodash';

@Injectable()
export class CartonContainer {

    cartons : [CartonItem]
    constructor() {
        
    }

    public contains(item: CartonItem) {
       return this.cartons ? _.find(this.cartons, function(o) { return o.name == item.name; }) : false;
    }

    public addCartonItem(item: CartonItem) {
        if(this.cartons) {
            this.cartons.push(item);
        } else {
            this.cartons = [item];
        }
    }

    public removeCartonItemAtIndex(index: number) {
        if (this.cartons)
            this.cartons.splice(index, 1);        
    }


    public getTotalWeight() :number {
        let totalWeight : number = 0;
        if (this.cartons) {
            this.cartons.forEach(element => {
                console.log("getTotalWeight : e ", element , 'totalWeight : ', totalWeight);
                totalWeight += Number(element.grossWeight);
            });
        }
        return totalWeight;
    }

    public getTotalVolume() :number {

        let totalVolume : number = 0;
        if (this.cartons) {
            this.cartons.forEach(element => {
                totalVolume += (Number(element.width) * Number(element.height) * Number(element.length))/1000000;
            });
        }
        return totalVolume;
    }

    public getTotalQty() :number {

        let totalQty : number = 0;
        if (this.cartons) {
            this.cartons.forEach(element => {
                if (element.product_items) {
                    element.product_items.forEach(e => {
                        totalQty += Number(e.quantity);
                    });
                }
                
            });
        }
        return totalQty;
    }

    public getTotalProducts():number{
        let totalProducts = {} ;
        if (this.cartons) {
            this.cartons.forEach(element => {
                if(element.product_items) {
                    element.product_items.forEach(e => {     
                        totalProducts[e.productId] = e.productId;
                    });
                }
            });
        }
        return _.keys(totalProducts).length;
    }
    
    public getTotalCarton():number{
        return this.cartons ? this.cartons.length : 0;
    }
};