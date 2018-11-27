import {AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DesktopWindow} from '../model/DesktopWindow';
import {Angular2DesktopService} from '../angular2-desktop.service';
import {Subscription} from 'rxjs';
import {WindowSpecs} from '../model/specs/WindowSpecs';
import {Desktop} from '../model/Desktop';
import {WindowService} from './window.service';
import {DockPosition} from '../model/DockPosition';
import {WindowState} from '../model/WindowState';

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
  DockPosition=DockPosition;
  desktop: Desktop;

  constructor(
    @Inject('desktop') desktop: Desktop,
    private desktopService: Angular2DesktopService, private windowService: WindowService) {
    this.desktop=desktop;
  }

  ngOnInit() {

    this.window = this.windowService.create(this.specs);
    this.subscriptions.push(this.window.state.subscribe(() => this.desktopService.onWindowStateChanged(this.window)));
    this.subscriptions.push(this.window.dockPosition.subscribe(() => this.desktopService.onWindowDockPositionChanged(this.window)));

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


  dock(position:DockPosition):void{
    this.desktop.getTopWindow().dockPosition.next(position);
    this.desktop.getTopWindow().state.next(WindowState.DOCKED);

    this.dockToolsVisible=false;

  }

 /* getBodyHeight():number{
    return this.headerHeight?this.window.height-this.headerHeight:0;
  }*/

}
