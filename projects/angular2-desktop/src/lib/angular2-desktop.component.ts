import {AfterContentInit, Component, ContentChildren, ElementRef, OnInit, QueryList, ViewEncapsulation} from '@angular/core';
import {Angular2DesktopService} from './angular2-desktop.service';
import {WindowComponent} from './window/window.component';


// @ts-ignore
@Component({
  selector: 'gb-angular2-desktop',
  templateUrl: './angular2-desktop.component.html',
  styleUrls: ['./angular2-desktop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Angular2DesktopComponent implements OnInit, AfterContentInit {


  @ContentChildren(WindowComponent) windows: QueryList<WindowComponent>;


  constructor(private desktop: Angular2DesktopService) {
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    console.log(this.windows);
  }
}
