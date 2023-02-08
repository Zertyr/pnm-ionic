import {Component, OnInit} from '@angular/core';
import {InventoryService} from "../../services/inventory.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit{

  inventoryList: any = []
  newListName: string ="";

  constructor(private inventoryService: InventoryService, private router: Router) {}

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
   *Create a new Inventory
   * Call createNewInventory, get the lastInventory created (new one), add it to the current list of inventory
   */
  async createNewInventory() {
    let lastInventoryCreated ;

    if (this.newListName.length < 1) {
      alert("Le nom de la pièce est trop court (1 caractère minimum)")
      return;
    }
    this.inventoryService.createNewInventory(this.newListName).then(() => {
      this.inventoryService.getLastInventoryByUserID().then(data => {
        data.subscribe(value => {
          lastInventoryCreated = value;
          this.inventoryList.push(lastInventoryCreated);
        })
      })
    }).catch((error) => {
      console.log("Error : ",error.message)
    });
  }
}
