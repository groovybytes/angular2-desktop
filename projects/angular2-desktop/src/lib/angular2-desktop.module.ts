import {NgModule} from '@angular/core';
import {Angular2DesktopComponent} from './angular2-desktop.component';
import {CommonModule} from '@angular/common';
import {WindowComponent} from './window/window.component';
import {Angular2DesktopService} from './angular2-desktop.service';
import {InteractDirective} from './interact.directive';
import {WindowHeaderComponent} from './window/window-header.component';
import {SerializationService} from './serialization.service';
import {Desktop} from './model/Desktop';
import {DockPreviewComponent} from './dock-preview/dock-preview.component';
import {DockToolsComponent} from './dock-tools/dock-tools.component';
import {MenuComponent} from './menu/menu.component';
import {ShortCutComponent} from './short-cut/short-cut.component';
import {BarComponent} from './bar/bar.component';
import {TaskBarComponent} from './task-bar/task-bar.component';
import {DesktopShortcutComponent} from './desktop-shortcut/desktop-shortcut.component';
import {A2dClientService} from './a2d-client.service';
import {DynamicWindowAnchorDirective} from './dynamic-window-anchor.directive';
import {WindowFactoryService} from './window-factory.service';
import { ShortCutDirective } from './short-cut.directive';
import { DesktopApplicationComponent } from './desktop-application/desktop-application.component';


@NgModule({
  imports: [
    CommonModule],
  providers: [
    Angular2DesktopService,
    A2dClientService,
    WindowFactoryService,
    {provide: 'desktop', useClass: Desktop},
    SerializationService],
  declarations: [Angular2DesktopComponent,
    WindowComponent,
    DockPreviewComponent,
    WindowHeaderComponent,
    InteractDirective,
    ShortCutComponent,
    DockToolsComponent,
    MenuComponent,
    BarComponent,
    TaskBarComponent,
    DesktopShortcutComponent,
    DynamicWindowAnchorDirective,
    ShortCutDirective,
    DesktopApplicationComponent],
  exports: [
    Angular2DesktopComponent,
    ShortCutComponent,
    WindowComponent,
    BarComponent,
    TaskBarComponent,
    DesktopApplicationComponent,
    ShortCutDirective,
    DesktopShortcutComponent]
})
export class Angular2DesktopModule {
}

