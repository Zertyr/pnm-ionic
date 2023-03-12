import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { TabsService } from 'src/app/services/tabs.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'qrcode.page.html',
  styleUrls: ['qrcode.page.scss']
})

export class QrCodePage implements OnInit, OnDestroy {

  //visibility of the button scanner
  scannerButton: boolean = true;

  //visibility of the button close
  scanActive: boolean = false;

  //visibility of the result
  scannedResult: any;

  constructor(private tabService: TabsService) {
  }

  async askUser() {
    this.prepare();
    const c = confirm('Do you want to scan a barcode?');

    if (c) {
      await this.didUserGrantPermission().then(res => {
        if (res) {
          this.startScan();
        }
      });
    } else {
      this.stopScan();
    }
  };

  async didUserGrantPermission() {
    // check if user already granted permission
    const status = await BarcodeScanner.checkPermission({ force: false });

    if (status.granted) {
      // user granted permission
      return true;
    }

    if (status.denied) {
      // the user denied permission for good
      // redirect user to app settings if they want to grant it anyway
      const c = confirm('If you want to grant permission for using your camera, enable it in the app settings.');
      if (c) {
        BarcodeScanner.openAppSettings();
      }
    }

    if (status.asked) {
      // system requested the user for permission during this call
      // only possible when force set to true
    }

    if (status.neverAsked) {
      // user has not been requested this permission before
      // it is advised to show the user some sort of prompt
      // this way you will not waste your only chance to ask for the permission
      const c = confirm('We need your permission to use your camera to be able to scan barcodes');
      if (!c) {
        return false;
      }
    }

    if (status.restricted || status.unknown) {
      // ios only
      // probably means the permission has been denied
      return false;
    }

    // user has not denied permission
    // but the user also has not yet granted the permission
    // so request it
    const statusRequest = await BarcodeScanner.checkPermission({ force: true });

    if (statusRequest.asked) {
      // system requested the user for permission during this call
      // only possible when force set to true
    }

    if (statusRequest.granted) {
      // the user did grant the permission now
      return true;
    }

    // user did not grant the permission, so he must have declined the request
    return false;
  };

  prepare() {
    BarcodeScanner.prepare();
  };

  async startScan() {
    document.querySelector('body').classList.add('scanner-active');
    this.scanActive = true;
    this.scannerButton = false;
    // Check camera permission
    // This is just a simple example, check out the better checks below
    await BarcodeScanner.checkPermission({ force: true });

    // make background of WebView transparent
    // note: if you are using ionic this might not be enough, check below
    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content
      this.scannedResult = JSON.parse(result.content);
      document.querySelector('body').classList.remove('scanner-active');
      this.scanActive = false;
      this.scannerButton = true;
    }
  };

  stopScan() {
    this.scanActive = false;
    this.scannerButton = true;

    BarcodeScanner.stopScan();
  };
  ngOnInit() {
  }

  ionViewWillEnter(){
    this.tabService.setShowTopBar(true);
  }
  ngOnDestroy(): void {

  }
  ionViewWillLeave() {
    this.stopScan();
    this.tabService.setShowTopBar(false);
  }



}
