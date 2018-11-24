export class ShortCut {
  constructor(title: string, icon: string, color?: string) {
    this.title = title;
    this.icon = icon;
    this.color = color;
  }

  title: string;
  icon: string;
  color: string;
  fontColor:string="white";

}
