import {Directive, ElementRef, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {DesktopWindow} from './model/DesktopWindow';

import {Subscription} from 'rxjs';
import {WindowState} from './model/WindowState';
import {Angular2DesktopService} from './angular2-desktop.service';
import {Desktop} from './model/Desktop';

declare var interact;
declare var $;

@Directive({
  selector: '[interact]'
})
export class InteractDirective implements OnInit, OnDestroy {

  @Input() parent: string = 'parent';
  @Input() window: DesktopWindow;

  private stateSubscription: Subscription;


  constructor(private element: ElementRef,
              @Inject('desktop') private desktop: Desktop,
              private desktopService: Angular2DesktopService) {

  }

  ngOnInit(): void {

    this.stateSubscription = this.window.state.subscribe(state => this.onStateUpdated(state));
    this.element.nativeElement.style.webkitTransform =
      this.element.nativeElement.style.transform =
        'translate(' + this.window.x + 'px, ' + this.window.y + 'px)';

    // update the posiion attributes
    this.element.nativeElement.setAttribute('data-x', this.window.x);
    this.element.nativeElement.setAttribute('data-y', this.window.y);

    /*this.element.nativeElement.style.width = this.window.width + 'vw';
    this.element.nativeElement.style.height = this.window.height + 'vh';*/

    interact(this.element.nativeElement)
      .draggable({
        // enable inertial throwing
        inertia: true,
        allowFrom: '.drag-handle',
        // keep the element within the area of it's parent
        restrict: {
          restriction: this.parent,
          endOnly: false,
          elementRect: {top: 0, left: 0, bottom: 1, right: 1}
        },
        // enable autoScroll
        autoScroll: false,
        endOnly: true,


        // call this function on every dragmove event
        onmove: (event) => this.onMove(event),
        // call this function on every dragend event
        onend:  (event)=> {
        },
        onstart:  (event)=> {
          this.desktopService.moveUp(this.window);
        }
      })
      .resizable({

        // resize from all edges and corners
        edges: {left: true, right: true, bottom: true, top: true},
        restrictEdges: {
          outer: this.parent,
          endOnly: false,
        },
        enabled: true,
        inertia: false,
        restrictSize: {
          min: {
            width: this.desktop.configuration.windowConfig.minWidth,
            height: this.desktop.configuration.windowConfig.minHeight,
          },
        },
        invert: 'none'
      })
      .on('resizemove', (event) => this.onResizeMove(event))
      .on('resizeend', (event) => {

      })
      .on('resizestart', (event) => {
        this.desktopService.moveUp(this.window);
      });


  }

  private onMove(event): void {
    let target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    this.updatePosition(x, y, true);
  }

  private onResizeMove(event): void {
    let target = event.target,
      x = (parseFloat(target.getAttribute('data-x')) || 0),
      y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    /*target.style.width = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';*/
    console.log(this.desktop.configuration.windowConfig.minWidth);
    if (event.rect.width >= this.desktop.configuration.windowConfig.minWidth){
      this.window.width = event.rect.width;
    }

    if (event.rect.height >= this.desktop.configuration.windowConfig.minHeight){
      this.window.height = event.rect.height;
    }



    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
      'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  private onStateUpdated(state: WindowState): void {
    if (state === WindowState.MAXIMIZED || state===WindowState.DOCKED) {

      this.disable();
    } else {
      this.enable();
    }

  }

  private disable() {
    interact(this.element.nativeElement)
      .draggable({enabled: false});
    interact(this.element.nativeElement)
      .resizable({enabled: false});


    this.updatePosition(0, 0, false);
  }

  private updatePosition(x: number, y: number, updateWindow: boolean): void {
    this.element.nativeElement.style.webkitTransform =
      this.element.nativeElement.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    this.element.nativeElement.setAttribute('data-x', x);
    this.element.nativeElement.setAttribute('data-y', y);

    if (updateWindow) {
      this.window.x = x;
      this.window.y = y;
    }

  }

  private enable() {
    interact(this.element.nativeElement)
      .draggable({enabled: true});
    interact(this.element.nativeElement)
      .resizable({enabled: true});

    this.updatePosition(this.window.x, this.window.y, false);
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

}
