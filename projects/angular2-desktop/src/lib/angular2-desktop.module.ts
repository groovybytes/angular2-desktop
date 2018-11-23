import {NgModule} from '@angular/core';
import {Angular2DesktopComponent} from './angular2-desktop.component';
import {CommonModule} from '@angular/common';
import {LayoutcontrolComponent} from './layoutcontrol/layoutcontrol.component';
import {WindowComponent} from './window/window.component';
import {Angular2DesktopService} from './angular2-desktop.service';
import {InteractDirective} from './interact.directive';
import {TaskbarComponent} from './taskbar/taskbar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [Angular2DesktopService],
  declarations: [Angular2DesktopComponent,
    WindowComponent,
    LayoutcontrolComponent,
    TaskbarComponent,
    InteractDirective],
  exports: [Angular2DesktopComponent, WindowComponent, LayoutcontrolComponent]
})
export class Angular2DesktopModule {
}

