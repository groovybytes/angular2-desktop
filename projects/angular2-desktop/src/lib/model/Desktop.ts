import {DesktopWindow} from './DesktopWindow';
import {DesktopConfiguration} from './DesktopConfiguration';
import {DockPosition} from './DockPosition';
import {Subject} from 'rxjs';
import {Angular2DesktopComponent} from '../angular2-desktop.component';
import {EventEmitter, ViewContainerRef} from '@angular/core';
import {DesktopApplication} from './DesktopApplication';

export class Desktop {
  windows:Array<DesktopWindow>=[];
  applications:Array<DesktopApplication<any> >=[];
  orders:Array<string>=[];
  configuration:DesktopConfiguration=new DesktopConfiguration();
  dockPreview:Subject<DockPosition>=new Subject();
  windowContainer:ViewContainerRef;

  getTopWindow():DesktopWindow{
    return this.windows.find(window=>window.id===this.orders[this.orders.length-1]);
  }

  getWindow(id:string):DesktopWindow{
    return this.windows.find(window=>window.id===id);
  }

  getWindowsForApp(appId:string):Array<DesktopWindow>{
    return this.windows.filter(window=>window.appId===appId);
  }
  getOpenWindowsForApp(appId:string):Array<DesktopWindow>{
    return this.getWindowsForApp(appId).filter(window=>window.isOpen());
  }

}
