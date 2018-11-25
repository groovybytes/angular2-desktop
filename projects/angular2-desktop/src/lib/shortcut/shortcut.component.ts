import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DesktopWindow} from '../model/DesktopWindow';
import {ShortCut} from '../model/ShortCut';

@Component({
  selector: 'gb-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.scss']
})
export class ShortcutComponent implements OnInit {

  @Input() shortCut: ShortCut;
  @Output() shortCutDblClicked: EventEmitter<void> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {

  }

}
