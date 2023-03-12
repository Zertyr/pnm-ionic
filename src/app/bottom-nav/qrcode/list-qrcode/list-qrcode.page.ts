import { Component, OnDestroy, OnInit } from '@angular/core';
import { TabsService } from 'src/app/services/tabs.service';

@Component({
  selector: 'app-list-qrcode',
  templateUrl: './list-qrcode.page.html',
  styleUrls: ['./list-qrcode.page.scss'],
})
export class ListQrcodePage implements OnInit {

  constructor(private tabService:TabsService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.tabService.setShowTopBar(true);
  }

  ionViewWillLeave(){
    this.tabService.setShowTopBar(false);
  }

}
