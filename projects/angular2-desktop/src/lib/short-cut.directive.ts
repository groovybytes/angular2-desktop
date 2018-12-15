import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {WindowFactoryService} from './window-factory.service';

@Directive({
  selector: '[a2dShortCut]'
})
export class ShortCutDirective {


  @Input() appId: string;
  @Input() linkId: string;
  @Input() windowTitle: string;
  @Output() initialize: EventEmitter<{ component: any, windowId: string }> = new EventEmitter();

  //private windowId: string;

  @HostListener('click', ['$event'])
  clickEvent() {
    this.trigger(this.windowTitle);
  }

  @HostListener('dblClick', ['$event'])
  dblClickEvent() {
    this.trigger(this.windowTitle);
  }


  constructor(private windowFactory: WindowFactoryService) {

  }

  private trigger(windowTitle?: string): void {

    this.windowFactory
      .onShortCutTriggered(this.appId, windowTitle, this.linkId, (component, windowId) =>
        this.initialize.emit({component: component, windowId: windowId}))
      .catch(error => console.warn(error));

  }

}
