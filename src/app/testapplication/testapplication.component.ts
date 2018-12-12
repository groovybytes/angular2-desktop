import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-testapplication',
  templateUrl: './testapplication.component.html',
  styleUrls: ['./testapplication.component.css']
})
export class TestapplicationComponent implements OnInit {

  @Input() param1:string;

  constructor() { }

  ngOnInit() {
  }

}
