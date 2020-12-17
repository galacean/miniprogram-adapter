import { atob, btoa } from "./atob";
import devicePixelRatio from "./devicePixelRatio";
import { document } from "./document";
import { Element } from "./Element";
import { Event } from "./Event";
import EventTarget from "./EventTarget";
import { HTMLCanvasElement } from "./HTMLCanvasElement";
import { HTMLElement } from "./HTMLElement";
import { HTMLMediaElement } from "./HTMLMediaElement";
import { HTMLVideoElement } from "./HTMLVideoElement";
import { Image } from "./Image";
import { navigator } from "./navigator";
import { Node } from "./Node";
import { requestAnimationFrame, cancelAnimationFrame } from "./requestAnimationFrame";
import { screen } from "./screen";
import { XMLHttpRequest } from "./XMLHttpRequest";
import { performance } from "./performance";
import { WebGL2RenderingContext } from "./WebGL2";
import { WebGLRenderingContext } from "./WebGL";
import { URL } from "./url";
import { Blob } from "./blob";
import { ImageData } from "./ImageData";

const window = {
  atob,
  btoa,
  devicePixelRatio,
  Blob,
  document,
  Element,
  Event,
  EventTarget,
  HTMLCanvasElement,
  HTMLElement,
  HTMLMediaElement,
  HTMLVideoElement,
  Image,
  navigator,
  Node,
  requestAnimationFrame,
  cancelAnimationFrame,
  screen,
  XMLHttpRequest,
  performance,
  URL,
  WebGL2RenderingContext,
  addEventListener(type, listener, options = {}) {
    document.addEventListener(type, listener, options);
  },
  removeEventListener(type, listener) {
    document.removeEventListener(type, listener);
  },
  dispatchEvent(event: Event) {
    document.dispatchEvent(event);
  },
  innerWidth: screen.availWidth,
  innerHeight: screen.availHeight
};

export {
  btoa,
  URL,
  Blob,
  window,
  atob,
  devicePixelRatio,
  document,
  Element,
  Event,
  EventTarget,
  HTMLCanvasElement,
  HTMLElement,
  HTMLMediaElement,
  HTMLVideoElement,
  Image,
  navigator,
  Node,
  requestAnimationFrame,
  cancelAnimationFrame,
  screen,
  XMLHttpRequest,
  performance,
  WebGLRenderingContext,
  WebGL2RenderingContext,
  ImageData
};

export { registerCanvas, registerCanvas2D } from "./register";

export * from "./EventIniter/index";
