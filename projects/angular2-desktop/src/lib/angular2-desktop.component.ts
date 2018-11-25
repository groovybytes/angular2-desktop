import {AfterContentInit, Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Angular2DesktopService} from './angular2-desktop.service';
import {DesktopWindow} from './model/DesktopWindow';
import {ShortCut} from './model/ShortCut';
import {Desktop} from './model/Desktop';


@Component({
  selector: 'gb-angular2-desktop',
  templateUrl: './angular2-desktop.component.html',
  styleUrls: ['./angular2-desktop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Angular2DesktopComponent implements OnInit, AfterContentInit, OnDestroy {


  //@ContentChildren(WindowComponent) windows: QueryList<WindowComponent>;

  desktop: Desktop;

  constructor(@Inject('desktop') desktop: Desktop,private desktopService: Angular2DesktopService) {
    this.desktop=desktop;
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {


  }

  ngOnDestroy(): void {

  }

  shortCutClicked(shortCut: ShortCut): void {
    let window = this.desktopService.getWindow(shortCut.windowRef);
    this.desktopService.open(window);
  }

}


