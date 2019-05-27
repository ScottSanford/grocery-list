import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'
import { ShoppingItem } from '../../modals/shopping-item/shopping-item.interface'
import { Observable } from 'rxjs'


@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  id: string
  shoppingItem: AngularFirestoreDocument<ShoppingItem>
  item: Observable<ShoppingItem>
  newItem = {} as ShoppingItem

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fireStore: AngularFirestore) {
      this.id = this.navParams.get('id')
      this.shoppingItem = this.fireStore.doc(`grocery-list/${this.id}`)
      this.item = this.shoppingItem.valueChanges()
  }

  updateName(event) {
    console.log(event)
  }

  updateQuantity(event) {
    console.log(event)
  }

  updateItem() {
    console.log(this.newItem)
    this.fireStore.collection('grocery-list').doc(this.id).update({
      name: this.newItem.name,
      isChecked: false,
      quantity: Number(this.newItem.quantity)
    }).then(() => {

      // Navigate the user back to the ShoppingPage
      this.navCtrl.pop()
    })
  }

}
