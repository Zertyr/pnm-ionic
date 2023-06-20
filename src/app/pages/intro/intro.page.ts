import { AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { INTRO_KEY } from 'src/app/guards/intro.guard';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { SwiperComponent } from 'swiper/angular';
import { SwiperOptions } from 'swiper';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  encapsulation: ViewEncapsulation.None
})

export class IntroPage implements AfterContentChecked {
  @ViewChild('swiper')swiper: SwiperComponent;

  config: SwiperOptions = {
    autoplay: true,
    keyboard: true,
    pagination: true,
    slidesPerView: 'auto',
    scrollbar: true,
    zoom: true,
  }

  constructor(private router: Router) { }

  ngAfterContentChecked(): void {
    if(this.swiper){
      this.swiper.updateSwiper({});
    }
  }

  async start(){
    await Preferences.set({key: INTRO_KEY, value: 'true'});
    this.router.navigateByUrl('/login', {replaceUrl:true});
  }

}
