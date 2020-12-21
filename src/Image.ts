import { getCanvas } from "./register";
import * as Mixin from "./util/mixin";

export class Image {
  constructor() {
    let canvas = getCanvas();

    const image = (canvas.createImage && canvas.createImage()) || {};

    if (!("tagName" in image)) {
      image.tagName = "IMG";
      image.__proto__ = Image.prototype;
    }

    Mixin.parentNode(image);
    Mixin.classList(image);

    return image;
  }
}
