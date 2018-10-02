import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { SLSInspectorApp } from './app.component';
import { Camera } from '@ionic-native/camera';
import { IonicImageLoader } from 'ionic-image-loader';
import { InAppPurchase } from '@ionic-native/in-app-purchase';

import { AppConfig } from './app.config';
import { CartonContainer } from '../models/carton-container';
import { ProductContainer } from '../models/product-container';

// Pages
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/login/sign-up/sign-up';
import { ResetSuccessPage } from '../pages/login/reset-success/reset-success';
import { ForgotPasswordPage } from '../pages/login/forgot-password/forgot-password';

import { PackingListPage } from '../pages/packing-list/packing-list';
import { AddPackingListPage } from '../pages/packing-list/add-packing-list/add-packing-list';

import { ProductPage } from '../pages/product/product';
import { FilterProductPage } from '../pages/product/filter-product/filter-product';

import { InvoicePage } from '../pages/invoice/invoice';
import { SettingsPage } from '../pages/settings/settings';
import { EditUserInfoPage } from '../pages/settings/edit-user-info/edit-user-info';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { LoadingComponent } from '../components/loading/loading';
import { ProductProvider } from '../providers/product/product';
import { ProductImagePipe } from '../pipes/product-image/product-image';
import { PackingListProvider } from '../providers/packing-list/packing-list';
import { InvoiceProvider } from '../providers/invoice/invoice';
import { PackingItemComponent } from '../components/packing-item/packing-item';
import { AlertBoxComponent } from '../components/alert-box/alert-box';
import { AddProductModelComponent } from '../components/add-product-model/add-product-model';
import { DateToIsoPipe } from '../pipes/date-to-iso/date-to-iso';
import { SettingsProvider } from '../providers/settings/settings';

const PAGES = [
  LoginPage,
  SignUpPage,
  ResetSuccessPage,
  ForgotPasswordPage,
  PackingListPage,
  AddPackingListPage,
  ProductPage,
  FilterProductPage,
  InvoicePage,
  SettingsPage,
  EditUserInfoPage
]

const PROVIDERS = [
  AuthProvider,
  AlertBoxComponent,
  InAppPurchase,
]

const CLASSES = [
  AppConfig,
  CartonContainer,
  ProductContainer
]

@NgModule({
  declarations: [
    SLSInspectorApp,
    ...PAGES,
    TabsPage,
    LoadingComponent,
    ProductImagePipe,
    PackingItemComponent,
    AlertBoxComponent,
    AddProductModelComponent,
    DateToIsoPipe,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot({ name: '__InvoiceBuilderDB', }),
    IonicImageLoader.forRoot(),
    IonicModule.forRoot(SLSInspectorApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    SLSInspectorApp,
    ...PAGES,
    AddProductModelComponent,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ...PROVIDERS,
    ...CLASSES,
    LoadingComponent,
    ProductProvider,
    PackingListProvider,
    InvoiceProvider,
    SettingsProvider
    ]
})
export class AppModule {}
