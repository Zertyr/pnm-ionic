import { Component } from '@angular/core';
import { TabsService } from 'src/app/services/tabs.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  showTopBar: boolean = false;

  constructor(private tabService: TabsService) {
    this.tabService._showTopBar.subscribe(value => this.showTopBar = value);
  }


}
