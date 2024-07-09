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
  // Parse the hex string to RGB components
  const f = parseInt(hex.slice(1), 16);
  let R = f >> 16;
  let G = (f >> 8) & 0xff;
  let B = f & 0xff;

  // Calculate the average to determine the grayness
  const avg = (R + G + B) / 3;

  // Function to adjust each color component
  const adjust = (color: number) => {
    if (color < avg) {
      // Decrease the component's value to increase saturation
      color -= ((avg - color) * percent) / 100;
      color = Math.max(0, color); // Ensure it doesn't go below 0
    } else {
      // Increase the component's value to increase saturation
      color += ((color - avg) * percent) / 100;
      color = Math.min(255, color); // Ensure it doesn't go above 255
    }
    return Math.round(color);
  };

  // Adjust each component
  R = adjust(R);
  G = adjust(G);
  B = adjust(B);

  // Convert back to hex and return
  return "#" + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
}
