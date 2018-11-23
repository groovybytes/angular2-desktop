import {Injectable} from '@angular/core';
import {DesktopWindow} from './model/DesktopWindow';
import {WindowState} from './model/WindowState';
import * as _ from 'lodash';

@Injectable()
export class Angular2DesktopService {

  //private layout: AbstractLayout;
  private readonly animationTimeout: number = 1000;
  private windows:Array<DesktopWindow>=[];

  constructor() {

  }

  applyLayout(): void {
   // this.layout.apply();
  }

  reset(): void {
    //this.layout.reset();
  }

  getWindows(): Array<DesktopWindow> {
    return this.windows;
  }


  getWindow(id: string): DesktopWindow {
    return this.layout.getWindow(id);
  }

  addWindow(): DesktopWindow {

    let window = new DesktopWindow(100,100,400,400);
    this.windows.push(window);
    this.subscriptions.push(window1.position.subscribe(() => this.windowPositionChanged(window1)));
    this.subscriptions.push(window1.state.subscribe(() => this.windowStateChanged(window1)));

    return window1;
  }

  addWindowWithOrder(order: number): WindowInfo {
    let id = _.uniqueId('window');
    this.layout.addWindow(id, order);
    return this.getWindow(id).getInfo();
  }

  addHeader(): WindowInfo {
    return this.layout.addHeader().getInfo();
  }

  addFooter(): WindowInfo {
    return this.layout.addFooter().getInfo();
  }

  closeWindow(id: string): void {
    this.layout.close(id);
  }

  openWindow(id: string): void {
    this.layout.open(id);
  }

  minimize(id: string): void {
    let window = this.layout.getWindow(id);
    window.clazz += ' animated slideOutDown';
    this.layout.bringToFront(id);
    setTimeout(() => {
      window.state.next(WindowState.MINIMIZED);
      this.layout.bringToBack(window.id);
    }, this.animationTimeout);
  }

  maximize(id: string): void {
    let window = this.layout.getWindow(id);
    this.layout.bringToFront(id);
    window.state.next(WindowState.MAXIMIZED);

    if (window.state.getValue() === WindowState.MINIMIZED) window.clazz += ' animated slideInUp';
  }

  private updateWindowClass(window:DesktopWindow):void {
    window.clazz = "window";
    if (window.position.getValue() === WindowPosition.TOP) window.clazz += " window-top";
    else if (window.position.getValue() === WindowPosition.BOTTOM) window.clazz += " window-bottom";
    else if (window.position.getValue() === WindowPosition.LEFT) window.clazz += " window-left";
    else if (window.position.getValue() === WindowPosition.RIGHT) window.clazz += " window-right";
    else if (window.position.getValue() === WindowPosition.SIDEBAR_LEFT) window.clazz += " sidebar-left";
    else if (window.position.getValue() === WindowPosition.FIXED_TOP) window.clazz += " fixed-top";
    else if (window.position.getValue() === WindowPosition.FIXED_BOTTOM) window.clazz += " fixed-bottom";

    if (window.state.getValue() === WindowState.CLOSED) window.clazz += " window-closed";
    else if (window.state.getValue() === WindowState.MAXIMIZED) window.clazz += " window-maximized";
    else if (window.state.getValue() === WindowState.MINIMIZED) window.clazz += " window-minimized";

  }

}



/* serialize(): DesktopDto {
    /!*let dto = new DesktopDto();
    dto.windows = [];
    this.layout.getWindows().forEach(window => {
      let windowDto = new WindowDto();
      windowDto.id = window.id;
      windowDto.order = window.order;
      windowDto.position = window.position.getValue();
      windowDto.state = window.state.getValue();
      windowDto.clazz = window.clazz;
      windowDto.zIndex = window.zIndex;
      dto.windows.push(windowDto);
    });

    return dto;*!/

    return null;
  }


  deSerialize(dto: DesktopDto): void {

  /!*  dto.windows.forEach(windowDto => {

      let window = this.layout.addWindow(windowDto.id, windowDto.order);
      window.clazz = windowDto.clazz;
      window.position.next(windowDto.position);
      window.state.next(windowDto.state);
      window.zIndex = windowDto.zIndex ? windowDto.zIndex : 1;
    });

    this.layout.apply();*!/

  return null;

  }*/
