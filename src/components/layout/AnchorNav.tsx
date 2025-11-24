/**  
 * AnchorNav.tsx  
 *  
 * A sticky top navigation bar with in-page anchor links to main sections.  
 * Adds a language toggle button (EN/中文).  
 * Mobile: shows a compact quick menu button to jump to sections via popover.  
 */
import { Link } from 'react-router'
import { BookOpen, FolderGit2, GalleryHorizontal, Megaphone, User2, Globe, List } from 'lucide-react'
import * as Popover from '@radix-ui/react-popover'
import React from 'react'
import { useI18n } from '../../i18n/I18nProvider'
import { HashLink } from 'react-router-hash-link'

/** Props for AnchorNav (none for now). */
export interface AnchorNavProps {}

/**  
 * AnchorNav  
 * Renders a compact sticky top bar with anchor links, language toggle, and mobile quick menu.  
 */
const AnchorNav: React.FC<AnchorNavProps> = () => {
  const { lang, setLang, t } = useI18n()
  const items = [
    { id: 'about', label: t('nav.about'), icon: User2 },
    { id: 'news', label: t('nav.news'), icon: Megaphone },
    { id: 'research', label: t('nav.research'), icon: BookOpen },
    { id: 'projects', label: t('nav.projects'), icon: FolderGit2 },
    { id: 'gallery', label: t('nav.gallery'), icon: GalleryHorizontal },
  ]

  /** Toggle language between English and Chinese. */
  const toggleLang = () => setLang(lang === 'en' ? 'zh' : 'en')

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-white/70 dark:bg-neutral-900/70 border-b border-neutral-200 dark:border-neutral-800">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" className="text-base font-semibold tracking-wide">
          {t('brand')}
        </Link>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Desktop anchors */}
          <ul className="hidden sm:flex items-center gap-1">
            {items.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <HashLink smooth to={`#${id}`}
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  <span>{label}</span>
                </HashLink>
              </li>
            ))}
          </ul>

          {/* Mobile quick menu (popover) */}
          <Popover.Root>
            <Popover.Trigger asChild>
              <button
                type="button"
                aria-label={t('a11y.openMenu')}
                className="sm:hidden inline-flex items-center gap-1 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-2.5 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <List className="h-4 w-4" aria-hidden />
                <span>{/* Icon-only for compactness */}</span>
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                align="end"
                sideOffset={8}
                className="z-50 w-44 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-2 shadow-lg"
              >
                <ul className="flex flex-col">
                  {items.map(({ id, label, icon: Icon }) => (
                    <li key={id}>
                      <Popover.Close asChild>
                        <HashLink smooth to={`#${id}`}
                          className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
                        >
                          <Icon className="h-4 w-4" aria-hidden />
                          <span>{label}</span>
                        </HashLink>
                      </Popover.Close>
                    </li>
                  ))}
                </ul>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          {/* Language toggle */}
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t('a11y.switchLang')}
            className="inline-flex items-center gap-1 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-2.5 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <Globe className="h-4 w-4" aria-hidden />
            <span>{t('langToggle')}</span>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default AnchorNav
