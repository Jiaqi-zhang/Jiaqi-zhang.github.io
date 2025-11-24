/**  
 * NewsList.tsx  
 *  
 * Vertical timeline for news items (date + text + optional link).  
 */  
import { Calendar, ExternalLink } from 'lucide-react'
import React from 'react'

/** A single news item entry. */
export interface NewsItem {
  /** ISO date string, e.g., 2025-05-01. */
  date: string
  /** News headline or summary. */
  title: string
  /** Optional external link. */
  link?: string
}

/**  
 * NewsList  
 * Renders a vertical timeline list of news items.  
 */
const NewsList: React.FC<{ items: NewsItem[] }> = ({ items }) => {
  return (
    // <ol className="relative border-l border-neutral-200 dark:border-neutral-800 pl-4">
    <ol className="relative pl-4">
      {items.map((item, idx) => (
        <li key={idx} className="mb-4 ml-2">
          {/* <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-neutral-900" /> */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
            <Calendar className="h-4 w-4" aria-hidden />
            <time dateTime={item.date} className="font-medium">
              {item.date}
            </time>
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-neutral-300 hover:decoration-sky-500 underline-offset-2"
              >
                {item.title} <ExternalLink className="inline-block h-3.5 w-3.5" aria-hidden />
              </a>
            ) : (
              <span>{item.title}</span>
            )}
          </div>
          
        </li>
      ))}
    </ol>
  )
}

export default NewsList
