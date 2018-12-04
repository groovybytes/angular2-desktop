import {Component, Inject, Input, OnInit} from '@angular/core';
import {DesktopWindow} from '../model/DesktopWindow';
import {WindowState} from '../model/WindowState';
import {Desktop} from '../model/Desktop';
import {Angular2DesktopService} from '../angular2-desktop.service';

@Component({
  selector: 'a2d-task-bar',
  templateUrl: './task-bar.component.html',
  styleUrls: ['./task-bar.component.scss']
})
export class TaskBarComponent implements OnInit {


  constructor(@Inject('desktop') private desktop: Desktop,private desktopService: Angular2DesktopService) { }

  ngOnInit() {
  }

  getVisibleWindows(): Array<DesktopWindow> {
    return this.desktop.windows.filter(window =>
      window.state.getValue() === WindowState.NORMAL ||
      window.state.getValue() === WindowState.MAXIMIZED ||
      window.state.getValue() === WindowState.DOCKED);
  }

  onTaskBarEntryClicked(window: DesktopWindow): void {
    this.desktopService.onTaskBarClick(window);

  }

  viewDesktop(): void {
    this.desktopService.toggleDesktop();
  }

  hasFocus(id: string): boolean {
    return this.desktopService.hasFocus(id);
  }


}
