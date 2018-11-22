import {NgModule} from '@angular/core';
import {Angular2DesktopComponent} from './angular2-desktop.component';
import {CommonModule} from '@angular/common';
import {LayoutcontrolComponent} from './layoutcontrol/layoutcontrol.component';
import {WindowComponent} from './window/window.component';
import {LayoutManagerService} from './layout-manager.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [LayoutManagerService],
  declarations: [Angular2DesktopComponent, WindowComponent, LayoutcontrolComponent],
  exports: [Angular2DesktopComponent, WindowComponent, LayoutcontrolComponent]
})
export class Angular2DesktopModule {
}

