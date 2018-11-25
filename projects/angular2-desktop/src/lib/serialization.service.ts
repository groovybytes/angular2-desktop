import {Injectable} from '@angular/core';
import {WindowSpecs} from './model/specs/WindowSpecs';
import {DesktopWindow} from './model/DesktopWindow';
import {Desktop} from './model/Desktop';
import {ShortCut} from './model/ShortCut';


@Injectable()
export class SerializationService {

  deSerializeWindow(specs: WindowSpecs): DesktopWindow {
    let window = new DesktopWindow(specs.title, specs.x, specs.x, specs.width, specs.height);
    window.shortCut=new ShortCut(specs.shortCut.title,specs.shortCut.icon,specs.shortCut.color);
    window.state.next(specs.state);
    window.active.next(specs.active);
    return window;
  }

  serializeDesktop(desktop: Desktop, windows: Array<DesktopWindow>): never {
    throw new Error('not implemented');

  }

}


