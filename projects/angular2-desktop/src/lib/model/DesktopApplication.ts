import {TemplateRef} from '@angular/core';

export class DesktopApplication<T>{

  id:string;
  path:string;
  icon:string;
  title:string;
  bodyTemplate: TemplateRef<any>;
  headerTemplate: TemplateRef<any>;
  component:T;
}
