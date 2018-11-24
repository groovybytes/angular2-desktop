import {
  AfterContentInit,
  Component,
  ContentChildren, DoCheck, IterableChangeRecord,
  IterableDiffers,
  OnDestroy,
  OnInit,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import {WindowComponent} from './window/window.component';
import {TaskBarComponent} from './bar/taskbar.component';
import {Subscription} from 'rxjs';
import {Angular2DesktopService} from './angular2-desktop.service';
import {Dictionary} from './model/Dictionary';
import {DesktopWindow} from './model/DesktopWindow';
import {WindowState} from './model/WindowState';


// @ts-ignore
@Component({
  selector: 'gb-angular2-desktop',
  templateUrl: './angular2-desktop.component.html',
  styleUrls: ['./angular2-desktop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Angular2DesktopComponent implements OnInit, AfterContentInit, OnDestroy, DoCheck {


  @ContentChildren(WindowComponent) windows: QueryList<WindowComponent>;

  private iterableDiffer;
  private subscriptions: Dictionary<Subscription> = new Dictionary();

  constructor(private _iterableDiffers: IterableDiffers, private desktopService: Angular2DesktopService) {
    this.iterableDiffer = this._iterableDiffers.find([]).create(null);
  }

  ngOnInit() {
  }

  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.windows);
    if (changes) {
      changes.forEachAddedItem((change: IterableChangeRecord<WindowComponent>) => this.onWindowAdded(change));
      changes.forEachRemovedItem((change: IterableChangeRecord<WindowComponent>) => this.onWindowRemoved(change));
      this.desktopService.validate();
    }
  }

  ngAfterContentInit(): void {


  }

  ngOnDestroy(): void {
    this.subscriptions.keys().forEach(key => {
      let subscription = this.subscriptions.get(key);
      subscription.unsubscribe();
      this.subscriptions.remove(key);
    });
  }

  getClosedWindows(): Array<DesktopWindow> {
    return this.windows
      .filter(window => window.model.state.getValue() === WindowState.CLOSED)
      .map(window => window.model);
  }

  private onWindowAdded(change: IterableChangeRecord<WindowComponent>): void {
    this.subscriptions.add(change.item.model.id,
      change.item.click.subscribe(() => this.desktopService.focus(change.item.model)));
    this.desktopService.addWindow(change.item.model);
  }

  private onWindowRemoved(change: IterableChangeRecord<WindowComponent>): void {
    this.subscriptions.get(change.item.model.id).unsubscribe();
    this.subscriptions.remove(change.item.model.id);
  }
}


