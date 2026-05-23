export const LITERATURE_CATEGORIES = [
  'Theoretical Philosophy',
  'Practical Philosophy',
] as const

export type LiteratureCategory = (typeof LITERATURE_CATEGORIES)[number]
