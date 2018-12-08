import {Component, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'a2d-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {


  @Input() id:string;
  @Input() bodyTemplate:TemplateRef<any>;
  @Input() headerTemplate:TemplateRef<any>;
  //@Input() dataContext;

  constructor() { }

  ngOnInit() {

  }

}
