import {Injectable} from '@angular/core';
import {DesktopWindow} from './model/DesktopWindow';
import {WindowState} from './model/WindowState';
import {WindowSpecs} from './model/specs/WindowSpecs';
import {SerializationService} from './serialization.service';

@Injectable()
export class Angular2DesktopService {

  windows: Array<DesktopWindow> = [];
  private orders: Array<string> = [];

  constructor(private serializer: SerializationService) {

  }


  validate(): void {
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

    this.moveUp(window);
  }

  getWindow(id: string): DesktopWindow {
    return this.windows.find(window => window.id === id);
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

  getClosedWindows(): Array<DesktopWindow> {
    return this.windows
      .filter(window => window.state.getValue() === WindowState.CLOSED)
      .map(window => window);
  }

  open(window: DesktopWindow): void {
    window.state.next(WindowState.NORMAL);
    this.focus(window);

  }

  registerWindow(specs: WindowSpecs): DesktopWindow {

    let window = this.serializer.deSerializeWindow(specs);
    //this.indices.add(window.id);
    this.windows.push(window);

    return window;
  }

  removeWindow(window: DesktopWindow): void {

  }

  moveUp(window: DesktopWindow): void {
    /* let openWindows = this.windows.filter(window => window.isOpen());
     let indices = openWindows.map(window => window.zIndex);
     let maxIndex = _.max(indices);
     if (window.zIndex !== maxIndex) window.zIndex = maxIndex + 1;*/
  }
}


