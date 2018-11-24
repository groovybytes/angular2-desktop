import {Component, OnInit} from '@angular/core';
import {DesktopWindow} from '../../projects/angular2-desktop/src/lib/model/DesktopWindow';
import {WindowState} from '../../projects/angular2-desktop/src/lib/model/WindowState';
import {ShortCut} from '../../projects/angular2-desktop/src/lib/model/ShortCut';

declare var chance;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  windows:Array<DesktopWindow>=[];
  nWindows=50;

  ngOnInit(): void {

    for (let i = 0; i < this.nWindows; i++) {
      let window = new DesktopWindow(chance.word(),
        new ShortCut("w"+i,"",chance.color()),
        chance.integer({ min: 20, max: 300 }),
        chance.integer({ min: 20, max: 300 }),
        chance.integer({ min: 30, max: 60 }),
        chance.integer({ min: 30, max: 50 }));

      this.windows.push(window);

     /* if (chance.d6()===6)  window.state.next(WindowState.NORMAL);
      else window.state.next(WindowState.CLOSED);*/

      window.state.next(WindowState.CLOSED);
    }


  }
}
