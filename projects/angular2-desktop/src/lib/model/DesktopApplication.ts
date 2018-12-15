import {WindowParams} from './WindowParams';
import {EventEmitter} from '@angular/core';

export class DesktopApplication<T>{
  id:string;
  path:string;
  icon:string;
  title:string;
  component:T;
  defaultWindowParams:WindowParams;
  //initializer:(component:T)=>void;
  singleInstanceMode:boolean=true;
  //readonly initialize:EventEmitter<T>=new EventEmitter();
}
