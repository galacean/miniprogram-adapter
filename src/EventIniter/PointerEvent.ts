import { Event } from "../Event";
import { getCanvas } from "../register";
import { document } from "../document";

class PointerEvent extends Event {
  buttons: number;
  which: number;
  offsetX: number;
  offsetY: number;
  pointerId: number;
  bubbles: boolean;
  button: number;
  width: number;
  height: number;
  pressure: number;
  isPrimary: boolean;
  pointerType: string;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;

  constructor(type) {
    super(type);

    this.target = getCanvas();
    this.currentTarget = getCanvas();
  }
}

const CLONE_PROPS = [
  // MouseEvent
  "bubbles",
  "cancelable",
  "view",
  "detail",
  "screenX",
  "screenY",
  "clientX",
  "clientY",
  "ctrlKey",
  "altKey",
  "shiftKey",
  "metaKey",
  "button",
  "relatedTarget",

  // PointerEvent
  "pointerId",
  "width",
  "height",
  "pressure",
  "tiltX",
  "tiltY",
  "pointerType",
  "hwTimestamp",
  "isPrimary",

  // event instance
  "pageX",
  "pageY",
  "timeStamp"
];

const CLONE_DEFAULTS = [
  // MouseEvent
  false,
  false,
  null,
  null,
  0,
  0,
  0,
  0,
  false,
  false,
  false,
  false,
  0,
  null,

  // DOM Level 3
  0,

  // PointerEvent
  0,
  0,
  0,
  0,
  0,
  0,
  "",
  0,
  false,

  // event instance
  0,
  0,
  0
];

const POINTER_TYPE = "touch";

function touchToPointer(type, touch) {
  var e = new PointerEvent(type);
  for (var i = 0; i < CLONE_PROPS.length; i++) {
    var p = CLONE_PROPS[i];
    e[p] = touch[p] || CLONE_DEFAULTS[i];
  }
  e.type = type;
  e.target = getCanvas();
  e.currentTarget = getCanvas();
  e.buttons = typeToButtons(type);
  e.which = e.buttons;
  e.pointerId = (touch.identifier || 0) + 2;
  e.bubbles = true;
  e.cancelable = true; // e.detail = this.clickCount;
  e.button = 0;
  e.width = (touch.radiusX || 0.5) * 2;
  e.height = (touch.radiusY || 0.5) * 2;
  e.pressure = touch.force || 0.5;
  e.isPrimary = isPrimaryPointer(touch);
  e.pointerType = POINTER_TYPE; // forward modifier keys
  e.offsetX = touch.pageX | touch.x;
  e.offsetY = touch.pageY | touch.y;
  return e;
}

function typeToButtons(type) {
  let ret = 0;
  if (type === "touchstart" || type === "touchmove" || type === "pointerdown" || type === "pointermove") {
    ret = 1;
  }
  return ret;
}

let firstPointer = null;

function isPrimaryPointer(touch) {
  return firstPointer === touch.identifier;
}

function setPrimaryPointer(touch) {
  if (firstPointer === null) {
    firstPointer = touch.identifier;
  }
}

function removePrimaryPointer(touch) {
  if (firstPointer === touch.identifier) {
    firstPointer = null;
  }
}

function eventHandlerFactory(type) {
  return (rawEvent) => {
    const changedTouches = rawEvent.changedTouches || rawEvent.touches;
    for (let i = 0; i < changedTouches.length; i++) {
      const touch = changedTouches[i];
      switch (type) {
        case "pointerdown":
          i === 0 && setPrimaryPointer(touch);
          document.dispatchEvent(touchToPointer(type, touch));
          break;
        case "pointermove":
          document.dispatchEvent(touchToPointer(type, touch));
        case "pointerup":
          removePrimaryPointer(touch);
          document.dispatchEvent(touchToPointer(type, touch));
          document.dispatchEvent(touchToPointer("pointerout", touch));
          break;
        case "pointerout":
          removePrimaryPointer(touch);
          document.dispatchEvent(touchToPointer(type, touch));
          break;
        default:
          break;
      }
    }
  };
}

let dispatchPointerDown = eventHandlerFactory("pointerdown");
let dispatchPointerMove = eventHandlerFactory("pointermove");
let dispatchPointerUp = eventHandlerFactory("pointerup");
let dispatchPointerOut = eventHandlerFactory("pointerout");
export { dispatchPointerDown, dispatchPointerMove, dispatchPointerUp, dispatchPointerOut };
