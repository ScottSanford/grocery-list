import { BrowserModule } from '@angular/platform-browser'
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'
import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { FIREBASE_CREDENTIALS } from './firebase.credentials'
import { BarcodeScanner } from '@ionic-native/barcode-scanner'
import { HttpClientModule } from '@angular/common/http'
import { LongPressModule } from 'ionic-long-press'

import { MyApp } from './app.component'
import { ShoppingListPage } from '../pages/shopping-list/shopping-list'
import { AddShoppingPage } from '../pages/add-shopping/add-shopping'
import { EditShoppingItemPage } from '../pages/edit-shopping-item/edit-shopping-item'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    MyApp,
    AddShoppingPage,
    ShoppingListPage,
    EditShoppingItemPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    LongPressModule,
    IonicModule.forRoot(MyApp),
    // Init AngularFire with creds from the dashboard
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    // Import the AngularFireDatabaseModuleModule to use database interactions
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddShoppingPage,
    ShoppingListPage,
    EditShoppingItemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}
