import {Component, HostBinding, Input, OnInit, QueryList} from '@angular/core';
import {WindowComponent} from '../window/window.component';

@Component({
  selector: 'gb-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  @Input() location:string="bottom";


  @HostBinding('attr.class')
  get clazz() {
    return "bar bar-"+this.location;
  }
  ngOnInit() {
    //this.desktop.addWindowWithOrder(this.order);

  }



}
