import { Component, OnInit } from '@angular/core';
import {Angular2DesktopService} from '../angular2-desktop.service';

@Component({
  selector: 'layoutcontrol',
  templateUrl: './layoutcontrol.component.html',
  styleUrls: ['./layoutcontrol.component.scss']
})
export class LayoutcontrolComponent implements OnInit {

  constructor(private desktop:Angular2DesktopService) { }

  ngOnInit() {
  }



}
