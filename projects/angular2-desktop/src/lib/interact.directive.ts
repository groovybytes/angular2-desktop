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
        onend: (event) => {
        },
        onstart: (event) => {
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
    this.window.x+=event.dx;
    this.window.y+=event.dy;
  }

  private onResizeMove(event): void {

    if (event.rect.width >= this.desktop.configuration.windowConfig.minWidth) {
      this.window.width = event.rect.width;
    }
    if (event.rect.height >= this.desktop.configuration.windowConfig.minHeight) {
      this.window.height = event.rect.height;
    }

    this.window.x += event.deltaRect.left;
    this.window.y += event.deltaRect.top;

  }

  private onStateUpdated(state: WindowState): void {
    if (state === WindowState.MAXIMIZED ||
      state === WindowState.DOCKED) {

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
  }


  private enable() {
    interact(this.element.nativeElement)
      .draggable({enabled: true});
    interact(this.element.nativeElement)
      .resizable({enabled: true});

  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

}
