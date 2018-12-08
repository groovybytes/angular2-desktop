import { Component, OnInit } from '@angular/core';
import {DockPosition} from '../../../projects/angular2-desktop/src/lib/model/DockPosition';
import {WindowState} from '../../../projects/angular2-desktop/src/lib/model/WindowState';
import {A2dClientService} from '../../../projects/angular2-desktop/src/lib/a2d-client.service';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.scss']
})
export class Demo1Component implements OnInit {


  DockPosition=DockPosition;
  WindowState=WindowState;

  constructor(private desktopService:A2dClientService) { }

  ngOnInit() {
    setTimeout(()=>{
      this.desktopService.openApplication("testapp");
    },1000);
  }

  shortCutClicked(id:string):void{
    alert("link with id "+id+" was clicked");
  }

}
