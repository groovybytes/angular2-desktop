import {WindowParams} from './WindowParams';

export class DesktopApplication<T>{
  id:string;
  path:string;
  icon:string;
  title:string;
  component:T;
  defaultWindowParams:WindowParams;
  //singleInstanceMode:boolean=true;
}
