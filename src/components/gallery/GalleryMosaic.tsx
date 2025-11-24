/**
 * GalleryMosaic.tsx
 *
 * Displays images in a mosaic/grid layout with pagination and animations.
 */
import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { motion } from 'motion/react'
import { Dialog, DialogContent, DialogTrigger } from '../../components/ui/dialog'

export interface GalleryItem {
  srcKeyword: string
  alt: string
  imgPath: string
}

interface GalleryMosaicProps {
  items: GalleryItem[]
}

// Update to 8 to fit the 4-column layout (2 rows x 4 cols)
const PAGE_SIZE = 8

const GalleryMosaic: React.FC<GalleryMosaicProps> = ({ items }) => {
  const [page, setPage] = useState(0)
  
  const totalPages = Math.ceil(items.length / PAGE_SIZE)
  const start = page * PAGE_SIZE
  const visibleItems = items.slice(start, start + PAGE_SIZE)

  const handleNext = () => setPage((p) => Math.min(totalPages - 1, p + 1))
  const handlePrev = () => setPage((p) => Math.max(0, p - 1))

  return (
    <div className="space-y-6">
      <motion.div
        key={page}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 0.4, ease: 'easeOut' },
          },
        }}
        // lg:grid-cols-4 for 4 items per row
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {visibleItems.map((item, index) => {
          const src = item.imgPath
          
          return (
            <Dialog key={`${item.srcKeyword}-${index}`}>
              <DialogTrigger asChild>
                <motion.figure
                  // Unified animation: scale from 0.92 to 1 simultaneously
                  variants={{
                    hidden: { opacity: 0, scale: 0.92 },
                    visible: { 
                      opacity: 1, 
                      scale: 1, 
                      transition: { duration: 0.4, ease: 'easeOut' } 
                    },
                  }}
                  className="group relative aspect-square cursor-zoom-in overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800"
                >
                  <img
                    src={src}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="h-6 w-6 text-white drop-shadow-md" />
                  </div>
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium truncate block">{item.alt}</span>
                  </figcaption>
                </motion.figure>
              </DialogTrigger>
              <DialogContent className="max-w-3xl border-neutral-800 bg-black/95 p-1 text-neutral-50">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                  <img src={src} alt={item.alt} className="h-full w-full object-contain" />
                </div>
                <p className="px-4 pb-3 text-center text-sm text-neutral-400">{item.alt}</p>
              </DialogContent>
            </Dialog>
          )
        })}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={handlePrev}
            disabled={page === 0}
            className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  )
}

export default GalleryMosaic
