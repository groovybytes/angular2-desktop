import {NgModule} from '@angular/core';
import {Angular2DesktopComponent} from './angular2-desktop.component';
import {CommonModule} from '@angular/common';
import {WindowComponent} from './window/window.component';
import {Angular2DesktopService} from './angular2-desktop.service';
import {InteractDirective} from './interact.directive';
import {BarComponent} from './bar/bar.component';
import {TaskBarComponent} from './bar/taskbar.component';
import {WindowHeaderComponent} from './window/window-header.component';
import {ShortcutComponent} from './shortcut/shortcut.component';
import {SerializationService} from './serialization.service';
import {Desktop} from './model/Desktop';
import {WindowService} from './window/window.service';
import {DockPreviewComponent} from './dock-preview/dock-preview.component';
import { DockToolsComponent } from './dock-tools/dock-tools.component';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    Angular2DesktopService,
    WindowService,
    {provide: 'desktop', useClass: Desktop},
    SerializationService],
  declarations: [Angular2DesktopComponent,
    WindowComponent,
    DockPreviewComponent,
    WindowHeaderComponent,
    BarComponent,
    TaskBarComponent,
    InteractDirective,
    ShortcutComponent,
    DockToolsComponent],
  exports: [Angular2DesktopComponent, WindowComponent, BarComponent]
})
export class Angular2DesktopModule {
}

