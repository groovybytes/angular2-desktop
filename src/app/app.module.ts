import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { Angular2DesktopModule} from 'projects/angular2-desktop/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Angular2DesktopModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
