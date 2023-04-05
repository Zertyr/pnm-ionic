import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoxService } from 'src/app/services/box.service';
import { TabsService } from 'src/app/services/tabs.service';

@Component({
  selector: 'app-list-qrcode',
  templateUrl: './list-qrcode.page.html',
  styleUrls: ['./list-qrcode.page.scss'],
})
export class ListQrcodePage implements OnInit {

  constructor(private tabService:TabsService, private _boxService: BoxService, private router: Router) { }

  boxList: any;

  ngOnInit() {
    this.getAllBox();
  }

  ionViewWillEnter(){
    this.tabService.setShowTopBar(true);
  }

  ionViewWillLeave(){
    this.tabService.setShowTopBar(false);
  }

  async getAllBox(){
    this.boxList = await (await this._boxService.getAllBox()).toPromise();
    console.log('boxlist : ' + this.boxList);
    
  }

  async deleteBox(id:number){
    await (await this._boxService.deleteBox(id)).toPromise();
    this.boxList = this.boxList.filter(value => value.id !== id);
  }

  goToQrcode(item: any) {
    this.router.navigate(['/tabs/qrCode/view-qrcode'],{queryParams: {id: item.id, label: item.label}});
  }
}
