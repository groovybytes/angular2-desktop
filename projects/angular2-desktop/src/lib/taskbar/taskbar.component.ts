import {AfterViewInit, Component, ElementRef, HostBinding, Inject, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {WindowState} from '../model/WindowState';
import {Angular2DesktopService} from '../angular2-desktop.service';
import {DesktopWindow} from '../model/DesktopWindow';
import {Desktop} from '../model/Desktop';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'a2d-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.scss']
})
export class TaskBarComponent implements OnInit,AfterViewInit {

  @Input() location: string = 'bottom';
  @ViewChildren("entry") entries:QueryList<ElementRef>;

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


  getTaskBarEntryLeft(windowId:string):number{
    let entry = this.entries.find(entry=>entry.nativeElement.id === "taskbar-entry-"+windowId);
    return entry.nativeElement.offsetLeft;

  }
  hasFocus(id: string): boolean {
    return this.desktopService.hasFocus(id);
  }

  getOpenWindows(): Array<DesktopWindow> {
    return this.desktop.windows.filter(window => window.state.getValue() !== WindowState.CLOSED);
  }

  onEntryClicked(window: DesktopWindow): void {
    this.desktopService.onTaskBarClick(window);

  }

  viewDesktop():void{
    this.desktopService.toggleDesktop();
  }

  ngAfterViewInit(): void {

  }


}
