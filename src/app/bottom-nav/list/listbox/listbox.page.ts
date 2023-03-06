import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {InventoryService} from "../../../services/inventory.service";
import {ItemService} from "../../../services/item.service";

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
  constructor(private router: Router, private route: ActivatedRoute, private inventoryService: InventoryService, private itemService: ItemService) { }

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
   * Create a new Item
   * Call createNewItem, get the lastItem created (new one), add it to the current list of items
   */
  async createNewItem() {

    if (this.newItemName.length < 1) {
      alert("Le nom de l'objet est trop court (1 minimum)")
      return;
    }
    await this.itemService.createNewItem(this.newItemName, this.inventoryId).then(() =>{
      this.getLastItem();
    });

  }

  async getLastItem() {
    let lastItemCreated;

    await this.itemService.getLastItemByInventory(this.inventoryId).then(data => {
      data.subscribe(value => {
        lastItemCreated = value
        this.itemList.push(lastItemCreated)
      })
    }).catch((error) => {
      console.log("Error : ", error.message)
    });
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
}
