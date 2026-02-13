import { ColorModel, HSL, ModelType, RGB } from '@/types';

import { ColorEngine } from './engine';

describe('ColorEngine', () => {
  const engine = new ColorEngine();

  const conversionTests: Array<Array<ColorModel>> = [
    [
      // Black
      { h: 0, s: 0, l: 0, __type: ModelType.HSL },
      { r: 0, g: 0, b: 0, __type: ModelType.RGB },
    ],
    [
      // White
      { h: 0, s: 0, l: 1, __type: ModelType.HSL },
      { r: 255, g: 255, b: 255, __type: ModelType.RGB },
    ],
    [
      // Red
      { h: 0, s: 1, l: 0.5, __type: ModelType.HSL },
      { r: 255, g: 0, b: 0, __type: ModelType.RGB },
    ],
    [
      // Green
      { h: 120, s: 1, l: 0.5, __type: ModelType.HSL },
      { r: 0, g: 255, b: 0, __type: ModelType.RGB },
    ],
    [
      // Blue
      { h: 240, s: 1, l: 0.5, __type: ModelType.HSL },
      { r: 0, g: 0, b: 255, __type: ModelType.RGB },
    ],
    [
      // Yellow
      { h: 60, s: 1, l: 0.5, __type: ModelType.HSL },
      { r: 255, g: 255, b: 0, __type: ModelType.RGB },
    ],
    [
      // Yellow
      { h: 60, s: 1, l: 0.5, __type: ModelType.HSL },
      { r: 255, g: 255, b: 0, __type: ModelType.RGB },
    ],
    [
      // Cyan
      { h: 180, s: 1, l: 0.5, __type: ModelType.HSL },
      { r: 0, g: 255, b: 255, __type: ModelType.RGB },
    ],
    [
      // Magenta
      { h: 300, s: 1, l: 0.5, __type: ModelType.HSL },
      { r: 255, g: 0, b: 255, __type: ModelType.RGB },
    ],
    [
      // Silver
      { h: 0, s: 0, l: 0.75, __type: ModelType.HSL },
      { r: 191, g: 191, b: 191, __type: ModelType.RGB },
    ],
    [
      // Gray
      { h: 0, s: 0, l: 0.5, __type: ModelType.HSL },
      { r: 128, g: 128, b: 128, __type: ModelType.RGB },
    ],
    [
      // Maroon
      { h: 0, s: 1, l: 0.25, __type: ModelType.HSL },
      { r: 128, g: 0, b: 0, __type: ModelType.RGB },
    ],
    [
      // Olive
      { h: 60, s: 1, l: 0.25, __type: ModelType.HSL },
      { r: 128, g: 128, b: 0, __type: ModelType.RGB },
    ],
    [
      // Green
      { h: 120, s: 1, l: 0.25, __type: ModelType.HSL },
      { r: 0, g: 128, b: 0, __type: ModelType.RGB },
    ],
    [
      // Purple
      { h: 300, s: 1, l: 0.25, __type: ModelType.HSL },
      { r: 128, g: 0, b: 128, __type: ModelType.RGB },
    ],
    [
      // Teal
      { h: 180, s: 1, l: 0.25, __type: ModelType.HSL },
      { r: 0, g: 128, b: 128, __type: ModelType.RGB },
    ],
    [
      // Navy
      { h: 240, s: 1, l: 0.25, __type: ModelType.HSL },
      { r: 0, g: 0, b: 128, __type: ModelType.RGB },
    ],
  ];

  describe('HSL to RGB Conversion', () => {
    conversionTests.forEach(([hsl, expected]) => {
      it('should convert hsl to rgb', () => {
        // Arrange

        // Act
        const rgb = engine.hslToRgb(hsl as HSL);

        // Assert
        expect(isSameColor(rgb, expected)).toBe(true);
      });
    });
  });

  describe('RGB to HSL Conversion', () => {
    conversionTests.forEach(([expected, rgb]) => {
      it('should convert rgb to hsl', () => {
        // Arrange

        // Act
        const hsl = engine.rgbToHsl(rgb as RGB);

        // Assert
        expect(isSameColor(hsl, expected)).toBe(true);
      });
    });
  });
});

function isSameColor(current: ColorModel, expected: ColorModel, tolerance = 0.01): boolean {
  if (current.__type !== expected.__type) return false;

  if (current.__type === ModelType.RGB && expected.__type === ModelType.RGB) {
    return (
      Math.abs(current.r - expected.r) <= tolerance &&
      Math.abs(current.g - expected.g) <= tolerance &&
      Math.abs(current.b - expected.b) <= tolerance
    );
  }

  if (current.__type === ModelType.HSL && expected.__type === ModelType.HSL) {
    return (
      Math.abs(current.h - expected.h) <= tolerance &&
      Math.abs(current.s - expected.s) <= tolerance &&
      Math.abs(current.l - expected.l) <= tolerance
    );
  }

  return false;
}
