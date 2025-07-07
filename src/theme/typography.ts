export interface TypographyTokens {
  fontWeights: {
    heading1: number;
    heading2: number;
    heading3: number;
    body: number;
    caption: number;
    button: number;
  };
  fontFamily: {
    primary: string;
  };
}

export const typography: TypographyTokens = {
  fontWeights: {
    heading1: 700,  // Bold
    heading2: 600,  // SemiBold
    heading3: 500,  // Medium
    body: 400,      // Regular
    caption: 300,   // Light
    button: 500,    // Medium
  },
  fontFamily: {
    primary: 'Poppins, system-ui, sans-serif',
  },
};