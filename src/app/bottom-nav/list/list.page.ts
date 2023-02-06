import {Component, OnInit} from '@angular/core';
import {InventoryService} from "../../services/inventory.service";

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit{

  setInventoryListList: any = []

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.dataInventory();

  }
    dataInventory = () => {
     this.inventoryService.getLoggedInUser().then(value => {
       value.subscribe(value1 => {

         this.setInventoryListList = value1
         console.log(this.setInventoryListList)
       })
    })
  }

}
