import { ColorModel, Hex, HSL, ModelType, RGB } from '@/types';
import { capitalize } from '@/utils/misc';

const initState: HSL = {
  h: 0,
  s: 0,
  l: 0.5,
  a: 1,
  __type: ModelType.HSL,
};

export class ColorEngine {
  #state: HSL;

  constructor(state?: HSL) {
    this.#state = state ?? initState;
  }

  get state(): HSL {
    return this.#state;
  }

  set state(newState: ColorModel) {
    switch (newState.__type) {
      case ModelType.HSL:
        this.#state = newState;
        break;
      case ModelType.RGB:
        this.#state = this.rgbToHsl(newState);
        break;
      default:
        throw new NotSupportedError('Color model');
    }
  }

  /*
   * Conversion of HSL to RGB color model
   * Source: https://www.rapidtables.com/convert/color/hsl-to-rgb.html
   * H -> 0-360 range (degrees)
   * S -> 0-1 range (%)
   * L -> 0-1 range (%)
   */
  hslToRgb(color: HSL): RGB {
    const { h, s, l } = color;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c * 0.5;

    let _r = 0;
    let _g = 0;
    let _b = 0;

    if (h >= 0 && h < 60) {
      _r = c;
      _g = x;
      _b = 0;
    } else if (h >= 60 && h < 120) {
      _r = x;
      _g = c;
      _b = 0;
    } else if (h >= 120 && h < 180) {
      _r = 0;
      _g = c;
      _b = x;
    } else if (h >= 180 && h < 240) {
      _r = 0;
      _g = x;
      _b = c;
    } else if (h >= 240 && h < 300) {
      _r = x;
      _g = 0;
      _b = c;
    } else if (h >= 300 && h < 360) {
      _r = c;
      _g = 0;
      _b = x;
    }

    const r = Math.round((_r + m) * 255);
    const g = Math.round((_g + m) * 255);
    const b = Math.round((_b + m) * 255);

    return {
      r,
      g,
      b,
      __type: ModelType.RGB,
    };
  }

  /*
   * Conversion of RGB to HSL color model
   * Source: https://www.rapidtables.com/convert/color/rgb-to-hsl.html
   * (R, G, B) are integers, not decimals
   */
  rgbToHsl(color: RGB): HSL {
    const _r = color.r / 255;
    const _g = color.g / 255;
    const _b = color.b / 255;

    const cMax = Math.max(_r, _g, _b);
    const cMin = Math.min(_r, _g, _b);
    const delta = cMax - cMin;

    let h = 0;
    let s = 0;
    let l = 0;

    // Calculate hue
    if (delta === 0) {
      h = 0;
    } else if (cMax === _r) {
      h = 60 * (((_g - _b) / delta) % 6);
    } else if (cMax === _g) {
      h = 60 * ((_b - _r) / delta + 2);
    } else if (cMax === _b) {
      h = 60 * ((_r - _g) / delta + 4);
    }

    if (h < 0) {
      h += 360;
    }

    // Calculate lightness
    l = +((cMax + cMin) / 2).toFixed(2);

    if (l > 1) {
      l = 1;
    }

    // Calculate saturation
    if (delta === 0) {
      s = 0;
    } else {
      s = delta / (1 - Math.abs(2 * l - 1));
    }

    if (s > 1) {
      s = 1;
    }

    return {
      h,
      s,
      l,
      __type: ModelType.HSL,
    };
  }
  /*
   * Conversion of HSL to Hex color model
   * There's no direct conversion from HSL -> Hex. So we have RGB as the intermediate state
   */
  hslToHex(color: HSL): Hex {
    // SLIDER RESET BUG APPEARS HERE
    // RGB VALUE IS COMING SAME UNDER HSL -> RGB CONVERSION
    const rgb = this.hslToRgb(color);
    return this.rgbToHex(rgb);
  }

  /*
   * Conversion of RGB to Hex color model
   * They are the same format, only the base is different
   * RGB is base-10 ; Hex is base-16
   */
  rgbToHex(color: RGB): Hex {
    const hexR = color.r.toString(16).padStart(2, '0');
    const hexG = color.g.toString(16).padStart(2, '0');
    const hexB = color.b.toString(16).padStart(2, '0');

    const hex = `#${hexR}${hexG}${hexB}`;

    return hex;
  }

  /*
   * Conversion of Hex to RGB color model
   * They are the same format, only the base is different
   * Defaults to white in RGB in case of error
   * Source: https://stackoverflow.com/a/5624139
   */
  hexToRgb(hex: Hex): RGB {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (_m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
          __type: ModelType.RGB,
        }
      : {
          r: 255,
          g: 255,
          b: 255,
          __type: ModelType.RGB,
        };
  }
}

class NotSupportedError extends Error {
  constructor(entity: string) {
    super();
    this.name = 'NotSupportedError';
    this.message = `${capitalize(entity)} is not supported`;
  }
}
