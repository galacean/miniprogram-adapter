import { btoa } from "./atob";
import { Blob } from "./blob";

export class URL {
  /**
   * fake createObject, use base64 instead
   * @param blob
   */
  static createObjectURL(blob: Blob) {
    const buffer = blob.buffers[0];
    const type = blob.type;
    const base64 = _arrayBufferToBase64(buffer);
    const prefix = `data:${type};base64, `;
    return prefix + base64;
  }
}

function _arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
