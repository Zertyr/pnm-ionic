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
}
