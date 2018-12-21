import {DesktopWindow} from './DesktopWindow';
import {DesktopConfiguration} from './DesktopConfiguration';
import {DockPosition} from './DockPosition';
import {AsyncSubject, BehaviorSubject, Observable, Subject} from 'rxjs';
import {Angular2DesktopComponent} from '../angular2-desktop.component';
import {EventEmitter, ViewContainerRef} from '@angular/core';
import {DesktopApplication} from './DesktopApplication';
import {filter, takeWhile} from 'rxjs/operators';

export class Desktop {
  windows: Array<DesktopWindow> = [];
  applications: Array<DesktopApplication<any>> = [];
  orders: Array<string> = [];
  configuration: DesktopConfiguration = new DesktopConfiguration();
  dockPreview: Subject<DockPosition> = new Subject();
  windowContainer: ViewContainerRef;
  ready: AsyncSubject<boolean> = new AsyncSubject();

  getTopWindow(): DesktopWindow {
    return this.windows.find(window => window.id === this.orders[this.orders.length - 1]);
  }

  getWindow(id: string): DesktopWindow {
    return this.windows.find(window => window.id === id);
  }

  getWindowsForApp(appId: string): Array<DesktopWindow> {
    return this.windows.filter(window => window.appId === appId);
  }

  wait(): AsyncSubject<boolean> {
    return  this.ready;//  this.ready.pipe(filter((state) => state === false));
  }


  removeWindow(id: string): void {

    let index = this.windows.findIndex(window => window.id === id);
    if (index >= 0) {
      this.windows[index].close();
      this.windows.splice(index, 1);
    }

  }
}
