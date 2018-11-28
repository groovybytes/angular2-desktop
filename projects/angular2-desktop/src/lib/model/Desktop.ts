import {DesktopWindow} from './DesktopWindow';
import {WindowSpecs} from './specs/WindowSpecs';
import {DesktopConfiguration} from './DesktopConfiguration';
import {DockPosition} from './DockPosition';
import {Subject} from 'rxjs';
import {TaskBarComponent} from '../bar/taskbar.component';
import {Angular2DesktopComponent} from '../angular2-desktop.component';

export class Desktop {
  windows:Array<DesktopWindow>=[];
  orders:Array<string>=[];
  configuration:DesktopConfiguration=new DesktopConfiguration();
  dockPreview:Subject<DockPosition>=new Subject();
  taskBar:TaskBarComponent;
  component:Angular2DesktopComponent;

  getTopWindow():DesktopWindow{
    return this.windows.find(window=>window.id===this.orders[this.orders.length-1]);
  }

  getWindow(id:string):DesktopWindow{
    return this.windows.find(window=>window.id===id);
  }
}
