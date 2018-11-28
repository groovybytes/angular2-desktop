import {
  AfterContentInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  QueryList, ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {ShortCut} from './model/ShortCut';
import {Desktop} from './model/Desktop';
import {WindowState} from './model/WindowState';
import {DockPosition} from './model/DockPosition';
import {Subscription} from 'rxjs';


@Component({
  selector: 'gb-angular2-desktop',
  templateUrl: './angular2-desktop.component.html',
  styleUrls: ['./angular2-desktop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Angular2DesktopComponent implements OnInit, OnDestroy {


  desktop: Desktop;
  dockPreviewPosition: DockPosition = DockPosition.LEFT;
  showDockPreview: boolean = false;
  @ViewChild("container") container:ElementRef;

  private subscriptions: Array<Subscription> = [];


  constructor(@Inject('desktop') desktop: Desktop,private element:ElementRef) {
    this.desktop = desktop;
  }

  ngOnInit() {
    this.desktop.component=this;
    this.subscriptions.push(this.desktop.dockPreview.subscribe((position: DockPosition) => {
      this.showDockPreview = position != null;
      this.dockPreviewPosition=position;
    }));

  }

  getHeight():number{

    return this.container.nativeElement.getBoundingClientRect().height;
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  shortCutClicked(shortCut: ShortCut): void {
    let window = this.desktop.windows.find(window => window.id === shortCut.windowRef);
    window.state.next(WindowState.NORMAL);
  }

}


