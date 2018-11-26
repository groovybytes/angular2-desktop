import {DesktopWindow} from './DesktopWindow';
import {WindowSpecs} from './specs/WindowSpecs';
import {DesktopConfiguration} from './DesktopConfiguration';

export class Desktop {
  windows:Array<DesktopWindow>=[];
  orders:Array<string>=[];
  configuration:DesktopConfiguration=new DesktopConfiguration();
}
