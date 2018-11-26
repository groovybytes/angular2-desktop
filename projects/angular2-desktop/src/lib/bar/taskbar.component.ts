import {Component, HostBinding, Inject, Input, OnInit} from '@angular/core';
import {WindowState} from '../model/WindowState';
import {Angular2DesktopService} from '../angular2-desktop.service';
import {DesktopWindow} from '../model/DesktopWindow';
import {Desktop} from '../model/Desktop';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

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

  constructor(@Inject('desktop') desktop: Desktop,
              private sanitizer: DomSanitizer,
              private desktopService: Angular2DesktopService) {
    this.desktop = desktop;

  }

  ngOnInit() {


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
