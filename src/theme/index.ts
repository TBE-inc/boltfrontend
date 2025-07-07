import { colors, type ColorPalette } from './colors';
import { spacing, type SpacingTokens } from './spacing';
import { dimensions, type DimensionTokens } from './dimensions';
import { typography, type TypographyTokens } from './typography';

export interface Theme {
  colors: ColorPalette;
  spacing: SpacingTokens;
  dimensions: DimensionTokens;
  borderRadius: DimensionTokens['borderRadius'];
  typography: TypographyTokens;
}

export const theme: Theme = {
  colors,
  spacing,
  dimensions,
  borderRadius: dimensions.borderRadius,
  typography,
};

export { colors } from './colors';
export { spacing } from './spacing';
export { dimensions } from './dimensions';
export { typography } from './typography';
export type { ColorPalette } from './colors';
export type { SpacingTokens } from './spacing';
export type { DimensionTokens } from './dimensions';
export type { TypographyTokens } from './typography';