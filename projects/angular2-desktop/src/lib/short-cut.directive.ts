import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {WindowFactoryService} from './window-factory.service';

@Directive({
  selector: '[a2dShortCut]'
})
export class ShortCutDirective {


  @Input() appId: string;
  @Input() windowId: string;
  @Output() initialize: EventEmitter<{ component: any, windowId: string }> = new EventEmitter();

  //private windowId: string;

  @HostListener('click', ['$event'])
  clickEvent() {
    this.trigger();
  }

  @HostListener('dblClick', ['$event'])
  dblClickEvent() {
    this.trigger();
  }


  constructor(private windowFactory: WindowFactoryService) {

  }

  private trigger(): void {
    if (this.windowId) {
      this.windowFactory.openWindow(this.windowId);
    } else {
      this.windowFactory
        .onShortCutTriggered(this.appId, (component, windowId) =>
          this.initialize.emit({component: component, windowId: windowId}))
        .catch(error => console.warn(error));
    }

  }

}
