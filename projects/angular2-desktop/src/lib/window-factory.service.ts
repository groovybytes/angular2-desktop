import {ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector} from '@angular/core';
import {WindowState} from './model/WindowState';
import {Desktop} from './model/Desktop';
import {DesktopApplication} from './model/DesktopApplication';
import {WindowParams} from './model/WindowParams';
import * as _ from 'lodash';
import {WindowComponent} from './window/window.component';


@Injectable()
export class WindowFactoryService {


  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject('desktop') private desktop: Desktop) {
    this.desktop = desktop;

  }


  addApplication(app: DesktopApplication<any>): void {
    this.desktop.applications.push(app);
  }

  createWindow<T>(
    appId: string,
    callback: (component: T,windowId:string) => void,
    params?: WindowParams): Promise<{ windowId: string, component: T }> {

    return new Promise((resolve, reject) => {
      let app = this.desktop.applications.find(app => app.id === appId);
      if (app) {
        let windowComponent = this.instantiateWindow(appId, params ? params : app.defaultWindowParams);
        //let the window render first
        setTimeout(() => {
          let appComponent: ComponentRef<T> = this.instantiateApp<ComponentRef<T>>(app.component, windowComponent);
          //app.initialize.emit(appComponent.instance);
          if (callback) callback(appComponent.instance,windowComponent.instance.id);
          appComponent.hostView.detectChanges();
          resolve({
            windowId: windowComponent.instance.id,
            component: appComponent.instance
          });
        });


      } else reject('app with id ' + appId + ' not found');
    });
  }

  openWindow(id: string): void {
    this.desktop.getWindow(id).normalize();
  }

  onShortCutTriggered(appId: string, callback?: (component: any,windowId:string) => void): Promise<void> {

    return new Promise((resolve,reject)=>{
      let app = this.desktop.applications.find(app => app.id === appId);
      if (app) {
        let windows = this.desktop.getWindowsForApp(appId);
        if (windows.length > 0 && app.singleInstanceMode) {
          windows[0].normalize();
          resolve();
        }
        else {
          this.createWindow(appId, callback, app.defaultWindowParams).then(result => {
            this.openWindow(result.windowId);
            resolve();
          })
            .catch(error => console.warn(error));
        }

      }
    });

  }

  private instantiateApp<T>(componentType, windowComponent): T {
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
    } else componentRef.instance.state = WindowState.MINIMIZED;
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


