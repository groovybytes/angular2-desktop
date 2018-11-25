import {AfterContentInit, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Angular2DesktopService} from './angular2-desktop.service';
import {DesktopWindow} from './model/DesktopWindow';
import {ShortCut} from './model/ShortCut';


@Component({
  selector: 'gb-angular2-desktop',
  templateUrl: './angular2-desktop.component.html',
  styleUrls: ['./angular2-desktop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Angular2DesktopComponent implements OnInit, AfterContentInit, OnDestroy {


  //@ContentChildren(WindowComponent) windows: QueryList<WindowComponent>;

  constructor(private desktopService: Angular2DesktopService) {

  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {


  }

  ngOnDestroy(): void {

  }

  getClosedWindows(): Array<DesktopWindow> {
    this.desktopService.getClosedWindows().map(win=>win.shortCut).forEach(
      x=>console.log(x.title))
    )
    return this.desktopService.getClosedWindows();
  }

  shortCutClicked(shortCut: ShortCut): void {
    let window = this.desktopService.getWindow(shortCut.windowRef);
    this.desktopService.open(window);
  }

}


