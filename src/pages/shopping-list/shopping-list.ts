import { Component } from '@angular/core'
import { NavController, NavParams, ActionSheetController } from 'ionic-angular'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import _ from 'lodash'
import moment from 'moment'

import { AddShoppingPage } from '../add-shopping/add-shopping'
import { ShoppingItem } from '../../modals/shopping-item/shopping-item.interface'
import { Observable } from 'rxjs'
import { EditShoppingItemPage } from '../edit-shopping-item/edit-shopping-item'

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  latestDate: any
  shoppingListRef$:  AngularFirestoreCollection<ShoppingItem>
  items: Observable<ShoppingItem[]>

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fireStore: AngularFirestore,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.shoppingListRef$ = this.fireStore.collection<ShoppingItem>('grocery-list')
    this.items = this.shoppingListRef$.valueChanges()
    this.items.subscribe((items: ShoppingItem[]) => {
      const dates = _.map(items, item => item.createdDate)
      const latestDate = _.max(dates)
      console.log(latestDate)
      this.latestDate = moment(latestDate).format('MM/DD')
    })
  }

  navigateToAddShoppingPage() {
    // Navigate the user to the AddShoppingPage
    this.navCtrl.push(AddShoppingPage)
  }

  onItemSelect(event, id: string) {
    this.fireStore.collection('grocery-list').doc(id).update({
      isChecked: event,
    })
  }

  selectShoppingItem(item: ShoppingItem) {
    this.actionSheetCtrl.create({
      title: item.name,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            console.log(item)
            this.navCtrl.push(EditShoppingItemPage, {id: item.id})
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.shoppingListRef$.doc(item.id).delete()
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    }).present()
  }

}
