import { Component, Input, EventEmitter,  Output } from '@angular/core';
import { PackingListProvider, ProductItem, CartonItem } from '../../providers/packing-list/packing-list';
/**
 * Generated class for the PackingItemComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'packing-item',
  templateUrl: 'packing-item.html'
})
export class PackingItemComponent {

  @Input() productItem: ProductItem = {};
  @Input() productIndex?: number;
  @Input() cartonItem?: CartonItem;
  @Output() itemClickRemove = new EventEmitter();

  constructor() {
    console.log('Hello PackingItemComponent Component');
  }

  onClickRemove(index) {
    console.log("PackingItemComponent onClickRemove: ", index);
    this.itemClickRemove.emit(index);
  }

}
