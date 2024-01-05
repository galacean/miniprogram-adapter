import { document } from "./document";
import { dispatchTouchCancel, dispatchTouchEnd, dispatchTouchMove, dispatchTouchStart } from "./EventIniter/TouchEvent";
import { $window, Event, screen, window } from "./index";
import * as Mixin from "./util/mixin";

declare let my: any;

/**同步和异步都需要的数据*/
let canvas: any = {};
let canvas2D: any = {};
let _isMiniGame = false;

/**异步注册3Dcanvas*/
function registerCanvas(c, id: string = "canvas") {
  canvas = c;
  canvas.id = id;

  if (!("tagName" in canvas)) {
    canvas.tagName = "CANVAS";
  }

  canvas.type = "canvas";

  Mixin.parentNode(canvas);
  Mixin.style(canvas);
  Mixin.classList(canvas);
  Mixin.clientRegion(canvas);
  Mixin.offsetRegion(canvas);

  canvas.focus = function () {};
  canvas.blur = function () {};

  canvas.addEventListener = function (type, listener, options = {}) {
    document.addEventListener(type, listener, options);
  };

  canvas.removeEventListener = function (type, listener) {
    document.removeEventListener(type, listener);
  };

  canvas.dispatchEvent = function (event: any) {
    document.dispatchEvent(event);
  };
}

/**异步注册2Dcanvas*/
function registerCanvas2D(c, id: string = "canvas2D") {
  canvas2D = c;
  canvas2D.id = id;

  if (!("tagName" in canvas2D)) {
    canvas2D.tagName = "CANVAS";
  }

  canvas2D.type = "canvas";

  Mixin.parentNode(canvas2D);
  Mixin.style(canvas2D);
  Mixin.classList(canvas2D);
  Mixin.clientRegion(canvas2D);
  Mixin.offsetRegion(canvas2D);

  canvas2D.focus = function () {};
  canvas2D.blur = function () {};

  canvas2D.addEventListener = function (type, listener, options = {}) {
    document.addEventListener(type, listener, options);
  };

  canvas2D.removeEventListener = function (type, listener) {
    document.removeEventListener(type, listener);
  };

  canvas2D.dispatchEvent = function (event: any) {
    document.dispatchEvent(event);
  };
}

/** 注册小游戏 */
function registerMiniGame() {
  if (_isMiniGame) return;
  _isMiniGame = true;

  for (const key in $window) {
    //  @ts-ignore
    if (!window[key]) window[key] = $window[key];
  }

  // 绑定小游戏事件
  my.onTouchStart(dispatchTouchStart);
  my.onTouchMove(dispatchTouchMove);
  my.onTouchEnd(dispatchTouchEnd);
  my.onTouchCancel(dispatchTouchCancel);
}

function isMiniGame(): boolean {
  return _isMiniGame;
}

/**异步获取3Dcanvas*/
function getCanvas() {
  return canvas;
}

/**异步获取2Dcanvas*/
function getCanvas2D() {
  return canvas2D;
}

/**
 * 监听可渲染区域尺寸改变的回调
 * 如：在 onCanvasReady 前后，windowWidth 和 windowHeight 可能会改变（导航栏的高度）
 */
function registerResize() {
  // 获取页面宽高
  const { screenWidth, screenHeight, windowWidth, windowHeight } = my.getSystemInfoSync();
  screen.width = screenWidth;
  screen.height = screenHeight;
  screen.availWidth = window.innerWidth = windowWidth;
  screen.availHeight = window.innerHeight = windowHeight;
  updateCanvasSize(getCanvas(), windowWidth, windowHeight);
  updateCanvasSize(getCanvas2D(), windowWidth, windowHeight);
  window.dispatchEvent(new Event("resize"));
}

function updateCanvasSize(canvas, width, height) {
  if (!canvas) return;
  const { style } = canvas;
  if (style) {
    style.width = width + "px";
    style.height = height + "px";
  }
  try {
    canvas.clientWidth = width;
  } catch (error) {
    // Only work in MiniProgram
  }
  try {
    canvas.clientHeight = height;
  } catch (error) {
    // Only work in MiniProgram
  }
}

export { registerCanvas, registerCanvas2D, registerResize, getCanvas, getCanvas2D, registerMiniGame, isMiniGame };
