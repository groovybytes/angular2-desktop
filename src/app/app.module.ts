import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {Angular2DesktopModule} from '../../projects/angular2-desktop/src/lib/angular2-desktop.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Angular2DesktopModule2
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
