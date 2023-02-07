import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {InventoryService} from "../../../services/inventory.service";

@Component({
  selector: 'app-listbox',
  templateUrl: './listbox.page.html',
  styleUrls: ['./listbox.page.scss'],
})
export class ListboxPage implements OnInit {

  inventoryList: any = []
  inventoryLabel: String;
  constructor(private router: Router, private route: ActivatedRoute, private inventoryService: InventoryService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(reqParams => {
      this.inventoryLabel = reqParams.label;
      this.inventoryService.getInventoryItems(reqParams.id).then(value => {
        value.subscribe(data => {
          this.inventoryList = data
          console.log(this.inventoryList)

        })
      })
      console.log("Params : " + reqParams.id)
      console.log("Params : " + reqParams.label)
    })
  }

  goToListInventory() {
    this.router.navigate(['/tabs/list']);

  }
}
