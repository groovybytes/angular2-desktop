import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'a2d-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  @Input() orientation:string="top";

  @HostBinding('class')
  get clazz() {
    return "bar bar-"+this.orientation;
  }

  constructor() { }

  ngOnInit() {
  }

}
