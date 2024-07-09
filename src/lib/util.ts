export function changeBrightness(hex: string, percent: number) {
  const f = parseInt(hex.slice(1), 16),
    R = f >> 16,
    G = (f >> 8) & 0x00ff,
    B = f & 0x0000ff;
  const t = percent < 0 ? 0 : 255,
    p = Math.abs(percent),
    newR = Math.round((t - R) * p) + R,
    newG = Math.round((t - G) * p) + G,
    newB = Math.round((t - B) * p) + B;
  return "#" + (0x1000000 + newR * 0x10000 + newG * 0x100 + newB).toString(16).slice(1);
}

export function changeSaturation(hex: string, percent: number) {
  const f = parseInt(hex.slice(1), 16);
  let R = f >> 16;
  let G = (f >> 8) & 0xff;
  let B = f & 0xff;

  const avg = (R + G + B) / 3;

  const adjust = (color: number) => {
    if (color < avg) {
      color -= ((avg - color) * percent) / 100;
      color = Math.max(0, color);
    } else {
      color += ((color - avg) * percent) / 100;
      color = Math.min(255, color);
    }
    return Math.round(color);
  };

  R = adjust(R);
  G = adjust(G);
  B = adjust(B);

  return "#" + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
}
