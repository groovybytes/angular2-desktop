import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DockPosition} from '../../../projects/angular2-desktop/src/lib/model/DockPosition';
import {WindowState} from '../../../projects/angular2-desktop/src/lib/model/WindowState';
import {A2dClientService} from '../../../projects/angular2-desktop/src/lib/a2d-client.service';
import {DesktopApplication} from '../../../projects/angular2-desktop/src/lib/model/DesktopApplication';
import {WindowParams} from '../../../projects/angular2-desktop/src/lib/model/WindowParams';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.scss']
})
export class Demo1Component implements OnInit, AfterViewInit {


  DockPosition = DockPosition;
  WindowState = WindowState;

  @ViewChild('myGreatApp') myGreatApp: TemplateRef<any>;
  @ViewChild('myGreatAppHeader') myGreatAppHeader: TemplateRef<any>;

  constructor(private desktopService: A2dClientService) {
  }

  ngOnInit() {
    setTimeout(() => {

      let params = new WindowParams(
        null,
        100,
        100,
        200,
        200,
        {msg: 'hello body world'},
        {msg: 'hello header world'}
      );


      this.desktopService.openApplication('mygreatapp', params);
    }, 1000);
  }

  shortCutClicked(id: string): void {
    alert('link with id ' + id + ' was clicked');
  }

  ngAfterViewInit(): void {
    let myGreatApp = new DesktopApplication();
    myGreatApp.bodyTemplate = this.myGreatApp;
    myGreatApp.headerTemplate = this.myGreatAppHeader;
    myGreatApp.id = 'mygreatapp';
    myGreatApp.title = 'mygreatapp';

    this.desktopService.addApplication(myGreatApp);
  }

}
