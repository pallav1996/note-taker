import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteColorService {

  constructor() { }
  getBackgroundColor(color_code: string)
  {
    color_code = color_code.trim()
    if(!color_code || color_code.length > 6 || !color_code.match("^[a-fA-F0-9]{1,6}$"))
      color_code = "FFFFFF";

    return `#${color_code}`;
  }

  getTextColor(color_code: string){

    if(!color_code)
      color_code = "FFFFFF";

    if(color_code.length > 6 || !color_code.match("^[a-fA-F0-9]{1,6}$"))
      return "#000000"

    var rgb = parseInt(color_code, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >>  8) & 0xff;  // extract green
    var b = (rgb >>  0) & 0xff;  // extract blue

    //calculate perceived brightness; 0-darkest  255-brightest
    var luma  = Math.sqrt((0.241)*(r*r) + (0.691)*(g*g) + (0.068)*(b*g));

    if(luma > 135)
      return "#000000"; //black text-color

    else
      return "#FFFFFF"; //white text-color
  }
}
