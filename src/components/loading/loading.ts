import { Component } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';

/**
 * Generated class for the LoadingComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'loading',
  templateUrl: 'loading.html'
})
export class LoadingComponent {

 loading : Loading;

    constructor(private loadingCtr: LoadingController) {
        console.log('Hello Loading Component');
    }

    public showLoading(message? : string) {
        if (this.loading) {
            this.loading.dismiss();
        }
        this.loading = this.loadingCtr.create({
        content: message
        });
        this.loading.present();
    }

    public hideLoading() {
       if (this.loading) {
            return this.loading.dismiss();
        }
    }

}
