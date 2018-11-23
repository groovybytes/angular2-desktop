import {Component, HostBinding, Input, OnInit, QueryList} from '@angular/core';
import {WindowComponent} from '../window/window.component';
import {WindowState} from '../model/WindowState';

@Component({
  selector: 'gb-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.scss']
})
export class TaskBarComponent implements OnInit {

  @Input() location: string = 'bottom';

  @Input() windows: QueryList<WindowComponent>;


  @HostBinding('attr.class')
  get clazz() {
    return 'bar bar-' + this.location;
  }

  ngOnInit() {
    //this.desktop.addWindowWithOrder(this.order);

  }

  onEntryClicked(window: WindowComponent): void {
    window.window.state.next(WindowState.NORMAL);
  }


}
