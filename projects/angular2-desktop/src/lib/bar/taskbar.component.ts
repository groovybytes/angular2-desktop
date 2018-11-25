import {Component, HostBinding, Inject, Input, OnInit} from '@angular/core';
import {WindowState} from '../model/WindowState';
import {Angular2DesktopService} from '../angular2-desktop.service';
import {DesktopWindow} from '../model/DesktopWindow';
import {Desktop} from '../model/Desktop';

@Component({
  selector: 'gb-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.scss']
})
export class TaskBarComponent implements OnInit {

  @Input() location: string = 'bottom';

  @HostBinding('attr.class')
  get clazz() {
    return 'bar bar-' + this.location;
  }

  constructor(@Inject("desktop") private desktop:Desktop,private desktopService: Angular2DesktopService) {

  }

  ngOnInit() {


  }

  getOpenWindows(): Array<DesktopWindow> {
    return this.desktop.windows.filter(window=>window.state.getValue()!==WindowState.CLOSED);
  }

  onEntryClicked(window: DesktopWindow): void {
    this.desktopService.focus(window);
    window.state.next(WindowState.NORMAL);
  }


}
