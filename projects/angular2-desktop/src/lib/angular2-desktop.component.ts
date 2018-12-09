import {AfterContentInit, AfterViewInit, Component, ElementRef, HostBinding, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Desktop} from './model/Desktop';
import {DockPosition} from './model/DockPosition';
import {Subscription} from 'rxjs';
import {DynamicWindowAnchorDirective} from './dynamic-window-anchor.directive';


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
  @ViewChild(DynamicWindowAnchorDirective)
  windowAnchor: DynamicWindowAnchorDirective;
  //@ContentChildren(ApplicationComponent) applications: QueryList<ApplicationComponent>;


  private subscriptions: Array<Subscription> = [];

  @HostBinding('class')
  get clazz() {
    let clazz = 'angular2-desktop';
    return clazz;
  }



  constructor(
    @Inject('desktop') desktop: Desktop,
    private element: ElementRef) {
    this.desktop = desktop;
  }

  ngOnInit() {
    this.desktop.component = this;
    this.subscriptions.push(this.desktop.dockPreview.subscribe((position: DockPosition) => {
      this.showDockPreview = position != null;
      this.dockPreviewPosition = position;
    }));


  }


  getElement(query: string): Element {
    return this.element.nativeElement.querySelector(query);
  }


  ngAfterContentInit(): void {

  }

  ngAfterViewInit(): void {
    this.desktop.windowContainer=this.windowAnchor.viewContainer;
    setTimeout(() => {
      this.topBarVisible = this.topBar.nativeElement.children.length > 1;
      this.leftBarVisible = this.leftBar.nativeElement.children.length > 1;
      this.rightBarVisible = this.rightBar.nativeElement.children.length > 1;
      this.bottomBarVisible = this.bottomBar.nativeElement.children.length > 1;
    });

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}


