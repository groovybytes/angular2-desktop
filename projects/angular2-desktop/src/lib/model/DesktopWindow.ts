import {WindowState} from "./WindowState";
import {BehaviorSubject} from "rxjs";
import * as _ from "lodash";

export class DesktopWindow {
  constructor(x: number, y: number, width: number, height: number) {
    this.id = _.uniqueId('window_');
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  title:string;
  clazz: string;
  id: string;
  zIndex: number = 1;
  //zIndexTmp: number = 1;
  state: BehaviorSubject<WindowState> = new BehaviorSubject(WindowState.CLOSED);
  //position: BehaviorSubject<WindowPosition> = new BehaviorSubject(WindowPosition.LEFT);
  x:number;
  y:number;
  width:number;
  height:number;

}
