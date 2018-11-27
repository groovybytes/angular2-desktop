import {Inject, Injectable} from '@angular/core';
import {DesktopWindow} from './model/DesktopWindow';
import {WindowState} from './model/WindowState';
import {WindowSpecs} from './model/specs/WindowSpecs';
import {SerializationService} from './serialization.service';
import {Desktop} from './model/Desktop';

@Injectable()
export class Angular2DesktopService {


  constructor(@Inject('desktop') private desktop: Desktop) {
    this.desktop = desktop;

  }


  onWindowStateChanged(window: DesktopWindow): void {
    if (window.state.getValue() === WindowState.NORMAL) {
      this.moveUp(window);
    }
    else if (window.state.getValue() === WindowState.CLOSED) {
      this.removeFromOrders(window.id);
    }
    else if (window.state.getValue() === WindowState.MINIMIZED) {
      this.removeFromOrders(window.id);
    }
    else if (window.state.getValue() === WindowState.MAXIMIZED) {
      this.moveUp(window);
    }
    window.updateClass();

  }

  onWindowDockPositionChanged(window: DesktopWindow): void {

  }

  onTaskBarClick(window: DesktopWindow): void {
    if (window.state.getValue() === WindowState.MINIMIZED) window.state.next(WindowState.NORMAL);
    else this.moveUp(window);
  }


  hasFocus(id: string): boolean {
    return this.desktop.orders[this.desktop.orders.length - 1] === id;
  }


  private removeFromOrders(id: string): void {
    let index = this.desktop.orders.indexOf(id);
    this.desktop.orders.splice(index, 1);
  }

  moveUp(window: DesktopWindow): void {
    let index = this.desktop.orders.indexOf(window.id);
    if (index===-1) this.desktop.orders.push(window.id);
    else if (index < this.desktop.orders.length-1){
      this.desktop.orders.splice(index, 1);
      this.desktop.orders.push(window.id);
    }

    this.desktop.orders.forEach((windowId,i)=>{

      console.log(this.desktop.getWindow(windowId).title+";"+i);
    });

  }

}


