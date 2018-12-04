import {
  AfterContentInit, AfterViewInit,
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
export class Angular2DesktopComponent implements OnInit, OnDestroy, AfterContentInit, AfterViewInit {


  desktop: Desktop;
  dockPreviewPosition: DockPosition = DockPosition.LEFT;
  showDockPreview: boolean = false;
  topBarVisible: boolean = true;
  leftBarVisible: boolean = true;
  rightBarVisible: boolean = true;
  bottomBarVisible: boolean = true;

  @ViewChild('container') container: ElementRef;
  @ViewChild('topBar') topBar: ElementRef;
  @ViewChild('rightBar') rightBar: ElementRef;
  @ViewChild('leftBar') leftBar: ElementRef;
  @ViewChild('bottomBar') bottomBar: ElementRef;


  private subscriptions: Array<Subscription> = [];

  @HostBinding('class')
  get clazz() {
    let clazz = 'angular2-desktop';
    return clazz;
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
    return this.element.nativeElement.querySelector(query);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


  shortCutClicked(shortCut: ShortCut): void {
    let window = this.desktop.windows.find(window => window.id === shortCut.windowRef);
    window.state.next(WindowState.NORMAL);
  }

  ngAfterContentInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(()=>{

      this.topBarVisible = this.topBar.nativeElement.children.length > 1;
      this.leftBarVisible = this.leftBar.nativeElement.children.length > 1;
      this.rightBarVisible = this.rightBar.nativeElement.children.length > 1;
      this.bottomBarVisible = this.bottomBar.nativeElement.children.length > 1;
    });

  }


}


