import zlib from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";

// Minimal PNG encoder (RGBA) + a tiny drawing routine for app icons.
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function encodePNG(width, height, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const raw = Buffer.alloc((width * 4 + 1) * height);
  let p = 0;
  for (let y = 0; y < height; y++) {
    raw[p++] = 0; // filter: none
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      raw[p++] = rgba[i];
      raw[p++] = rgba[i + 1];
      raw[p++] = rgba[i + 2];
      raw[p++] = rgba[i + 3];
    }
  }
  const idat = zlib.deflateSync(raw);
  return Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", idat), chunk("IEND", Buffer.alloc(0))]);
}

function draw(size, bg, fg, maskable) {
  const buf = new Uint8ClampedArray(size * size * 4);
  const set = (x, y, [r, g, b]) => {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    const i = (y * size + x) * 4;
    buf[i] = r; buf[i + 1] = g; buf[i + 2] = b; buf[i + 3] = 255;
  };
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) set(x, y, bg);

  const pad = maskable ? Math.round(size * 0.18) : Math.round(size * 0.22);
  const x0 = pad, y0 = pad, x1 = size - pad, y1 = size - pad;
  const r = (x1 - x0) / 2;
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  for (let y = y0; y <= y1; y++)
    for (let x = x0; x <= x1; x++) {
      const dx = x - cx, dy = y - cy;
      if (dx * dx + dy * dy <= r * r) set(x, y, fg);
    }
  return buf;
}

const OUT = new URL("../public/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

writeFileSync(OUT + "pwa-192x192.png", encodePNG(192, 192, draw(192, [15, 23, 42], [56, 189, 248], false)));
writeFileSync(OUT + "pwa-512x512.png", encodePNG(512, 512, draw(512, [15, 23, 42], [56, 189, 248], false)));
writeFileSync(OUT + "maskable-512x512.png", encodePNG(512, 512, draw(512, [15, 23, 42], [56, 189, 248], true)));
writeFileSync(OUT + "favicon.png", encodePNG(64, 64, draw(64, [15, 23, 42], [56, 189, 248], false)));
console.log("icons written to", OUT);
