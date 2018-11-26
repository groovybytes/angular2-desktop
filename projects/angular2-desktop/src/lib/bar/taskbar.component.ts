import {Component, HostBinding, Inject, Input, OnInit} from '@angular/core';
import {WindowState} from '../model/WindowState';
import {Angular2DesktopService} from '../angular2-desktop.service';
import {DesktopWindow} from '../model/DesktopWindow';
import {Desktop} from '../model/Desktop';
import {DomSanitizer} from '@angular/platform-browser';
import {DockPosition} from '../model/DockPosition';

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


  /*@HostBinding('style')
  get getStyle(): SafeStyle {
    let height = this.desktop.configuration.taskBarSize + 'px';
    return this.sanitizer.bypassSecurityTrustStyle('height:' + height+";width:100vw");

  }*/


  /*[ngStyle]="{'height':desktop.configuration.taskBarSize+'px'}"*/

  desktop: Desktop;
  DockPosition=DockPosition;

  constructor(@Inject('desktop') desktop: Desktop,
              private sanitizer: DomSanitizer,
              private desktopService: Angular2DesktopService) {
    this.desktop = desktop;

  }

  ngOnInit() {


  }

  dock(position:DockPosition):void{
    this.desktop.getTopWindow().dockPosition.next(position);
    this.desktop.getTopWindow().state.next(WindowState.DOCKED);

  }
  hasFocus(id: string): boolean {
    return this.desktopService.hasFocus(id);
  }

  getOpenWindows(): Array<DesktopWindow> {
    return this.desktop.windows.filter(window => window.state.getValue() !== WindowState.CLOSED);
  }

  onEntryClicked(window: DesktopWindow): void {
    window.state.next(WindowState.NORMAL);

  }


}
