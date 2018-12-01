import {NgModule} from '@angular/core';
import {Angular2DesktopComponent} from './angular2-desktop.component';
import {CommonModule} from '@angular/common';
import {WindowComponent} from './window/window.component';
import {Angular2DesktopService} from './angular2-desktop.service';
import {InteractDirective} from './interact.directive';
import {BarComponent} from './bar/bar.component';
import {WindowHeaderComponent} from './window/window-header.component';
import {SerializationService} from './serialization.service';
import {Desktop} from './model/Desktop';
import {WindowService} from './window/window.service';
import {DockPreviewComponent} from './dock-preview/dock-preview.component';
import { DockToolsComponent } from './dock-tools/dock-tools.component';
import { MenuComponent } from './menu/menu.component';
import { FavouritesComponent } from './bar/favourites/favourites.component';
import {TaskBarComponent} from './bar/taskbar/taskbar.component';
import {ShortCutComponent} from './bar/favourites/short-cut.component';
import { WindowContainerComponent } from './window-container/window-container.component';
import { BarContainerComponent } from './bar-container/bar-container.component';


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
    ShortCutComponent,
    WindowHeaderComponent,
    BarComponent,
    TaskBarComponent,
    InteractDirective,
    DockToolsComponent,
    MenuComponent,
    FavouritesComponent,
    WindowContainerComponent,
    BarContainerComponent],
  exports: [
    Angular2DesktopComponent,
    WindowComponent,
    WindowContainerComponent,
    BarContainerComponent,
    ShortCutComponent,
    BarComponent]
})
export class Angular2DesktopModule {
}

