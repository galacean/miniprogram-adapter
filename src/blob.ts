export class Blob {
  /**
   *
   * @param buffers only support zero index
   * @param type mimetype image/png image/webp...
   */
  constructor(public readonly buffers: ArrayBuffer[], public readonly type: any) {}

  arraybuffer(): Promise<ArrayBuffer> {
    return Promise.resolve(this.buffers[0]);
  }

  stream() {
    throw "not implemented";
  }

  text() {
    throw "not implemented";
  }

  slice(start?: number, end?: number, contentType?: string) {
    throw "not implemented";
  }
}
