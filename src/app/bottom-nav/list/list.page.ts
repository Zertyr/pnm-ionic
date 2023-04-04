import {Component, OnInit} from '@angular/core';
import {InventoryService} from "../../services/inventory.service";
import {Router} from "@angular/router";
import {ItemService} from "../../services/item.service";

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit{

  inventoryList: any = []
  newListName: string ="";

  constructor(private inventoryService: InventoryService, private router: Router, private itemService: ItemService) {}

  ngOnInit(): void {
    this.dataInventory();

  }
    dataInventory = () => {
     this.inventoryService.getInventoriesByUserID().then(value => {
       value.subscribe(data => {

         this.inventoryList = data
         console.log(this.inventoryList)
       })
    })
  }



  gotoInventoryBox(item: any) {
    this.router.navigate(['/tabs/list/listbox'],{queryParams: {id: item.id, label: item.label}});
  }

  /**
   *Create a new Inventory & add it to the current list of inventory
   */
  async createNewInventory() {

    if (this.newListName.length < 1) {
      alert("Le nom de la pièce est trop court (1 caractère minimum)")
      return;
    }
    this.inventoryService.createNewInventory(this.newListName).then(value => {
      value.subscribe(data =>{

        this.inventoryList.push({id:data,label:this.newListName});
        console.log("re : " + JSON.stringify(this.inventoryList))

      })
    })
  }

  /**
   * Delete inventory and delete items related to the inventory
   * @param inventoryId
   */
   deleteInventory(inventoryId: number) {

    let itemList;
    this.inventoryService.getInventoryItems(inventoryId).then(value => {

      value.subscribe(data => {
        itemList = data
        itemList.forEach(value2 => {
          this.itemService.deleteItem(value2.id)

        })
      })
    })

    this.inventoryService.deleteInventory(inventoryId).then(() => {

      const listWithoutDeletedInventory = this.inventoryList.filter(value => value.id !== inventoryId);
      this.inventoryList = listWithoutDeletedInventory
    });

  }
}
