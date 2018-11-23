import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'gb-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.scss']
})
export class TaskbarComponent implements OnInit {

  @Input() location:string="bottom";

  @HostBinding('attr.class')
  get clazz() {
    return "bar bar-"+this.location;
  }
  ngOnInit() {
    //this.desktop.addWindowWithOrder(this.order);

  }



}
