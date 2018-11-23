import {Component, HostBinding, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
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

  @Input() window: DesktopWindow;

  @HostBinding('attr.class')
  get clazz() {
    return this.window ? this.window.clazz : '';
  }

  /* @HostBinding('style')
   get getStyle():SafeStyle {
     let zIndex=this.window?this.window.zIndex:0;
     return this.sanitizer.bypassSecurityTrustStyle('z-index:'+zIndex.toString());

   }*/

  private subscriptions: Array<Subscription> = [];


  constructor(private desktop: Angular2DesktopService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.subscriptions.push(this.window.state.subscribe(() => this.updateClass()));

  }

  isVisible(): boolean {
    return this.window.state.getValue() === WindowState.MAXIMIZED
      || this.window.state.getValue() === WindowState.NORMAL;
  }


  private updateClass(): void {
    this.window.clazz = 'window';
    /*if (this.position.getValue() === WindowPosition.TOP) this.clazz += " window-top";
    else if (this.position.getValue() === WindowPosition.BOTTOM) this.clazz += " window-bottom";
    else if (this.position.getValue() === WindowPosition.LEFT) this.clazz += " window-left";
    else if (this.position.getValue() === WindowPosition.RIGHT) this.clazz += " window-right";
    else if (this.position.getValue() === WindowPosition.SIDEBAR_LEFT) this.clazz += " sidebar-left";
    else if (this.position.getValue() === WindowPosition.FIXED_TOP) this.clazz += " fixed-top";
    else if (this.position.getValue() === WindowPosition.FIXED_BOTTOM) this.clazz += " fixed-bottom";*/

    if (this.window.state.getValue() === WindowState.CLOSED) this.window.clazz += ' window-closed';
    else if (this.window.state.getValue() === WindowState.MAXIMIZED) this.window.clazz += ' window-maximized';
    else if (this.window.state.getValue() === WindowState.MINIMIZED) this.window.clazz += ' window-minimized';

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscr => subscr.unsubscribe());
  }

}
