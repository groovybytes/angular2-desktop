import {Component, OnInit} from '@angular/core';
import {WindowState} from '../../projects/angular2-desktop/src/lib/model/WindowState';
import {DockPosition} from '../../projects/angular2-desktop/src/lib/model/DockPosition';

declare var chance;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';



  constructor() {


  }


  ngOnInit(): void {


    /*this.desktop.apps = [];
    this.desktop.apps.push(this.desktopFactory.createApp('app1', true, 'app1'));
    this.desktop.apps.push(this.desktopFactory.createApp('app2', true, 'app2'));
    this.desktop.apps.push(this.desktopFactory.createApp('settings/app3', true, 'app3'));

    this.windows.push(this.createRandomWindow('app1'));

    window.shortCut = new ShortCutSpecs();
    window.shortCut.color = chance.color();
    window.shortCut.icon = '';
    window.shortCut.fontColor = 'white';
    window.shortCut.title = window.title;*/


  }

}
