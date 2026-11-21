// Decode the frames around the one just drawn off the main thread, so the next
// drawImage doesn't stall on a synchronous JPEG decode. A small window keeps
// memory in check (decoding every frame up front is hundreds of MB on mobile).
export function decodeNearbyFrames(frames: HTMLImageElement[], index: number, radius = 2): void {
  for (let k = -radius; k <= radius; k++) {
    const img = frames[index + k];
    if (k !== 0 && img?.complete && img.naturalWidth > 0) img.decode().catch(() => {});
  }
}

// Sizes a frame-sequence canvas's backing store. Frames are drawn with
// "cover", so the canvas never needs more pixels than the frames themselves
// have — matching devicePixelRatio (2–3x) only multiplies the fill cost.
// Returns true when the size changed (which also clears the canvas).
export function sizeFrameCanvas(canvas: HTMLCanvasElement, frames: HTMLImageElement[]): boolean {
  const cssW = canvas.offsetWidth;
  const cssH = canvas.offsetHeight;
  const dpr = window.devicePixelRatio || 1;

  const sample = frames.find((img) => img.complete && img.naturalWidth > 0);
  let ratio = dpr;
  if (sample && cssW > 0 && cssH > 0) {
    const coverScale = Math.max(cssW / sample.naturalWidth, cssH / sample.naturalHeight);
    // Frame pixels per CSS pixel, but never below 1x
    ratio = Math.min(dpr, Math.max(1, 1 / coverScale));
  }

  const width = Math.round(cssW * ratio);
  const height = Math.round(cssH * ratio);
  if (canvas.width === width && canvas.height === height) return false;
  canvas.width = width;
  canvas.height = height;
  return true;
}
