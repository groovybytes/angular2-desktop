import { Component, OnInit } from '@angular/core';
import {A2dClientService} from '../../../projects/angular2-desktop/src/lib/a2d-client.service';
import {DesktopApplication} from '../../../projects/angular2-desktop/src/lib/model/DesktopApplication';
import {TestapplicationComponent} from '../testapplication/testapplication.component';
import {WindowParams} from '../../../projects/angular2-desktop/src/lib/model/WindowParams';

@Component({
  selector: 'app-demo2',
  templateUrl: './demo2.component.html',
  styleUrls: ['./demo2.component.css']
})
export class Demo2Component implements OnInit {

  constructor(private desktopService: A2dClientService) { }

  ngOnInit() {
    let myGreatApp = new DesktopApplication();
    myGreatApp.component=TestapplicationComponent;
    myGreatApp.id = 'mygreatapp';
    myGreatApp.title = 'mygreatapp';
    myGreatApp.defaultWindowParams=new WindowParams(
      null,
      100,
      100,
      200,
      200,
      'mygreatapp'
    );
    this.desktopService.addApplication(myGreatApp);

    let myOtherApp = new DesktopApplication();
    myOtherApp.component=TestapplicationComponent;
    myOtherApp.id = 'myotherapp';
    myOtherApp.title = 'myotherapp';
    myOtherApp.defaultWindowParams=new WindowParams(
      null,
      400,
      100,
      200,
      200,
      'myotherapp'
    );

    this.desktopService.addApplication(myOtherApp);

    //now lets open the application from the beginning
    //we use settimeout here to ensure the democomponent is rendered before we add our app
    setTimeout(() => {
      this.desktopService.createApplication<TestapplicationComponent>('mygreatapp')
        .then(result=>{
          result.component.param1="i am window 1";
          this.desktopService.openApplication("mygreatapp");
        });
    });
  }

}
