/**  
 * ResearchFilter.tsx  
 *  
 * Tag-based filter bar for research works. Supports i18n labels.  
 */  
import { CheckCircle2, Tag } from 'lucide-react'
import React from 'react'
import { useI18n } from '../../i18n/I18nProvider'

/** Props for ResearchFilter. */
export interface ResearchFilterProps {
  /** Available tags to render, include 'All'. */
  tags: string[]
  /** Current selected tag. */
  selected: string
  /** Change handler. */
  onChange: (tag: string) => void
}

/**  
 * ResearchFilter  
 * Renders tag chips; clicking sets the active filter.  
 * Displays 'All' as localized text but keeps the value 'All' for logic.  
 */
const ResearchFilter: React.FC<ResearchFilterProps> = ({ tags, selected, onChange }) => {
  const { t } = useI18n()
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-300">
        <Tag className="h-4 w-4" aria-hidden />
        {t('actions.filter')}
      </span>
      {tags.map((tag) => {
        const active = tag === selected
        const display = tag === 'All' ? t('messages.all') : tag
        return (
          <button
            key={tag}
            onClick={() => onChange(tag)}
            className={[
              'inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm transition',
              active
                ? 'border-sky-600 bg-sky-600 text-white'
                : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800',
            ].join(' ')}
            aria-pressed={active}
          >
            {active ? <CheckCircle2 className="h-4 w-4" aria-hidden /> : null}
            <span>{display}</span>
          </button>
        )
      })}
    </div>
  )
}

export default ResearchFilter
