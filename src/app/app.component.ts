import {Component, OnInit} from '@angular/core';
import {WindowSpecs} from '../../projects/angular2-desktop/src/lib/model/specs/WindowSpecs';
import {ShortCutSpecs} from '../../projects/angular2-desktop/src/lib/model/specs/ShortCutSpecs';
import {WindowState} from '../../projects/angular2-desktop/src/lib/model/WindowState';

declare var chance;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  windows: Array<WindowSpecs> = [];
  nWindows = 3;

  ngOnInit(): void {

    for (let i = 0; i < this.nWindows; i++) {
      let window = new WindowSpecs();
      window.order=1;
      window.state=WindowState.NORMAL;
      window.height=chance.integer({min: 100, max: 600});
      window.width=chance.integer({min: 100, max: 600});
      window.x=chance.integer({min: 50, max: 500});
      window.y=chance.integer({min: 50, max: 500});
      window.title=chance.word();
      window.shortCut=new ShortCutSpecs();
      window.shortCut.color=chance.color();
      window.shortCut.icon="";
      window.shortCut.fontColor="white";
      window.shortCut.title=window.title;

      this.windows.push(window);

      /* if (chance.d6()===6)  window.state.next(WindowState.NORMAL);
       else window.state.next(WindowState.CLOSED);*/

    }


  }
}
