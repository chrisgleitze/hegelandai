export const LITERATURE_CATEGORIES = [
  'Theoretical Philosophy',
  'Practical Philosophy',
] as const

export type LiteratureCategory = (typeof LITERATURE_CATEGORIES)[number]

export const LITERATURE_TOPICS = [
  'Dialectics & Negativity',
  'Recognition & Intersubjectivity',
  'Philosophy of Mind & Subjectivity',
  'Life, Organism & Embodiment',
  'Language, Inferentialism & Spirit',
  'Cybernetics, Recursivity & Computation',
  'Philosophy of Technology & Media',
  'Aesthetics & Cultural AI',
  'AI Ethics & Alignment',
  'Moral Agency & Responsibility',
  'Objective Spirit, Institutions & Governance',
  'Social Freedom & Ethical Life',
  'Labor, Automation & Political Economy',
  'Recognition, Bias & Social Robots',
  'Education & Human-AI Practice',
] as const

export type LiteratureTopic = (typeof LITERATURE_TOPICS)[number]

export const TOPICS_BY_CATEGORY: Record<LiteratureCategory, LiteratureTopic[]> = {
  'Theoretical Philosophy': [
    'Dialectics & Negativity',
    'Recognition & Intersubjectivity',
    'Philosophy of Mind & Subjectivity',
    'Life, Organism & Embodiment',
    'Language, Inferentialism & Spirit',
    'Cybernetics, Recursivity & Computation',
    'Philosophy of Technology & Media',
    'Aesthetics & Cultural AI',
  ],
  'Practical Philosophy': [
    'AI Ethics & Alignment',
    'Moral Agency & Responsibility',
    'Objective Spirit, Institutions & Governance',
    'Social Freedom & Ethical Life',
    'Labor, Automation & Political Economy',
    'Recognition, Bias & Social Robots',
    'Education & Human-AI Practice',
  ],
}
