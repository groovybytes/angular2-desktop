import {
  AfterContentInit,
  Component, ContentChild, ContentChildren,
  ElementRef, HostBinding,
  Inject, Input,
  OnDestroy,
  OnInit,
  QueryList, ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {ShortCut} from './model/ShortCut';
import {Desktop} from './model/Desktop';
import {WindowState} from './model/WindowState';
import {DockPosition} from './model/DockPosition';
import {Subscription} from 'rxjs';
import {DesktopWindow} from './model/DesktopWindow';
import {Angular2DesktopService} from './angular2-desktop.service';


@Component({
  selector: 'a2d-desktop',
  templateUrl: './angular2-desktop.component.html',
  styleUrls: ['./angular2-desktop.component.scss']

})
export class Angular2DesktopComponent implements OnInit, OnDestroy {

  @Input() showTopBar: boolean = true;
  @Input() showLeftBar: boolean = true;

  desktop: Desktop;
  dockPreviewPosition: DockPosition = DockPosition.LEFT;
  showDockPreview: boolean = false;
  @ViewChild('container') container: ElementRef;

  private subscriptions: Array<Subscription> = [];

  @HostBinding('class')
  get clazz() {
    let clazz='angular2-desktop';
    if (this.showLeftBar===false) clazz+=" no-left-bar";
    if (this.showTopBar===false) clazz+=" no-top-bar";
    return clazz;
  }

  private componentClass: string = '';


  constructor(@Inject('desktop') desktop: Desktop, private element: ElementRef, private desktopService: Angular2DesktopService) {
    this.desktop = desktop;
  }

  ngOnInit() {
    this.desktop.component = this;
    this.subscriptions.push(this.desktop.dockPreview.subscribe((position: DockPosition) => {
      this.showDockPreview = position != null;
      this.dockPreviewPosition = position;
    }));

  }

  getHeight(): number {

    return this.container.nativeElement.getBoundingClientRect().height;
  }

  getElement(query: string): Element {
    return this.element.nativeElement.querySelector(query);
  }

  hasFocus(id: string): boolean {
    return this.desktopService.hasFocus(id);
  }

  getVisibleWindows(): Array<DesktopWindow> {
    return this.desktop.windows.filter(window =>
      window.state.getValue() === WindowState.NORMAL ||
      window.state.getValue() === WindowState.MAXIMIZED ||
      window.state.getValue() === WindowState.DOCKED);
  }

  onTaskBarEntryClicked(window: DesktopWindow): void {
    this.desktopService.onTaskBarClick(window);

  }

  viewDesktop(): void {
    this.desktopService.toggleDesktop();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  shortCutClicked(shortCut: ShortCut): void {
    let window = this.desktop.windows.find(window => window.id === shortCut.windowRef);
    window.state.next(WindowState.NORMAL);
  }


}


