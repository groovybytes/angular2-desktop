import {ComponentFactoryResolver, Inject, Injectable, Injector, Input, TemplateRef} from '@angular/core';
import {Desktop} from './model/Desktop';
import {DesktopApplication} from './model/DesktopApplication';
import {WindowComponent} from './window/window.component';
import {WindowState} from './model/WindowState';
import * as _ from 'lodash';
import {WindowParams} from './model/WindowParams';

@Injectable({
  providedIn: 'root'
})
export class A2dClientService {

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject('desktop') private desktop: Desktop) {
  }

  addApplication(app: DesktopApplication): void {
    this.desktop.applications.push(app);
  }

  createWindow(appId: string,params:WindowParams): string {

    let app = this.desktop.applications.find(app => app.id === appId);
    if (app){
      const factory = this.resolver.resolveComponentFactory(WindowComponent);
      const componentRef = this.desktop.windowContainer.createComponent(factory);
      componentRef.instance.width = params.width;
      componentRef.instance.height = params.height;
      componentRef.instance.x = params.x;
      componentRef.instance.y = params.y;
      componentRef.instance.id = _.uniqueId("window_");
      componentRef.instance.appId = appId;
      componentRef.instance.title = app.title;
      if (params.dockPosition){
        componentRef.instance.state = WindowState.DOCKED;
        componentRef.instance.dockPosition = params.dockPosition;
      }
      else componentRef.instance.state = WindowState.CLOSED;

      componentRef.instance.bodyTemplate = app.bodyTemplate;
      componentRef.instance.headerTemplate = app.headerTemplate;
      if (params.alwaysOnTop != null) componentRef.instance.alwaysOnTop = params.alwaysOnTop;
      if (params.showWindowBtns != null) componentRef.instance.showWindowBtns = params.showWindowBtns;
      if (params.showCloseBtnOnly != null) componentRef.instance.showCloseBtnOnly = params.showCloseBtnOnly;
      if (params.showDockingTools != null) componentRef.instance.showDockingTools = params.showDockingTools;
      if (params.showHeader != null) componentRef.instance.showHeader = params.showHeader;
      if (params.alwaysOnTop != null) componentRef.instance.alwaysOnTop = params.alwaysOnTop;


      componentRef.instance.bodyTemplateContext={
        $implicit: null,
        data: params.bodyContext
      };
      componentRef.instance.headerTemplateContext={
        $implicit: null,
        data: params.headerContext
      };
      componentRef.hostView.detectChanges();
      return componentRef.instance.id;
    }
    else console.warn("app with id "+appId+" not found");

  }

  openWindow(id:string):void{
    let window = this.desktop.windows.find(window=>window.id===id);
    if (window){
      window.normalize();
    }
  }

}
