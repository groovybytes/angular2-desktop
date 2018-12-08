import {Component, ComponentFactoryResolver, Inject, Injector, OnInit, TemplateRef} from '@angular/core';
import {DOCUMENT} from '@angular/common';


@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  constructor(private resolver: ComponentFactoryResolver,
              private injector: Injector,
              @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  }

  open() {
   /* const factory = this.resolver.resolveComponentFactory(WindowComponent);
    const componentRef = factory.create(this.injector);
    componentRef.instance.width=400;
    componentRef.instance.height=400;

    componentRef.hostView.detectChanges();
    const { nativeElement } = componentRef.location;
    this.document.body.appendChild(nativeElement);*/
  }


  resolveNgContent<T>(content: any) {
    if (typeof content === 'string') {
      const element = this.document.createTextNode(content);
      return [[element]];
    }

    if (content instanceof TemplateRef) {
      const viewRef = content.createEmbeddedView(null);
      return [viewRef.rootNodes];
    }

    /** Otherwise it's a component */
    const factory = this.resolver.resolveComponentFactory(content);
    const componentRef = factory.create(this.injector);
    return [[componentRef.location.nativeElement]];
  }


}
