import {DockPosition} from './DockPosition';

export class WindowParams {

  dockPosition: DockPosition;
  x: number;
  y: number;
  width: number;
  height: number;
  bodyContext: any;
  headerContext: any;

  alwaysOnTop: boolean = false;
  showWindowBtns: boolean = true;
  showCloseBtnOnly: boolean = false;
  showDockingTools: boolean = true;
  showHeader: boolean = true;

  constructor(
    dockPosition: DockPosition,
    x: number,
    y: number,
    width: number,
    height: number,
    bodyContext: any,
    headerContext: any,
    showHeader?: boolean,
    alwaysOnTop?: boolean,
    showWindowBtns?: boolean,
    showCloseBtnOnly?: boolean,
    showDockingTools?: boolean) {

    this.dockPosition = dockPosition;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.bodyContext=bodyContext;
    this.headerContext=headerContext;
    this.alwaysOnTop = alwaysOnTop;
    this.showWindowBtns = showWindowBtns;
    this.showCloseBtnOnly = showCloseBtnOnly;
    this.showDockingTools = showDockingTools;
    this.showHeader = showHeader;
  }
}
