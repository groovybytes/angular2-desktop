import {Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {DesktopWindow} from '../model/DesktopWindow';
import {Angular2DesktopService} from '../angular2-desktop.service';
import {Subscription} from 'rxjs';
import {WindowSpecs} from '../model/specs/WindowSpecs';

@Component({
  selector: 'gb-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit, OnDestroy {

  @Input() specs: WindowSpecs;

  @HostBinding('attr.class')
  get clazz() {
    return this.window ? this.window.clazz : '';
  }

  window: DesktopWindow;

  private subscriptions:Array<Subscription>=[];

  /* @HostBinding('style')
   get getStyle():SafeStyle {
     let zIndex=this.window?this.window.zIndex:0;
     return this.sanitizer.bypassSecurityTrustStyle('z-index:'+zIndex.toString());

   }*/




  constructor(private desktop:Angular2DesktopService) {
  }

  ngOnInit() {
    this.window=this.desktop.registerWindow(this.specs);
    this.subscriptions.push(this.window.state.subscribe(() => this.desktop.onWindowStateChanged(this.window)));
    this.subscriptions.push(this.window.active.subscribe(() => this.desktop.onWindowActiveChanged(this.window)));

  }

  onClick(): void {
    this.desktop.focus(this.window);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription=>subscription.unsubscribe());
  }

}
