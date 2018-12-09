import { Directive, ViewContainerRef } from '@angular/core';
@Directive({
  selector: '[a2d-window-anchor]'
})
export class DynamicWindowAnchorDirective {
  constructor(public viewContainer: ViewContainerRef) { }
}
