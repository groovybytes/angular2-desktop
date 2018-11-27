import {AfterContentInit, Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ShortCut} from './model/ShortCut';
import {Desktop} from './model/Desktop';
import {WindowState} from './model/WindowState';
import {DockPosition} from './model/DockPosition';


@Component({
  selector: 'gb-angular2-desktop',
  templateUrl: './angular2-desktop.component.html',
  styleUrls: ['./angular2-desktop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Angular2DesktopComponent implements OnInit, AfterContentInit, OnDestroy {


  //@ContentChildren(WindowComponent) windows: QueryList<WindowComponent>;

  desktop: Desktop;
  dockPreviewPosition:DockPosition=DockPosition.LEFT;

 /* @HostBinding('style.height')
  get getStyle(): string {
    console.log((100 - this.desktop.configuration.taskBarSize) + '%');
    return (100-this.desktop.configuration.taskBarSize)+"%";

  }/!*  @HostBinding('style.height')
  get getStyle(): SafeStyle {
    let height = this.desktop.configuration.taskBarSize + 'px';
    return this.sanitizer.bypassSecurityTrustStyle('height:' + height+";width:100vw");

  }*!/*/

  constructor(@Inject('desktop') desktop: Desktop) {
    this.desktop=desktop;
  }

  ngOnInit() {

  }

  ngAfterContentInit(): void {


  }

  ngOnDestroy(): void {

  }

  shortCutClicked(shortCut: ShortCut): void {
    let window =  this.desktop.windows.find(window => window.id === shortCut.windowRef);
    window.state.next(WindowState.NORMAL);
  }

}


