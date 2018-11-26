import {DockPosition} from "./WindowPosition";
import {AbstractLayout} from "./LayoutEngine";


export class VerticalLayout extends AbstractLayout{



  reset(): void {


  }

  apply(): void {

    let window = this.windows.find(window=>window.order===0);
    if (window) {
      window.position.next(DockPosition.TOP);
    }
    window = this.windows.find(window=>window.order===1);
    if (window) {
      window.position.next(DockPosition.BOTTOM);
    }
    this.windows.forEach(window=>window.updateClass());
  }
}
