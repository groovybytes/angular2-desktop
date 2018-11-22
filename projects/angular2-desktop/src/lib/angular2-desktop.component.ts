import {AfterContentInit, Component, ContentChildren, ElementRef, OnInit, QueryList} from '@angular/core';
import {LayoutManagerService} from './layout-manager.service';

@Component({
  selector: 'gb-angular2-desktop',
  templateUrl: './angular2-desktop.component.html',
  styleUrls: ['./angular2-dekstop.component.scss']
})
export class Angular2DesktopComponent implements OnInit, AfterContentInit {

  @ContentChildren('window')
  windows: QueryList<ElementRef>;


  constructor(private layoutManager: LayoutManagerService) {
  }

  ngOnInit() {
  }


  ngAfterContentInit(): void {
    console.log(this.windows);
  }
}
