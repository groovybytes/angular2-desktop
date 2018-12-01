import {AfterContentInit, Component, ContentChildren, Inject, OnInit, QueryList} from '@angular/core';
import {Desktop} from '../../model/Desktop';
import {Angular2DesktopService} from '../../angular2-desktop.service';
import {ShortCutComponent} from './short-cut.component';

@Component({
  selector: 'a2d-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  @ContentChildren(ShortCutComponent) shortCuts:QueryList<ShortCutComponent>;

  constructor(@Inject('desktop') private desktop: Desktop, private desktopService: Angular2DesktopService) { }

  ngOnInit() {
  }





}
