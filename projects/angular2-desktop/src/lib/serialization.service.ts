import {Injectable} from '@angular/core';
import {WindowSpecs} from './model/specs/WindowSpecs';
import {DesktopWindow} from './model/DesktopWindow';
import {Desktop} from './model/Desktop';
import {ShortCut} from './model/ShortCut';
import {WindowState} from './model/WindowState';


@Injectable()
export class SerializationService {

  deSerializeWindow(specs: WindowSpecs): DesktopWindow {
    let window = new DesktopWindow(specs.title,specs.state, specs.x, specs.x, specs.width, specs.height);
    window.shortCut=new ShortCut(window.id,specs.shortCut.title,specs.shortCut.icon,specs.shortCut.color);
    return window;
  }

  serializeDesktop(desktop: Desktop, windows: Array<DesktopWindow>): never {
    throw new Error('not implemented');

  }

}


