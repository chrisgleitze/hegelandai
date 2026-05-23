import fs from 'fs'
import path from 'path'

import {
  LITERATURE_CATEGORIES,
  type LiteratureCategory,
} from '@/lib/literatureCategories'

export type LiteratureLink = {
  label: string
  href: string
}

export type LiteratureEntry = {
  id: string
  number: number
  title: string
  type: string
  categories: LiteratureCategory[]
  sourcesLabel: string
  sources: LiteratureLink[]
  summary: string
}

export type LiteratureSection = {
  id: string
  eyebrow: string
  title: string
  entries: LiteratureEntry[]
}

export type LiteratureData = {
  title: string
  sections: LiteratureSection[]
  totalEntries: number
}

const SOURCE_FILE = 'HEGEL_AI_LITERATURE_2026_claude.md'
const SOURCE_LABELS = [
  'Full text',
  'Publisher / Source',
  'Full text / Source',
  'Source / Full text',
  'Source',
]

function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function stripMarkdown(input: string): string {
  return input
    .replace(/\[([^\]]+)]\((https?:\/\/[^)]+)\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/\s*\([^)]*(?:DOI|ISBN)[^)]*\)/gi, '')
    .trim()
}

function extractLinks(input: string): LiteratureLink[] {
  return Array.from(input.matchAll(/\[([^\]]+)]\((https?:\/\/[^)]+)\)/g)).map(
    (match) => ({
      label: stripMarkdown(match[1]).replace(/\s*\([^)]*\)/g, '').trim(),
      href: match[2],
    }),
  )
}

function getField(lines: string[], label: string): string {
  const prefix = `**${label}:**`
  const line = lines.find((candidate) => candidate.trim().startsWith(prefix))
  if (!line) return ''
  return line.trim().slice(prefix.length).trim()
}

function isLiteratureCategory(input: string): input is LiteratureCategory {
  return LITERATURE_CATEGORIES.some((category) => category === input)
}

function parseCategories(input: string): LiteratureCategory[] {
  return input
    .split(/[;,]/)
    .map((category) => category.trim())
    .filter(isLiteratureCategory)
}

function parseEntry(
  number: number,
  title: string,
  lines: string[],
): LiteratureEntry {
  const type = getField(lines, 'Type')
  const categories = parseCategories(getField(lines, 'Category'))
  const summary = getField(lines, 'Summary')
  const sourcesLabel =
    SOURCE_LABELS.find((label) => getField(lines, label).length > 0) ?? 'Source'
  const sources = extractLinks(getField(lines, sourcesLabel))

  return {
    id: `entry-${number}-${slugify(stripMarkdown(title)).slice(0, 54)}`,
    number,
    title,
    type,
    categories,
    sourcesLabel,
    sources,
    summary,
  }
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function inlineMarkdownToHtml(input: string): string {
  let html = escapeHtml(input)

  html = html.replace(
    /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noreferrer">$1</a>',
  )
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>')

  return html
}

export function getLiteratureData(): LiteratureData {
  const markdownPath = path.join(process.cwd(), SOURCE_FILE)
  const markdown = fs.readFileSync(markdownPath, 'utf8')
  const lines = markdown.split(/\r?\n/)

  const sections: LiteratureSection[] = []
  let activeSection: LiteratureSection | null = null
  let activeEntry:
    | {
        number: number
        title: string
        lines: string[]
      }
    | null = null

  const flushEntry = () => {
    if (!activeSection || !activeEntry) return
    activeSection.entries.push(
      parseEntry(activeEntry.number, activeEntry.title, activeEntry.lines),
    )
    activeEntry = null
  }

  for (const line of lines) {
    const sectionMatch = line.match(/^##\s+(.+)$/)
    if (sectionMatch) {
      flushEntry()
      const heading = sectionMatch[1].trim()

      if (heading.startsWith('A.')) {
        activeSection = {
          id: 'books',
          eyebrow: 'A',
          title: heading.replace(/^A\.\s*/, ''),
          entries: [],
        }
        sections.push(activeSection)
        continue
      }

      if (heading.startsWith('B.')) {
        activeSection = {
          id: 'articles',
          eyebrow: 'B',
          title: heading.replace(/^B\.\s*/, ''),
          entries: [],
        }
        sections.push(activeSection)
        continue
      }

      activeSection = null
      continue
    }

    const entryMatch = line.match(/^###\s+(\d+)\.\s+(.+)$/)
    if (entryMatch && activeSection) {
      flushEntry()
      activeEntry = {
        number: Number(entryMatch[1]),
        title: entryMatch[2].trim(),
        lines: [],
      }
      continue
    }

    if (activeEntry) {
      activeEntry.lines.push(line)
      continue
    }
  }

  flushEntry()

  return {
    title: 'Hegel and AI',
    sections,
    totalEntries: sections.reduce(
      (total, section) => total + section.entries.length,
      0,
    ),
  }
}
