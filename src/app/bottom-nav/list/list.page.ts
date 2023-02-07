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

  constructor(private inventoryService: InventoryService, private route: Router) {}

  ngOnInit(): void {
    this.dataInventory();

  }
    dataInventory = () => {
     this.inventoryService.getLoggedInUser().then(value => {
       value.subscribe(data => {

         this.inventoryList = data
         console.log(this.inventoryList)
       })
    })
  }

  goAnOtherPage() {
    this.route.navigate(['/tabs/location']);
  }
}
