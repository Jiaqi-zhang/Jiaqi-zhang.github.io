/** 
 * AffiliationsRow.tsx
 *
 * A responsive, centered logo row for institutions/organizations.
 * - Uses Flexbox with justify-center to ensure logos are always centered on the page,
 *   regardless of screen width or number of items.
 * - Logos are contained and centered within fixed-height boxes.
 */

import React from 'react'

/** Single affiliation logo item. */
export interface AffiliationItem {
  /** Organization/School name for accessibility. */
  name: string
  /** Logo image URL. Prefer real URLs; otherwise use sider.ai smart placeholder. */
  src: string
  /** Optional link to the organization page. */
  href?: string
}

/** Props for AffiliationsRow. */
export interface AffiliationsRowProps {
  /** List of logos to render. */
  items: AffiliationItem[]
  /**
   * Optional: override the default responsive heights for the logo boxes.
   * Example: "h-10 sm:h-12 md:h-14 lg:h-16"
   */
  heightClasses?: string
}

/**
 * AffiliationsRow
 * Renders organization logos in a centered, responsive flex row.
 */
const AffiliationsRow: React.FC<AffiliationsRowProps> = ({ items, heightClasses }) => {
  // Default fixed heights per breakpoint to keep a tidy, consistent row height.
  // Increase only mobile (base/sm) sizes; keep md/lg (desktop) unchanged.
  // Original md/lg were `md:h-16 lg:h-20` — keep those values for large screens.
  const boxHeights = heightClasses || 'h-20 sm:h-24 md:h-28 lg:h-32'

  return (
    <div className="w-full">
      {/* 
        Flex container:
        - flex-wrap: Allows wrapping on very small screens if needed.
        - justify-center: Key property to keep items centered horizontally in the viewport.
        - items-center: Vertically aligns logos if they have different aspect ratios.
        - gap: Provides consistent spacing between logos.
      */}
      <ul className="mx-auto flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16 px-4">
        {items.map((item, idx) => {
          const content = (
            /* 
              Logo box:
              - Fixed responsive height via boxHeights.
              - Centered both horizontally and vertically.
            */
            <div className={['flex items-center justify-center', boxHeights].join(' ')}>
              <img
                src={item.src}
                alt={item.name}
                className="max-h-full w-auto object-contain block max-w-[100%] sm:max-w-[100%] md:max-w-[260px] lg:max-w-[260px]"
                loading="lazy"
              />
            </div>
          )

          return (
            <li key={idx} className="shrink-0">
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block hover:opacity-80 transition-opacity"
                >
                  {content}
                </a>
              ) : (
                content
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default AffiliationsRow
