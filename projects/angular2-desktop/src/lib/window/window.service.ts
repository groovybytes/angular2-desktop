import {Inject, Injectable} from '@angular/core';
import {DesktopWindow} from '../model/DesktopWindow';
import {Desktop} from '../model/Desktop';
import {SerializationService} from '../serialization.service';
import {WindowSpecs} from '../model/specs/WindowSpecs';


@Injectable()
export class WindowService {

  constructor(@Inject('desktop') private desktop: Desktop, private serializer: SerializationService) {


  }


  create(specs:WindowSpecs): DesktopWindow {

    let window = this.serializer.deSerializeWindow(specs);
    if (window.width<this.desktop.configuration.windowConfig.minWidth)
      window.width=this.desktop.configuration.windowConfig.minWidth;

    if (window.height<this.desktop.configuration.windowConfig.minHeight)
      window.height=this.desktop.configuration.windowConfig.minHeight;


    this.desktop.windows.push(window);
    return window;
  }


}
