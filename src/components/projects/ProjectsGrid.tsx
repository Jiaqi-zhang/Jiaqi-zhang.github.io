/**
 * ProjectsGrid.tsx
 *
 * Displays projects in a responsive grid with pagination and transition animations.
 */
import React, { useState } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight, FolderGit2 } from 'lucide-react'
import { motion } from 'motion/react'
import { useI18n } from '../../i18n/I18nProvider'

export interface ProjectItem {
  title: string
  description: string
  imageKeyword: string
  imgPath: string
  link: string
}

interface ProjectsGridProps {
  items: ProjectItem[]
}

// 3 columns layout, so page size 6 works best
const PAGE_SIZE = 6

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ items }) => {
  const { t } = useI18n()
  const [page, setPage] = useState(0)

  const totalPages = Math.ceil(items.length / PAGE_SIZE)
  const start = page * PAGE_SIZE
  const visibleItems = items.slice(start, start + PAGE_SIZE)

  const handleNext = () => setPage((p) => Math.min(totalPages - 1, p + 1))
  const handlePrev = () => setPage((p) => Math.max(0, p - 1))

  return (
    <div className="space-y-6">
      {/* Grid Container - lg:grid-cols-3 for 3 items per row */}
      <motion.div
        key={page}
        initial="hidden"
        animate="visible"
        // Container controls the overall visibility trigger
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 0.4, ease: 'easeOut' },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {visibleItems.map((item, index) => {
          const src = item.imgPath
          return (
            <motion.a
              key={`${item.title}-${index}`}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              // Individual items scale up from 0.92 to 1 to create the "center zoom" effect
              variants={{
                hidden: { opacity: 0, scale: 0.92 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.4, ease: 'easeOut' },
                },
              }}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:shadow-lg hover:border-sky-200 dark:hover:border-sky-900 transition-all"
            >
              <div className="relative h-48 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <img
                  src={src}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                {/* <div className="absolute bottom-3 left-4 text-white">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-2.5 py-1 text-xs font-medium">
                    <FolderGit2 className="h-3.5 w-3.5" />
                    <span>{t('actions.project')}</span>
                  </div>
                </div> */}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {item.title}
                  </h3>
                  <ArrowUpRight className="h-5 w-5 text-neutral-400 group-hover:text-sky-500 transition-colors" />
                </div>
                <p className="mt-2 flex-1 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
                <div className="mt-4 text-xs font-medium text-sky-600 dark:text-sky-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  {t('actions.visitProject')} &rarr;
                </div>
              </div>
            </motion.a>
          )
        })}
      </motion.div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={handlePrev}
            disabled={page === 0}
            className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous Page"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page >= totalPages - 1}
            className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next Page"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  )
}

export default ProjectsGrid
