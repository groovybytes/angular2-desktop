import {ComponentFactoryResolver, ElementRef, Injectable, Injector, TemplateRef} from '@angular/core';
import {ApplicationComponent} from './application/application.component';
import {WindowComponent} from './window/window.component';
import {Angular2DesktopService} from './angular2-desktop.service';
import {WindowState} from './model/WindowState';
import {DockPosition} from './model/DockPosition';

@Injectable({
  providedIn: 'root'
})
export class AppFactoryService {

  constructor(private desktopService:Angular2DesktopService) { }

  createApp(id: string,container:ElementRef,apps:Array<ApplicationComponent>,injector:Injector,resolver:ComponentFactoryResolver): void {

    let appComponent = apps.find(app => app.id === id);
    const factory = resolver.resolveComponentFactory(WindowComponent);
    const componentRef = factory.create(injector);
    componentRef.instance.width = 400;
    componentRef.instance.height = 400;
    componentRef.instance.x = 50;
    componentRef.instance.y = 200;
    componentRef.instance.id="aaaaa";
    componentRef.instance.title="a";
    componentRef.instance.state=WindowState.NORMAL;
    componentRef.instance.dockPosition=DockPosition.BOTTOM;

    componentRef.instance.bodyTemplate=appComponent.bodyTemplate;
    componentRef.hostView.detectChanges();
    const {nativeElement} = componentRef.location;

   /* this.desktopService.createWindow(
      id,
      "abc",
      WindowState.NORMAL,
      DockPosition.BOTTOM,
      false,
      true,
      200,
      200,
      400,
      400);*/


    container.nativeElement.appendChild(nativeElement);
  }

}
