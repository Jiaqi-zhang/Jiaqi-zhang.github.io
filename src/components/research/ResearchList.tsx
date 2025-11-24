/**  
 * ResearchList.tsx
 *
 * Displays research works as left-image, right-text cards with tags and links.
 * - Supports client-side pagination with Previous/Next controls.
 * - Shows pagination only when items exceed 2; page size = 2.
 * - Keeps image fully visible via object-contain and widens image column on larger screens.
 * - Uses motion for smooth filtering and pagination transitions.
 */

import parse, { domToReact } from 'html-react-parser'
import React, { useEffect, useMemo, useState } from 'react'
import { ExternalLink, FileText, PlayCircle, Code2, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useI18n } from '../../i18n/I18nProvider'

/** Research work type. */
export interface ResearchWork {
  id: string
  imgPath: string
  title: string
  authors: string
  venue: string
  year: number
  abstract?: string
  tags: string[]
  imageKeyword: string
  links?: {
    paper?: string
    code?: string
    video?: string
    project?: string
  }
  bibtex?: string
}

/** Props for the list. */
export interface ResearchListProps {
  works: ResearchWork[]
  selectedTag: string
}

/** Page size for research list. */
const PAGE_SIZE = 10

/** Max characters to display for abstract before truncating. Approximates 3 lines. */
const ABSTRACT_MAX_CHARS = 250

const HIGHLIGHT_IDS = new Set(['motionretargeting', 'HoughLaneNet', 'ReferColorization', 'activecolorization'])

/**
 * ResearchList
 * Filters by selectedTag, paginates, and renders the list.
 */
const ResearchList: React.FC<ResearchListProps> = ({ works, selectedTag }) => {
  const { t } = useI18n()
  const [page, setPage] = useState(0)

  /** Filter works by selected tag. */
  const filtered = useMemo(
    () => works.filter((w) => selectedTag === 'All' || w.tags.includes(selectedTag)),
    [works, selectedTag]
  )

  /** Reset to first page when data or filter changes. */
  useEffect(() => {
    setPage(0)
  }, [selectedTag, works])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageClamped = Math.min(page, totalPages - 1)
  useEffect(() => {
    if (page !== pageClamped) setPage(pageClamped)
  }, [pageClamped, page])

  const start = pageClamped * PAGE_SIZE
  const visible = filtered.slice(start, start + PAGE_SIZE)

  /** 
   * Handles opening the BibTeX content in a new tab as a simulated "text file".
   * Creates a Blob URL from the string content.
   */
  const openBibtex = (content: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
  }

  return (
    <div className="space-y-5">
      <AnimatePresence mode="popLayout" initial={false}>
        {visible.map((w) => {
          // Abstract truncation logic
          const abstractText = w.abstract || ''
          const isLongAbstract = abstractText.length > ABSTRACT_MAX_CHARS
          const displayAbstract = isLongAbstract 
            ? abstractText.slice(0, ABSTRACT_MAX_CHARS) 
            : abstractText

          return (
            <motion.article
              layout
              key={w.id}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-stretch gap-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image column - fixed height to ensure stable layout; wider on desktop. */}
              <div className="w-full sm:w-auto sm:flex-none sm:max-w-[45%] md:max-w-[40%] lg:max-w-[35%] bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center overflow-hidden">
                <img
                  src={w.imgPath}
                  alt={w.title}
                  className="block w-full h-auto sm:h-full sm:max-h-full sm:w-auto object-contain object-center"
                />
              </div>

              {/* Text/content column */}
              <div className="p-3 flex-1 flex flex-col min-h-0">
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">{w.title}</h3>
                <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">
                  {parse(w.authors || '', {
                    replace: (domNode: any) => {
                      if (!domNode) return
                      if (domNode.type === 'tag') {
                        const name = domNode.name
                        if (name === 'b') return <strong>{domToReact(domNode.children)}</strong>
                        if (name === 'u') return <u>{domToReact(domNode.children)}</u>
                        // For any other tag, strip the tag but keep its children/text
                        return <>{domToReact(domNode.children)}</>
                      }
                    },
                  })}
                </p>
                <p
                  className={`mt-1 text-sm italic text-neutral-600 dark:text-neutral-400 ${
                    HIGHLIGHT_IDS.has(w.id) ? 'font-bold text-sky-700 dark:text-sky-600' : ''
                  }`}
                >
                  {w.venue} · {w.year}
                </p>

                {/* Abstract display with prefix and See More link */}
                {w.abstract && (
                  <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    <span className="font-bold italic underline text-neutral-800 dark:text-neutral-200">Abstract:</span>{' '}
                    {displayAbstract}
                    {isLongAbstract && (
                      <>
                        ...{' '}
                        <a 
                          href={w.links?.paper || '#'} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center font-medium text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
                        >
                          See More
                        </a>
                      </>
                    )}
                  </p>
                )}
                
                <div className="mt-2 flex flex-wrap gap-2">
                  {w.links?.paper ? (
                    <a
                      href={w.links.paper}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    >
                      <FileText className="h-4 w-4" aria-hidden />
                      {t('actions.paper') || 'Paper'}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  ) : null}
                  {w.links?.code ? (
                    <a
                      href={w.links.code}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    >
                      <Code2 className="h-4 w-4" aria-hidden />
                      {t('actions.code') || 'Code'}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  ) : null}
                  {w.links?.video ? (
                    <a
                      href={w.links.video}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    >
                      <PlayCircle className="h-4 w-4" aria-hidden />
                      {t('actions.video') || 'Video'}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  ) : null}
                  {w.links?.project ? (
                    <a
                      href={w.links.project}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    >
                      {t('actions.project') || 'Project'}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  ) : null}
                  
                  {/* BibTeX Button */}
                  {w.bibtex ? (
                     <button
                       type="button"
                       onClick={() => openBibtex(w.bibtex!)}
                       className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors"
                     >
                       <Quote className="h-4 w-4" aria-hidden />
                       BibTeX
                     </button>
                  ) : null}
                </div>
              </div>
            </motion.article>
          )
        })}
      </AnimatePresence>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-neutral-600 dark:text-neutral-300"
        >
          {t('messages.noWorks')}
        </motion.p>
      ) : null}

      {/* Pagination - Circular buttons style matching ProjectsGrid */}
      {filtered.length > PAGE_SIZE ? (
        <nav className="flex items-center justify-center gap-4 pt-2" aria-label="Pagination">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={pageClamped === 0}
            aria-label="Previous Page"
            className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <span className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
            {pageClamped + 1} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={pageClamped >= totalPages - 1}
            aria-label="Next Page"
            className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </nav>
      ) : null}
    </div>
  )
}

export default ResearchList
