import {Component, Input, OnInit} from '@angular/core';
import {DockPosition} from '../model/DockPosition';


@Component({
  selector: 'a2d-dock-preview',
  templateUrl: './dock-preview.component.html',
  styleUrls: ['./dock-preview.component.scss']
})
export class DockPreviewComponent implements OnInit {

  @Input() position:DockPosition;
  @Input() show:boolean;
  DockPosition=DockPosition;

  ngOnInit(): void {
  }



}
