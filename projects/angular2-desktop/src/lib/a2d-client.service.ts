import {ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector, Input, TemplateRef} from '@angular/core';
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



  addApplication(app: DesktopApplication<any>): void {
    this.desktop.applications.push(app);
  }

  createApplication<T>(appId: string, params?: WindowParams): Promise<{windowId:string,component:T}> {
    return new Promise((resolve,reject)=>{
      let app = this.desktop.applications.find(app => app.id === appId);
      if (app) {
        let openWindows = this.desktop.getOpenWindowsForApp(app.id);
        if (openWindows.length>0){
          reject("app already open");
        }
        else{
          let windowComponent = this.instantiateWindow(appId, params?params:app.defaultWindowParams);
          //let the window render first
          setTimeout(()=>{
            let appComponent:ComponentRef<T> = this.instantiateApp<ComponentRef<T>>(app.component, windowComponent);
            resolve({
              windowId:windowComponent.instance.id,
              component:appComponent.instance
            });
          });
        }

      }
      else reject('app with id ' + appId + ' not found');
    });
  }

  openApplication<T>(appId:string):Promise<void>{
    return new Promise((resolve,reject)=>{
      let app = this.desktop.applications.find(app=>app.id===appId);
      if (app){
        let openWindows = this.desktop.getOpenWindowsForApp(appId);
        if (openWindows.length===1) {
          openWindows[0].normalize();
          resolve();
        }
        else {
          this.createApplication<T>(app.id)
            .then(result=>{
              let window = this.desktop.windows.find(window => window.id === result.windowId);
              if (window) {
                window.normalize();
              }
              resolve();
            })
            .catch(error=>reject(error));
        }
      }
      else reject("app not found");
    });

  }



  private instantiateApp<T>(componentType, windowComponent):T {
    const factory = this.resolver.resolveComponentFactory(componentType);
    const componentRef = windowComponent.instance.appAnchor.viewContainer.createComponent(factory);
    return componentRef;
  }

  private instantiateWindow(appId: string, params: WindowParams) {
    const factory = this.resolver.resolveComponentFactory(WindowComponent);
    const componentRef = this.desktop.windowContainer.createComponent(factory);
    componentRef.instance.width = params.width;
    componentRef.instance.height = params.height;
    componentRef.instance.x = params.x;
    componentRef.instance.y = params.y;
    componentRef.instance.id = _.uniqueId('window_');
    componentRef.instance.appId = appId;
    componentRef.instance.title = params.title;
    //componentRef.instance.appComponentClass=componentClass;
    if (params.dockPosition) {
      componentRef.instance.state = WindowState.DOCKED;
      componentRef.instance.dockPosition = params.dockPosition;
    }
    else componentRef.instance.state = WindowState.CLOSED;
    if (params.alwaysOnTop != null) componentRef.instance.alwaysOnTop = params.alwaysOnTop;
    if (params.showWindowBtns != null) componentRef.instance.showWindowBtns = params.showWindowBtns;
    if (params.showCloseBtnOnly != null) componentRef.instance.showCloseBtnOnly = params.showCloseBtnOnly;
    if (params.showDockingTools != null) componentRef.instance.showDockingTools = params.showDockingTools;
    if (params.showHeader != null) componentRef.instance.showHeader = params.showHeader;
    if (params.alwaysOnTop != null) componentRef.instance.alwaysOnTop = params.alwaysOnTop;

    componentRef.hostView.detectChanges();

    return componentRef;
  }

}
