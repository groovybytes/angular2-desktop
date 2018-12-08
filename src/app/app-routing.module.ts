import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {Demo1Component} from './demo1/demo1.component';
import {Demo2Component} from './demo2/demo2.component';
import {PlaygroundComponent} from './playground/playground.component';
const routes: Routes = [
  {
    path: 'demo1',
    component: Demo1Component
  },
  {
    path: 'demo1',
    component: Demo1Component
  },
  {
    path: 'demo2',
    component: Demo2Component
  },
  {
    path: 'playground',
    component: PlaygroundComponent
  }
];

@NgModule({
  providers: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
