import { Theme } from "@/types";

export const themes: Theme[] = [
  {
    key: 'modern-blue',
    name: 'Modern Blue',
    vars: {
      '--primary': '#1E40AF',
      '--accent': '#60A5FA',
      '--bg': '#FFFFFF',
      '--text': '#0F172A',
    },
  },
  {
    key: 'minimal-light',
    name: 'Minimal Light',
    vars: {
      '--primary': '#111827',
      '--accent': '#374151',
      '--bg': '#FFFFFF',
      '--text': '#111827',
    },
  },
  {
    key: 'earth-tone',
    name: 'Earth Tone',
    vars: {
      '--primary': '#355E3B',
      '--accent': '#A67C52',
      '--bg': '#FEF9F3',
      '--text': '#2D2D2D',
    },
  },
  {
    key: 'dark-contrast',
    name: 'Dark Contrast',
    vars: {
      '--primary': '#0F172A',
      '--accent': '#06B6D4',
      '--bg': '#0B1220',
      '--text': '#E6F0FF',
    },
  },
  {
    key: 'sunset',
    name: 'Sunset',
    vars: {
      '--primary': '#FF6B6B',
      '--accent': '#FFD166',
      '--bg': '#FFF8F0',
      '--text': '#3B3B3B',
    },
  },
];


export default themes;