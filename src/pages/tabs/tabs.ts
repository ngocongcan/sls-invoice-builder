import { Component } from '@angular/core';
import { NavController, NavParams , Events} from 'ionic-angular';
import { PackingListPage } from '../packing-list/packing-list';
import { ProductPage } from '../product/product';
import { InvoicePage } from '../invoice/invoice';
import { SettingsPage } from '../settings/settings';
import { LoginPage } from '../login/login';
import { ProductProvider } from '../../providers/product/product'
import { SettingsProvider } from '../../providers/settings/settings'
import { LoadingComponent } from '../../components/loading/loading';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PackingListPage;
  tab2Root = InvoicePage;
  tab3Root = ProductPage;
  tab4Root = SettingsPage;

  constructor(private settingsProvider: SettingsProvider, private productProvider: ProductProvider,
     private events: Events, private navCtrl: NavController, private loading: LoadingComponent) {
    console.log('init TabsPage')
    this.loading.showLoading();
    this.settingsProvider.getShipper();
    this.productProvider.getProducts().subscribe((res)=> {
      console.log('TabsPage : getProducts ', res);
      this.loading.hideLoading();
    }, (err)=> {
      this.loading.hideLoading();
    });
      events.subscribe('logout:triggered', () => {
    // user and time are the same arguments passed in `events.publish(user, time)`
        console.log('DID LOG OUT');
        this.navCtrl.setRoot(LoginPage);
      });

  }
}
