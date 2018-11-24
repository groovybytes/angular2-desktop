import {Injectable} from '@angular/core';
import {DesktopWindow} from './model/DesktopWindow';
import {WindowState} from './model/WindowState';

@Injectable()
export class Angular2DesktopService {

  windows: Array<DesktopWindow> = [];

  constructor() {

  }


  validate(): void {
    console.log(this.windows.length);
    if (this.windows.length > 0) {
      let activeWindows = this.windows.filter(window => window.active.getValue());
      if (activeWindows.length === 0) this.focus(this.windows[0]);
    }

  }

  focus(window: DesktopWindow): void {
    window.active.next(true);
    this.windows
      .filter(_window => _window.id !== window.id)
      .forEach(window => window.active.next(false));
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

  addWindow(window: DesktopWindow): void {
    this.windows.push(window);
  }
}


