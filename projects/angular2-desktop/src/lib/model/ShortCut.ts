export class ShortCut {

  constructor(windowRef:string,title: string, icon: string, color?: string) {
    this.title = title;
    this.icon = icon;
    this.color = color;
    this.windowRef=windowRef;
  }

  windowRef: string;
  title: string;
  icon: string;
  color: string;
  fontColor:string="white";

}
