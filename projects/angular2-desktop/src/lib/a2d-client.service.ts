import {Inject, Injectable} from '@angular/core';
import {Desktop} from './model/Desktop';

@Injectable({
  providedIn: 'root'
})
export class A2dClientService {

  constructor(@Inject('desktop') private desktop: Desktop) {
  }

  openWindow(id: string): void {
    this.desktop.getWindow(id).normalize();
  }
  closeWindow(id: string): void {
    this.desktop.getWindow(id).close();
  }

  openApplication(id:string):void{
    this.desktop.createApp.emit(id);
  }

  addWindow(id: string): void {

  }

  removeWindow(id:string):void{

  }

}
