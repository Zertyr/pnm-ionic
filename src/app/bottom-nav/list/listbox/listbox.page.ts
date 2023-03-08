import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {InventoryService} from "../../../services/inventory.service";
import {ItemService} from "../../../services/item.service";
import {BoxService} from "../../../services/box.service";
import {ItemBoxService} from "../../../services/item-box.service";

@Component({
  selector: 'app-listbox',
  templateUrl: './listbox.page.html',
  styleUrls: ['./listbox.page.scss'],
})
export class ListboxPage implements OnInit {

  itemList: any = []
  inventoryLabel: string;
  inventoryId: number;
  newItemName: string;
  constructor(private router: Router, private route: ActivatedRoute, private inventoryService: InventoryService, private itemService: ItemService,
              private boxService: BoxService, private itemBoxService: ItemBoxService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(reqParams => {
      this.inventoryLabel = reqParams.label;
      this.inventoryId = reqParams.id;
      this.inventoryService.getInventoryItems(reqParams.id).then(value => {
        value.subscribe(data => {
          this.itemList = data
        })
      })
    })
  }

  /**
   * Redirect to Inventory list page
   */
  goToListInventory() {
    this.router.navigate(['/tabs/list']);

  }

  /**
   * Create a new Item
   * Call createNewItem, get the lastItem created (new one), add it to the current list of items
   */
  async createNewItem() {
    let lastItemCreated;

    if (this.newItemName.length < 1) {
      alert("Le nom de l'objet est trop court (1 minimum)")
      return;
    }
    this.itemService.createNewItem(this.newItemName, this.inventoryId).then(() => {
      this.itemService.getLastItemByInventory(this.inventoryId).then(data => {
        data.subscribe(value => {
          lastItemCreated = value
          this.itemList.push(lastItemCreated)
        })
      }).catch((error) => {
        console.log("Error : ", error.message)
      });
    })
  }

  /**
   * Delete an item
   * @param itemId
   */
  deleteItem(itemId: number) {
    this.itemService.deleteItem(itemId).then(() => {

      const listWithoutDeletedItem = this.itemList.filter(value => value.id !== itemId);
      this.itemList = listWithoutDeletedItem;
    })
  }

  /**
   * Launched after less quantity button has been pressed
   * @param index = index of the item inside itemList
   */
  buttonMinusPressed(index: number) {
    const newItems = this.itemList;

    if (newItems[index].quantity <= 0) {
      return;
    }
    newItems[index].quantity--
    this.itemList = newItems
     }

  /**
   * Launched after add quantity button has been pressed
   * @param index = index of the item inside itemList
   */
  buttonPlusPressed(index : number) {
    const newItems = this.itemList;
    newItems[index].quantity++
    this.itemList = newItems
  }

  /**
   * Method launched after click on button "Generate a Box"
   * This method create a box
   * after that, get the last box from the user (to get the id of the new box in the bdd)
   * fill the table ItemBox with items selected by the user
   */
    async generateBox() {
    alert("Carton terminé");
    let lastBoxOfUserId;
    await this.boxService.generateBoxes(this.inventoryLabel).then(async () => {
      await this.boxService.getLastBoxFromTheUser().then(data => {
        data.subscribe(value => {

          lastBoxOfUserId = value
          console.log(this.itemList.map(value => value).filter(value => value.quantity > 0))
          let itemInBox: Array<any> = this.itemList.map(value => value).filter(value => value.quantity > 0)
          for (let i = 0; i < itemInBox.length; i++) {
            this.itemBoxService.createItemBox(itemInBox[i].id, lastBoxOfUserId.id, itemInBox[i].quantity)
          }
        })
      })
    })
  }
}
