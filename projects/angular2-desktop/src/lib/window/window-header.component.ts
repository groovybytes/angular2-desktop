import {Component, Input, OnInit} from '@angular/core';
import {DesktopWindow} from '../model/DesktopWindow';
import {WindowState} from '../model/WindowState';
import {Angular2DesktopService} from '../angular2-desktop.service';


@Component({
  selector: 'gb-window-header',
  templateUrl: './window-header.component.html',
  styleUrls: ['./window-header.component.scss']
})
export class WindowHeaderComponent implements OnInit {

  @Input() window: DesktopWindow;

  state = WindowState;


  constructor(private desktop: Angular2DesktopService) {
  }

  minimize(): void {
    this.desktop.minimize(this.window);

  }

  restore(): void {
    this.desktop.normalize(this.window);
  }

  maximize(): void {
    this.desktop.maximize(this.window);
  }

  close(): void {
    this.desktop.close(this.window);
  }

  ngOnInit() {
  }

}
