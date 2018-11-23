import {Component, OnInit} from '@angular/core';
import {DesktopWindow} from '../../projects/angular2-desktop/src/lib/model/DesktopWindow';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  window1:DesktopWindow;
  window2:DesktopWindow;

  ngOnInit(): void {
    this.window1=new DesktopWindow("window1",100,100,50,50);
    this.window2=new DesktopWindow("window2",300,300,50,50);
  }
}
