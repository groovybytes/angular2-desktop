import {Inject, Injectable, Input} from '@angular/core';
import {DesktopWindow} from '../model/DesktopWindow';
import {Desktop} from '../model/Desktop';
import {SerializationService} from '../serialization.service';
import {WindowState} from '../model/WindowState';
import {DockPosition} from '../model/DockPosition';


@Injectable()
export class WindowService {

  constructor(@Inject('desktop') private desktop: Desktop, private serializer: SerializationService) {


  }


  create(id: string,
         title: string,
         windowState: WindowState,
         position: DockPosition,
         alwaysOnTop: boolean,
         showDockingTools: boolean,
         x: number,
         y: number,
         width: number,
         height: number): DesktopWindow {


    let window = new DesktopWindow(id, title, windowState, position, x, y, width, height);
    window.alwaysOnTop=alwaysOnTop;
    window.showDockingTools=showDockingTools;
    if (window.width < this.desktop.configuration.windowConfig.minWidth)
      window.width = this.desktop.configuration.windowConfig.minWidth;

    if (window.height < this.desktop.configuration.windowConfig.minHeight)
      window.height = this.desktop.configuration.windowConfig.minHeight;


    this.desktop.windows.push(window);
    return window;
  }


}
