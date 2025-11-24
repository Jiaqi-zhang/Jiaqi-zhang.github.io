/**
 * Section.tsx
 *
 * A semantic section wrapper with a contained top divider and compact spacing.
 * - The divider renders only within the effective content width (max-w-6xl),
 *   not across the full page width.
 * - Provides consistent heading styles and optional subtitle.
 * - If 'title' is omitted, the header area (and its margin) is not rendered.
 */

import React from 'react'

/** Props for Section container. */
export interface SectionProps {
  /** The anchor id used for in-page navigation. */
  id: string
  /** Optional section title. If omitted, header is hidden. */
  title?: string
  /** Optional short subtitle text. */
  subtitle?: string
  /** Content of the section. */
  children: React.ReactNode
  /** Optional class names for layout adjustments. */
  className?: string
}

/**
 * Section
 * Provides a contained divider inside the max content width and consistent paddings.
 */
const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, className }) => {
  return (
    <section
      id={id}
      className={['scroll-mt-20', className].filter(Boolean).join(' ')}
    >
      {/* Contained divider (inside effective width) */}
      <div className="mx-auto max-w-6xl">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="border-t border-neutral-200 dark:border-neutral-800" />
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {title ? (
          <header className="mb-5 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              {title}
            </h2>
            {id === 'research' && subtitle ? (
              <p className="mt-2 text-neutral-600 dark:text-neutral-300">{subtitle}</p>
            ) : null}
          </header>
        ) : null}
        {children}
      </div>
    </section>
  )
}

export default Section
