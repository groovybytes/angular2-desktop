import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {DesktopWindow} from '../model/DesktopWindow';
import {WindowState} from '../model/WindowState';
import {Desktop} from '../model/Desktop';


@Component({
  selector: 'gb-window-header',
  templateUrl: './window-header.component.html',
  styleUrls: ['./window-header.component.scss']
})
export class WindowHeaderComponent implements OnInit {

  @Input() window: DesktopWindow;
  @Output() dockBtnClicked:EventEmitter<void>=new EventEmitter();

  state = WindowState;

  dockBtnActive:boolean=false;


  constructor( @Inject('desktop') private desktop: Desktop) {

  }

  minimize(): void {

    let targetEntryLeft = this.desktop.taskBar.getTaskBarEntryLeft(this.window.id);
    let desktopHeight=this.desktop.component.getHeight();
    this.window.minimize(targetEntryLeft,desktopHeight);

  }
  restore(): void {
    this.window.state.next(WindowState.NORMAL);
  }

  maximize(): void {
    this.window.maximize();
  }

  close(): void {
    this.window.close();
  }

  onDockBtnClicked():void{
    this.dockBtnActive=!this.dockBtnActive;
    this.dockBtnClicked.emit();

  }
  unDock():void{
    this.window.state.next(WindowState.NORMAL);

  }


  ngOnInit() {
  }

}
