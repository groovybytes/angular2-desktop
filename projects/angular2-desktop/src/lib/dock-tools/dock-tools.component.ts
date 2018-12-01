import {Component, Inject, OnInit} from '@angular/core';
import {DockPosition} from '../model/DockPosition';
import {WindowState} from '../model/WindowState';
import {Desktop} from '../model/Desktop';

@Component({
  selector: 'a2d-dock-tools',
  templateUrl: './dock-tools.component.html',
  styleUrls: ['./dock-tools.component.scss']
})
export class DockToolsComponent implements OnInit {


  DockPosition=DockPosition;

  constructor(@Inject('desktop') private desktop: Desktop) { }

  ngOnInit() {
  }

  dock(position:DockPosition):void{
    this.desktop.getTopWindow().dockPosition.next(position);
    this.desktop.getTopWindow().state.next(WindowState.DOCKED);
    this.desktop.dockPreview.next(null);
  }

  mouseOver(position:DockPosition):void{
    this.desktop.dockPreview.next(position);
  }

  mouseleave():void{
    this.desktop.dockPreview.next(null);
  }

}
