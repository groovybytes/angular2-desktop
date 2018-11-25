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


  validate(): void {
    if (this.desktop.windows.length > 0) {
      let activeWindows = this.desktop.windows.filter(window => window.active.getValue());
      if (activeWindows.length === 0) this.focus(this.desktop.windows[0]);

    }

  }

  focus(window: DesktopWindow): void {
    window.active.next(true);
    this.desktop.windows
      .filter(_window => _window.id !== window.id)
      .forEach(window => window.active.next(false));

    this.moveUp(window);
  }

  getWindow(id: string): DesktopWindow {
    return this.desktop.windows.find(window => window.id === id);
  }

  maximize(window: DesktopWindow): void {
    window.state.next(WindowState.MAXIMIZED);
  }

  minimize(window: DesktopWindow): void {
    window.state.next(WindowState.MINIMIZED);
  }

  normalize(window: DesktopWindow): void {
    window.state.next(WindowState.NORMAL);
  }

  close(window: DesktopWindow): void {
    window.state.next(WindowState.CLOSED);


  }

  onWindowStateChanged(window: DesktopWindow): void {
    window.updateClass();

  }

  onWindowActiveChanged(window: DesktopWindow): void {
    window.updateClass();

  }

  open(window: DesktopWindow): void {
    window.state.next(WindowState.NORMAL);
    this.focus(window);

  }


  removeWindow(window: DesktopWindow): void {

  }

  moveUp(window: DesktopWindow): void {
    let index = this.desktop.orders.indexOf(window.id);
    this.desktop.orders.splice(index,1);
    this.desktop.orders.push(window.id);
    /* let openWindows = this.desktop.windows.filter(window => window.isOpen());
     let indices = openWindows.map(window => window.zIndex);
     let maxIndex = _.max(indices);
     if (window.zIndex !== maxIndex) window.zIndex = maxIndex + 1;*/
  }
}


