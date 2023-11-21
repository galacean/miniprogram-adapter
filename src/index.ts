import { atob, btoa } from "./atob";
import { Blob } from "./blob";
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
import { ImageData } from "./ImageData";
import { location } from "./location";
import { navigator } from "./navigator";
import { Node } from "./Node";
import { OffscreenCanvas } from "./OffscreenCanvas";
import { performance } from "./performance";
import { cancelAnimationFrame, requestAnimationFrame } from "./requestAnimationFrame";
import { screen } from "./screen";
import { URL } from "./url";
import { URLSearchParams } from "./URLSearchParams";
import { WebGLRenderingContext } from "./WebGL";
import { WebGL2RenderingContext } from "./WebGL2";
import { XMLHttpRequest } from "./XMLHttpRequest";

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
  URLSearchParams,
  requestAnimationFrame,
  cancelAnimationFrame,
  screen,
  XMLHttpRequest,
  performance,
  URL,
  WebGLRenderingContext,
  WebGL2RenderingContext,
  OffscreenCanvas,
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
  innerHeight: screen.availHeight,
  setTimeout: setTimeout
};

export * from "./EventIniter/index";
export { registerCanvas, registerCanvas2D, registerMiniGame } from "./register";
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
  URLSearchParams,
  requestAnimationFrame,
  cancelAnimationFrame,
  screen,
  XMLHttpRequest,
  performance,
  WebGLRenderingContext,
  WebGL2RenderingContext,
  ImageData,
  location,
  OffscreenCanvas
};
export { window as $window, document as $document, XMLHttpRequest as $XMLHttpRequest, location as $location };
