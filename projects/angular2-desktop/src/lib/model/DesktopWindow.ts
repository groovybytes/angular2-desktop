import {WindowState} from './WindowState';
import {BehaviorSubject} from 'rxjs';
import {ShortCut} from './ShortCut';
import {DockPosition} from './DockPosition';

export class DesktopWindow {

  private readonly animationTimeout = 500;
  appId: string;
  title: string;
  clazz: string;
  animatedY: string;
  animatedX: string;
  id: string;
  state: BehaviorSubject<WindowState>;
  dockPosition: BehaviorSubject<DockPosition>;
  x: number;
  y: number;
  width: number;
  height: number;
  shortCut: ShortCut;
  alwaysOnTop: boolean;
  showDockingTools: boolean;
  hide: boolean = false;
  linkId:string;
  showHeader: boolean = true;
  showWindowBtns: boolean = true;
  showCloseBtnOnly: boolean = false;

  constructor(
    id: string,
    appId: string,
    title: string,
    state: WindowState,
    dockPosition: DockPosition,
    x: number,
    y: number,
    width: number,
    height: number) {
    this.id = id;
    this.appId = appId;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.title = title;
    this.state = new BehaviorSubject(state);
    this.dockPosition = new BehaviorSubject(dockPosition);
  }

  updateClass(): void {
    this.clazz = 'window';
    /*if (this.position.getValue() === WindowPosition.TOP) this.clazz += " window-top";
    else if (this.position.getValue() === WindowPosition.BOTTOM) this.clazz += " window-bottom";
    else if (this.position.getValue() === WindowPosition.LEFT) this.clazz += " window-left";
    else if (this.position.getValue() === WindowPosition.RIGHT) this.clazz += " window-right";
    else if (this.position.getValue() === WindowPosition.SIDEBAR_LEFT) this.clazz += " sidebar-left";
    else if (this.position.getValue() === WindowPosition.FIXED_TOP) this.clazz += " fixed-top";
    else if (this.position.getValue() === WindowPosition.FIXED_BOTTOM) this.clazz += " fixed-bottom";*/

    if (this.state.getValue() === WindowState.MAXIMIZED) this.clazz += ' window-maximized';
    else if (this.state.getValue() === WindowState.MINIMIZED) this.clazz += ' window-minimized';
    else if (this.state.getValue() === WindowState.DOCKED) {
      this.clazz += ' window-docked';
      if (this.dockPosition.getValue() === DockPosition.TOP) this.clazz += ' docked-top';
      else if (this.dockPosition.getValue() === DockPosition.BOTTOM) this.clazz += ' docked-bottom';
      else if (this.dockPosition.getValue() === DockPosition.TOP_LEFT) this.clazz += ' docked-top-left';
      else if (this.dockPosition.getValue() === DockPosition.TOP_RIGHT) this.clazz += ' docked-top-right';
      else if (this.dockPosition.getValue() === DockPosition.BOTTOM_LEFT) this.clazz += ' docked-bottom-left';
      else if (this.dockPosition.getValue() === DockPosition.BOTTOM_RIGHT) this.clazz += ' docked-bottom-right';
      else if (this.dockPosition.getValue() === DockPosition.LEFT) this.clazz += ' docked-left';
      else if (this.dockPosition.getValue() === DockPosition.RIGHT) this.clazz += ' docked-right';

    }

    /*if (this.active.getValue()) this.clazz += ' active';*/

  }

  isVisible(): boolean {
    return !this.hide && this.state.getValue() !== WindowState.CLOSING && this.state.getValue() !== WindowState.MINIMIZED;
  }


  isOpen(): boolean {
    return this.state.getValue() !== WindowState.CLOSING;
  }

  minimize(): void {

    this.clazz += ' animation minimize';
    setTimeout(() => {
      this.state.next(WindowState.MINIMIZED);
    }, this.animationTimeout);
  }

  close(): void {

    this.clazz += ' animation close';

    setTimeout(() => {
      this.state.next(WindowState.CLOSING);
    }, this.animationTimeout);
  }

  normalize(): void {
    this.state.next(WindowState.NORMAL);
    this.clazz += ' animation normalize';
    this.hide = false;

    setTimeout(() => {
      this.updateClass();
    }, this.animationTimeout);
  }

  maximize(): void {
    this.clazz += ' animation maximize';
    setTimeout(() => this.state.next(WindowState.MAXIMIZED), this.animationTimeout);
  }

}
