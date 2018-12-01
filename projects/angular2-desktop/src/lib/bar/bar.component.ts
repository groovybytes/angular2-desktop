import {Component, HostBinding, Input, OnInit, QueryList} from '@angular/core';
import {WindowComponent} from '../window/window.component';

@Component({
  selector: 'ad2-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  @Input() location:string="top";


  @HostBinding('class')
  get clazz() {
    return "bar bar-"+this.location;
  }
  ngOnInit() {
    //this.desktop.addWindowWithOrder(this.order);

  }



}
