import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {DesktopWindow} from '../model/DesktopWindow';
import {Angular2DesktopService} from '../angular2-desktop.service';
import {Subscription} from 'rxjs';
import {WindowSpecs} from '../model/specs/WindowSpecs';
import {Desktop} from '../model/Desktop';
import {WindowService} from './window.service';
import {WindowState} from '../model/WindowState';

@Component({
  selector: 'gb-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit, OnDestroy {

  @Input() specs: WindowSpecs;

  window: DesktopWindow;


  private subscriptions: Array<Subscription> = [];


  constructor(
    @Inject('desktop') private desktop: Desktop,
    private desktopService: Angular2DesktopService, private windowService: WindowService) {
  }

  ngOnInit() {

    this.window = this.windowService.create(this.specs);
    this.subscriptions.push(this.window.state.subscribe(() => this.desktopService.onWindowStateChanged(this.window)));
    this.subscriptions.push(this.window.dockPosition.subscribe(() => this.desktopService.onWindowDockPositionChanged(this.window)));

  }

  onClick(): void {
    this.desktopService.moveUp(this.window);
  }

  getOrder(): number {
    return this.desktop.orders.indexOf(this.window.id);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
