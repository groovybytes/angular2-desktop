import {Component, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {DesktopWindow} from '../model/DesktopWindow';
import {Angular2DesktopService} from '../angular2-desktop.service';
import {WindowState} from '../model/WindowState';
import {Subscription} from 'rxjs';

@Component({
  selector: 'gb-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit, OnDestroy {

  @Input() model: DesktopWindow;
  @Output() click: EventEmitter<void> = new EventEmitter();

  @HostBinding('attr.class')
  get clazz() {
    return this.model ? this.model.clazz : '';
  }

  /* @HostBinding('style')
   get getStyle():SafeStyle {
     let zIndex=this.window?this.window.zIndex:0;
     return this.sanitizer.bypassSecurityTrustStyle('z-index:'+zIndex.toString());

   }*/




  constructor(private desktop: Angular2DesktopService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {

  }

  onClick(): void {
    this.click.emit();
  }

  ngOnDestroy(): void {
    this.model.destroy();
  }

}
