export interface AboutRule {
  label: string;
  text: string;
}

export const aboutData = {
  badge: 'Manifesto',
  portraitLabel: 'CREATOR. DESTROYER.',
  headline: {
    line1: 'WE ARE',
    line2: 'CREATIVE',
    highlight: 'REBELS',
  },
  manifesto:
    'The web has become boring. Everything looks the same. Soft shadows, rounded corners, safe colors. We reject the generic. We build with hard lines, loud colors, and intentional friction.',
  rules: [
    { label: 'Rule 01', text: 'Function follows form. Make it scream before it speaks.' },
    { label: 'Rule 02', text: 'Contrast is king. If it doesn\'t pop, it\'s dead.' },
  ] as AboutRule[],
};
