import {Component, Input, OnInit} from '@angular/core';
import {DesktopWindow} from '../model/DesktopWindow';
import {ShortCut} from '../model/ShortCut';

@Component({
  selector: 'gb-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.scss']
})
export class ShortcutComponent implements OnInit {

  @Input() shortCut:ShortCut;

  constructor() { }

  ngOnInit() {
  }

}
