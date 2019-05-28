import { Component, OnInit } from '@angular/core'
import { NavController } from 'ionic-angular'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner'
import { HttpClient } from '@angular/common/http'
import { APP_ID, APP_KEY } from './nutritionix.creds'

import { ShoppingItem } from '../../modals/shopping-item/shopping-item.interface'

@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage implements OnInit {

  readonly ROOT_URL = 'https://trackapi.nutritionix.com/v2'
  options: BarcodeScannerOptions
  results: any = {}
  groceryList: AngularFirestoreCollection<ShoppingItem>
  shoppingItem = {} as ShoppingItem
  product: any

  constructor(
    private barcodeScanner: BarcodeScanner,
    private http: HttpClient,
    private navCtrl: NavController,
    private fireStore: AngularFirestore
    ) {

      this.groceryList = this.fireStore.collection('grocery-list')
    }

    ngOnInit() {
      this.shoppingItem.quantity = 1
    }

    addShoppingItem(item: ShoppingItem) {
      // Create a new object and convert quantity into a number
      // Push this into Firebase list called 'grocery-list'
      const id: string = this.fireStore.createId()
      this.groceryList.doc(id).set({
        createdDate: Date.now(),
        id,
        isChecked: false,
        name: item.name,
        quantity: Number(item.quantity)
      }).then(() => {

        // Reset our ShoppingItem
        this.shoppingItem = {} as ShoppingItem

        // Navigate the user back to the ShoppingPage
        this.navCtrl.pop()
      })

    }

    async scanBarcode() {
      this.options = {prompt: 'Scan your barcode'}
      this.results = await this.barcodeScanner.scan(this.options)
      this.getProduct(this.results.text)
    }

    getProduct(upc: string) {
      this.http.get(`${this.ROOT_URL}/search/item?upc=${upc}`, {
        headers: {
          'x-app-id': APP_ID,
          'x-app-key': APP_KEY
        }
      }).subscribe((result: any) => {
        console.log('API', result)
        this.product = result.foods[0]
      })
    }

    goToList() {
      this.navCtrl.pop()
    }

    incQuantity() {
      this.shoppingItem.quantity++
    }

    decQuantity() {
      if (this.shoppingItem.quantity === 1) {
        return
      }

      this.shoppingItem.quantity--
    }

}
