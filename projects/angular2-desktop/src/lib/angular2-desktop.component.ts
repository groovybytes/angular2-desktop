import {AfterContentInit, Component, ContentChildren, ElementRef, OnDestroy, OnInit, QueryList, ViewEncapsulation} from '@angular/core';
import {Angular2DesktopService} from './angular2-desktop.service';
import {WindowComponent} from './window/window.component';
import {BarComponent} from './bar/bar.component';
import {TaskBarComponent} from './bar/taskbar.component';


// @ts-ignore
@Component({
  selector: 'gb-angular2-desktop',
  templateUrl: './angular2-desktop.component.html',
  styleUrls: ['./angular2-desktop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Angular2DesktopComponent implements OnInit, AfterContentInit,OnDestroy {


  @ContentChildren(WindowComponent) windows: QueryList<WindowComponent>;
  @ContentChildren(TaskBarComponent) bars: QueryList<TaskBarComponent>;


  constructor(private desktop: Angular2DesktopService) {
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.bars.forEach(bar=>bar.windows=this.windows);
  }

  ngOnDestroy(): void {

  }
}
