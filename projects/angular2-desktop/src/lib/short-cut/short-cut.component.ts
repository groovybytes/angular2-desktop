import {Component, HostListener, Inject, Input, OnInit} from '@angular/core';
import {Desktop} from '../model/Desktop';
import {Angular2DesktopService} from '../angular2-desktop.service';
import {WindowFactoryService} from '../window-factory.service';


@Component({
  selector: 'a2d-shortcut',
  templateUrl: './short-cut.component.html',
  styleUrls: ['./short-cut.component.scss']
})
export class ShortCutComponent implements OnInit {

  @Input() appId: string;
  @Input() title: string = '';
  @Input() icon: string;
  @Input() color: string;


  @HostListener('click') onClick() {
    this.windowFactory.onShortCutTriggered(this.appId);
  }


  constructor(
    @Inject('desktop') private desktop: Desktop,
    private windowFactory: WindowFactoryService) {
  }

  ngOnInit() {

  }

  isOpen(): boolean {
    return false;//this.desktop.getOpenWindowsForApp(this.appId).length>0;
  }


}
