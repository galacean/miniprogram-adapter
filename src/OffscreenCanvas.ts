import { isMiniGame } from "./register";
declare let my: any;

export class OffscreenCanvas {
  constructor(width: number = 0, height: number = 0) {
    let canvas;
    if (isMiniGame()) {
      canvas = my.createCanvas();
      canvas.width = width;
      canvas.height = height;
    } else {
      canvas = my.createOffscreenCanvas(width, height);
    }
    return canvas;
  }
}
