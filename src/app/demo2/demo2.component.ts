import {Component, OnInit} from '@angular/core';
import {A2dClientService} from '../../../projects/angular2-desktop/src/lib/a2d-client.service';
import {DesktopApplication} from '../../../projects/angular2-desktop/src/lib/model/DesktopApplication';
import {TestapplicationComponent} from '../testapplication/testapplication.component';
import {WindowParams} from '../../../projects/angular2-desktop/src/lib/model/WindowParams';
import {DockPosition} from '../../../projects/angular2-desktop/src/lib/model/DockPosition';

@Component({
  selector: 'app-demo2',
  templateUrl: './demo2.component.html',
  styleUrls: ['./demo2.component.css']
})
export class Demo2Component implements OnInit {


  TestapplicationComponent=TestapplicationComponent;

  constructor(private desktopService: A2dClientService) {
  }

  ngOnInit() {
    let myGreatApp = new DesktopApplication();
    myGreatApp.component = TestapplicationComponent;
    myGreatApp.id = 'mygreatapp';
    myGreatApp.title = 'mygreatapp';
    myGreatApp.defaultWindowParams = new WindowParams(
      DockPosition.BOTTOM,
      100,
      100,
      200,
      200,
      'mygreatapp'
    );

    this.desktopService.addApplication(myGreatApp);

    let justAnotherApp = new DesktopApplication();
    justAnotherApp.component = TestapplicationComponent;
    justAnotherApp.id = 'justAnotherApp';
    justAnotherApp.title = 'justAnotherApp';
    justAnotherApp.singleInstanceMode=false;
    justAnotherApp.defaultWindowParams = new WindowParams(
      null,
      100,
      100,
      200,
      200,
      'justAnotherApp'
    );

    this.desktopService.addApplication(justAnotherApp);

    let myOtherApp = new DesktopApplication();
    myOtherApp.component = TestapplicationComponent;
    myOtherApp.id = 'myotherapp';
    myOtherApp.title = 'myotherapp';
    myOtherApp.singleInstanceMode=false;
    myOtherApp.defaultWindowParams = new WindowParams(
      null,
      400,
      100,
      200,
      200,
      'myotherapp'
    );


    this.desktopService.addApplication(myOtherApp);

    this.desktopService
      .createWindow<TestapplicationComponent>('mygreatapp',(component: TestapplicationComponent)=>{
        return new Promise<void>((resolve => {
          component.param1 = '2';
        }));

      },true)
      .then(windowId => {

      });

  }

  initialize(component:TestapplicationComponent):Promise<void>{
    return new Promise<void>(((resolve, reject) => {
      component.param1="initialized with 'a2d-desktop-application'";
      resolve();
    }));


  }

  initializeComponent(event:{component:TestapplicationComponent,windowId:string}):Promise<void>{
    return new Promise<void>(((resolve, reject) => {
      event.component.param1="initialized by directive";
      resolve();
    }));

  }




}
