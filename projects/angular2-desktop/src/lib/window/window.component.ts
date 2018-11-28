import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {DesktopWindow} from '../model/DesktopWindow';
import {Angular2DesktopService} from '../angular2-desktop.service';
import {Subscription} from 'rxjs';
import {WindowSpecs} from '../model/specs/WindowSpecs';
import {Desktop} from '../model/Desktop';
import {WindowService} from './window.service';

@Component({
  selector: 'gb-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit, OnDestroy {

  @Input() specs: WindowSpecs;
  window: DesktopWindow;
  dockToolsVisible:boolean=false;
  private subscriptions: Array<Subscription> = [];

  desktop: Desktop;

  constructor(
    @Inject('desktop') desktop: Desktop,
    private desktopService: Angular2DesktopService, private windowService: WindowService) {
    this.desktop=desktop;
  }

  ngOnInit() {

    this.window = this.windowService.create(this.specs);
    this.subscriptions.push(this.window.state.subscribe(() => this.desktopService.onWindowStateChanged(this.window)));
    this.subscriptions.push(this.window.dockPosition.subscribe(() =>
    {
      this.dockToolsVisible=false;
      this.desktopService.onWindowDockPositionChanged(this.window);
    }));

  }

  getStyle(){



    return {
      'z-index':this.desktop.orders.indexOf(this.window.id)+1,
      'transform':
        'translate(' + (this.window.animatedX!=null?this.window.animatedX:this.window.x+'px')+',' +
        (this.window.animatedY!=null?this.window.animatedY:(this.window.y+'px')) + ')',
      'width':this.window.width+'px',
      'height':this.window.height+'px'};
  }


  onClick(): void {
    this.desktopService.moveUp(this.window);
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  dockBtnClicked():void{
    this.dockToolsVisible=!this.dockToolsVisible;
  }


}
