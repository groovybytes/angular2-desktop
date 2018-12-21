import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {DockPosition} from '../model/DockPosition';
import {WindowFactoryService} from '../window-factory.service';
import {Desktop} from '../model/Desktop';
import {DesktopApplication} from '../model/DesktopApplication';
import {WindowParams} from '../model/WindowParams';

@Component({
  selector: 'a2d-desktop-application',
  template: ''
})
export class DesktopApplicationComponent implements OnInit {

  @Input() component: any;
  @Input() id: string;
  @Input() title: string;
  @Input() dockPosition: DockPosition;
  @Input() singleInstanceMode: boolean;
  @Input() open: boolean;
  @Input() x: number;
  @Input() y: number;
  @Input() width: number;
  @Input() height: number;
  @Output() initialize:EventEmitter<any>=new EventEmitter();


  constructor(private windowFactory: WindowFactoryService,
              @Inject('desktop') private desktop: Desktop) {
  }

  ngOnInit() {
    this.desktop.wait().subscribe(()=>{
      let app = new DesktopApplication();
      app.component = this.component;
      app.id = this.id;
      app.title = this.title;
      app.singleInstanceMode = this.singleInstanceMode;
      app.defaultWindowParams = new WindowParams(
        this.dockPosition,
        this.x,
        this.y,
        this.width,
        this.height,
        this.title
      );

      this.desktop.applications.push(app);

      if (this.open){
        this.windowFactory.createWindow(
          this.id,
          (component)=>this.initialize.emit(component)
          ,this.title,app.defaultWindowParams)
          .then(result=>{
            this.windowFactory.openWindow(result.windowId,this.dockPosition!=null);
          })
          .catch(error=>console.error(error));
      }
    });

  }

}
