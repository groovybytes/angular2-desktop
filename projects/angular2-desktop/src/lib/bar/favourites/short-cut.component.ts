import {Component, HostListener, Inject, Input, OnInit} from '@angular/core';
import {Desktop} from '../../model/Desktop';
import {DesktopWindow} from '../../model/DesktopWindow';
import {WindowState} from '../../model/WindowState';


@Component({
  selector: 'a2d-shortcut',
  templateUrl: './short-cut.component.html',
  styleUrls: ['./short-cut.component.scss']
})
export class ShortCutComponent implements OnInit {

  @Input() windowId: string;
  @Input() title: string="xxx";
  @Input() icon: string;
  @Input() color: string;


  @HostListener('click') onClick() {
    this.desktop.getWindow(this.windowId).normalize();
  }


  constructor(@Inject('desktop') private desktop: Desktop) {
  }

  ngOnInit() {

  }

  getWindow():DesktopWindow{
    return this.desktop.getWindow(this.windowId);
  }


}
