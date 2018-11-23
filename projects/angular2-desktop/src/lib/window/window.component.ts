import {Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {DesktopWindow} from "../model/DesktopWindow";
import {Angular2DesktopService} from '../angular2-desktop.service';

@Component({
  selector: 'gb-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit,OnChanges {

  @Input() window:DesktopWindow;

  @HostBinding('attr.class')
  get clazz() {
    return this.window?this.window.clazz:"";
  }
 /* @HostBinding('style')
  get getStyle():SafeStyle {
    let zIndex=this.window?this.window.zIndex:0;
    return this.sanitizer.bypassSecurityTrustStyle('z-index:'+zIndex.toString());

  }*/


  constructor(private desktop: Angular2DesktopService,private sanitizer:DomSanitizer) {
  }

  ngOnInit() {
    //this.desktop.addWindowWithOrder(this.order);

  }

  ngOnChanges(changes: SimpleChanges): void {

    /*if (changes["id"]){
      this.window=this.layout.getWindow(this.id);
    }*/
  }

}
