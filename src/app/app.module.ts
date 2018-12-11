import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {Angular2DesktopModule, WindowComponent} from 'projects/angular2-desktop/src/public_api';
import {Demo1Component} from './demo1/demo1.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import { Demo2Component } from './demo2/demo2.component';
import { TestapplicationComponent } from './testapplication/testapplication.component';

@NgModule({
  declarations: [
    AppComponent,
    Demo1Component,
    Demo2Component,
    TestapplicationComponent
  ],
  imports: [
    RouterModule ,
    BrowserModule,
    Angular2DesktopModule,
    AppRoutingModule
  ],
  entryComponents:[WindowComponent,TestapplicationComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
