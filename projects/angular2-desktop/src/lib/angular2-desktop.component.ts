import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ContentChildren,
  ElementRef,
  HostBinding,
  Inject,
  Injector,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild
} from '@angular/core';
import {Desktop} from './model/Desktop';
import {DockPosition} from './model/DockPosition';
import {Subscription} from 'rxjs';
import {Angular2DesktopService} from './angular2-desktop.service';
import {ApplicationComponent} from './application/application.component';
import {AppFactoryService} from './app-factory.service';


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
  @ContentChildren(ApplicationComponent) applications: QueryList<ApplicationComponent>;


  private subscriptions: Array<Subscription> = [];

  @HostBinding('class')
  get clazz() {
    let clazz = 'angular2-desktop';
    return clazz;
  }

  private componentClass: string = '';


  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject('desktop') desktop: Desktop,
    private appFactory:AppFactoryService,
    private element: ElementRef) {
    this.desktop = desktop;
  }

  ngOnInit() {
    this.desktop.component = this;
    this.subscriptions.push(this.desktop.dockPreview.subscribe((position: DockPosition) => {
      this.showDockPreview = position != null;
      this.dockPreviewPosition = position;
    }));
    this.subscriptions.push(this.desktop.createApp.subscribe((id: string) =>
      this.appFactory.createApp(id,this.container,this.applications.toArray(),this.injector,this.resolver)));


  }


  getElement(query: string): Element {
    return this.element.nativeElement.querySelector(query);
  }


  ngAfterContentInit(): void {


  }

  ngAfterViewInit(): void {
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


