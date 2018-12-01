import {Injectable} from '@angular/core';
import {DesktopWindow} from './model/DesktopWindow';
import {Desktop} from './model/Desktop';


@Injectable()
export class SerializationService {

  deSerializeWindow(specs: any): DesktopWindow {
    return null;
  }

  serializeDesktop(desktop: any): never {
    throw new Error('not implemented');
  }

  deSerializeDesktop(desktopSpecs: any): Desktop {
    return null;

  }

}


