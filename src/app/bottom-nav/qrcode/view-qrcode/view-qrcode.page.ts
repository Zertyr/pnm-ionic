import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoxService } from 'src/app/services/box.service';
import html2canvas from 'html2canvas';
import {
  FileSharer
} from '@byteowls/capacitor-filesharer';
@Component({
  selector: 'app-view-qrcode',
  templateUrl: './view-qrcode.page.html',
  styleUrls: ['./view-qrcode.page.scss'],
})
export class ViewQrcodePage {

  label: string;
  delicate: number;
  itemsBox: any;
  myAngularxQrCode: any;
  constructor(private router: Router, private route: ActivatedRoute, private boxService: BoxService) { }


  /**
   * permet qu'a chaque fois qu'on arrive sur la vue on récupère bien le contenu du carton qu'on souhaite affiché
   */
  ionViewWillEnter(){
    let id:number;
    id = Number(this.route.snapshot.queryParamMap.get('id'));
    this.label = this.route.snapshot.queryParamMap.get('label');
    this.boxService.showItemByBox(id).then(value => 
      value.subscribe(data => {
        this.itemsBox = data
        this.myAngularxQrCode = JSON.stringify(this.itemsBox);
        this.delicate = this.itemsBox[0]?.delicate;
        if(this.delicate == 1){
          document.getElementById("qrcode").style.borderColor = "red !important";
          document.getElementById("qrcode").style.color = "red";
        } else {
          document.getElementById("qrcode").style.borderColor = "black !important";
          document.getElementById("qrcode").style.color = "black";
        }
        console.log('data :', this.myAngularxQrCode);
        
      })
    )
  }

  /**
   * permet de revenir sur la liste des cartons
   */
  goToListBox() {
    this.router.navigate(['/tabs/qrCode/list-qrcode']);
  }

  /**
   * permet de partager le QrCode en transformant la div ou il est contenu en canvas puis en base64 pour
   * finalement être partagé
   */
  share(){
    let node = document.getElementById('qrcode');
    // console.log('node',node);
    let dataUrl;
    html2canvas(node).then(canvas => {
      // console.log('canvas',canvas); 
      dataUrl = canvas.toDataURL('image/png', 1);
      FileSharer.share({
        filename: "qrCode.png",
        contentType: "image/png",
        // If you want to save base64:
        base64Data: dataUrl.replace(/^data:image\/[a-z]+;base64,/, ""),
        }).then(() => {
            // do sth
        }).catch(error => {
            console.error("File sharing failed", error.message);
        });
      // console.log(dataUrl); 
  });

  }

}
