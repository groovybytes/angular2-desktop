import {AfterViewInit, Component, ComponentFactoryResolver, Inject, Injector, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-test-app',
  templateUrl: './test-app.component.html',
  styleUrls: ['./test-app.component.css']
})
export class TestAppComponent implements OnInit,AfterViewInit {

  //@ViewChild('body') bodyTemplate;
  @Input() bodyTemplate;


  constructor(private resolver: ComponentFactoryResolver,
              private injector: Injector,
              @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  }


  ngAfterViewInit(): void {
    /*console.log(this.bodyTemplate);

    let result = this.resolveNgContent(this.bodyTemplate);
    console.log(result);*/


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
