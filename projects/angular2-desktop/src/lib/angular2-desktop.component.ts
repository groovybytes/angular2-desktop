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
import {ShortCutComponent} from './bar/favourites/short-cut.component';
import {FavouritesComponent} from './bar/favourites/favourites.component';
import {BarComponent} from './bar/bar.component';


@Component({
  selector: 'a2d-desktop',
  templateUrl: './angular2-desktop.component.html',
  styleUrls: ['./angular2-desktop.component.scss']
})
export class Angular2DesktopComponent implements OnInit, OnDestroy, AfterContentInit {


  desktop: Desktop;
  dockPreviewPosition: DockPosition = DockPosition.LEFT;
  showDockPreview: boolean = false;
  @ViewChild('container') container: ElementRef;
  @ContentChildren(BarComponent) bars: QueryList<BarComponent>;

  private subscriptions: Array<Subscription> = [];

  @HostBinding('class')
  get clazz() {
    return this.componentClass;
  }

  private componentClass: string = '';


  constructor(@Inject('desktop') desktop: Desktop, private element: ElementRef) {
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
    return this.container.nativeElement.querySelector(query);
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  shortCutClicked(shortCut: ShortCut): void {
    let window = this.desktop.windows.find(window => window.id === shortCut.windowRef);
    window.state.next(WindowState.NORMAL);
  }

  ngAfterContentInit(): void {
    this.updateClazz();
  }

  private updateClazz(): void {
    this.componentClass = '';
    this.bars.forEach(bar => {
      if (bar.location === 'left') this.componentClass += ' contains-left-bar';
      else if (bar.location === 'top') this.componentClass += ' contains-top-bar';
    });
  }

}


