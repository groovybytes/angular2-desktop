import {Inject, Injectable} from '@angular/core';
import {Desktop} from './model/Desktop';
import {DesktopApplication} from './model/DesktopApplication';
import {WindowParams} from './model/WindowParams';
import {Angular2DesktopService} from './angular2-desktop.service';
import {WindowFactoryService} from './window-factory.service';

@Injectable({
  providedIn: 'root'
})
export class A2dClientService {

  constructor(
    private windowFactory:WindowFactoryService,
    @Inject('desktop') private desktop: Desktop) {
  }


  getApplication<T>(id:string):DesktopApplication<T>{
    return this.desktop.applications.find(app=>app.id===id);
  }

  addApplication<T>(app: DesktopApplication<T>): void {
    this.desktop.applications.push(app);
  }

  createWindow<T>(
    appId: string,
    callback:(component:T)=>void,
    params?: WindowParams): Promise<string> {

    return new Promise((resolve,reject)=>{
      this.windowFactory.createWindow(appId,callback,params)
        .then(result=>resolve(result.windowId))
        .catch(error=>reject(error));
    });

  }

  openWindow(id: string): void {
    return this.windowFactory.openWindow(id);
  }


}
