// Single source of truth for the palette. Mirrors tailwind.config.js —
// components use these directly for inline styles (gradients, SVG, etc.)
// where a Tailwind class can't reach, and Tailwind classes (bg-paper,
// text-ink, ...) for everything else.

export const COLORS = {
  paper: '#FEFFF9',
  surface: '#F6F5EC',
  ink: '#1A1A1A',
  inkSoft: '#7A7A72',
  line: '#E4E2D6',
  lime: '#BFE93F',
  red: '#E8483C',
  orange: '#F2894A',
  amber: '#F5B833',
};
