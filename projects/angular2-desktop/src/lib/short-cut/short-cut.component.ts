import {Component, HostListener, Inject, Input, OnInit} from '@angular/core';
import {Desktop} from '../model/Desktop';
import {DesktopWindow} from '../model/DesktopWindow';
import {A2dClientService} from '../a2d-client.service';


@Component({
  selector: 'a2d-shortcut',
  templateUrl: './short-cut.component.html',
  styleUrls: ['./short-cut.component.scss']
})
export class ShortCutComponent implements OnInit {

  @Input() appId: string;
  @Input() title: string="";
  @Input() icon: string;
  @Input() color: string;


  @HostListener('click') onClick() {
   this.clientService.openApplication(this.appId);
  }


  constructor(
    @Inject('desktop') private desktop: Desktop,
    private clientService: A2dClientService) {
  }

  ngOnInit() {

  }

  isOpen():boolean{
    return this.desktop.getOpenWindowsForApp(this.appId).length>0;
  }


}
