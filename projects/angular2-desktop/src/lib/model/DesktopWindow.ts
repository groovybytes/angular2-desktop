import {WindowState} from './WindowState';
import {BehaviorSubject, Subscription} from 'rxjs';
import * as _ from 'lodash';
import {ShortCut} from './ShortCut';

export class DesktopWindow {

  title: string;
  clazz: string;
  id: string;
  zIndex: number = 1;
  //zIndexTmp: number = 1;
  state: BehaviorSubject<WindowState> = new BehaviorSubject(WindowState.NORMAL);
  active: BehaviorSubject<boolean> = new BehaviorSubject(false);
  //position: BehaviorSubject<WindowPosition> = new BehaviorSubject(WindowPosition.LEFT);
  x: number;
  y: number;
  width: number;
  height: number;
  shortCut:ShortCut;

  private subscriptions: Array<Subscription> = [];

  constructor(
    title: string,
    shortCut:ShortCut,
    x: number,
    y: number,
    width: number,
    height: number) {
    this.id = _.uniqueId('window_');
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.title = title;
    this.shortCut=shortCut;

    this.subscriptions.push(this.state.subscribe(() => this.updateClass()));
    this.subscriptions.push(this.active.subscribe(() => this.updateClass()));
  }


  private updateClass(): void {
    this.clazz = 'window';
    /*if (this.position.getValue() === WindowPosition.TOP) this.clazz += " window-top";
    else if (this.position.getValue() === WindowPosition.BOTTOM) this.clazz += " window-bottom";
    else if (this.position.getValue() === WindowPosition.LEFT) this.clazz += " window-left";
    else if (this.position.getValue() === WindowPosition.RIGHT) this.clazz += " window-right";
    else if (this.position.getValue() === WindowPosition.SIDEBAR_LEFT) this.clazz += " sidebar-left";
    else if (this.position.getValue() === WindowPosition.FIXED_TOP) this.clazz += " fixed-top";
    else if (this.position.getValue() === WindowPosition.FIXED_BOTTOM) this.clazz += " fixed-bottom";*/

    if (this.state.getValue() === WindowState.CLOSED) this.clazz += ' window-closed';
    else if (this.state.getValue() === WindowState.MAXIMIZED) this.clazz += ' window-maximized';
    else if (this.state.getValue() === WindowState.MINIMIZED) this.clazz += ' window-minimized';

    if (this.active.getValue()) this.clazz += ' active';

  }

  destroy(): void {
    this.subscriptions.forEach(subscr => subscr.unsubscribe());
  }

  isVisible(): boolean {
    return this.state.getValue() === WindowState.MAXIMIZED
      || this.state.getValue() === WindowState.NORMAL;
  }

}
