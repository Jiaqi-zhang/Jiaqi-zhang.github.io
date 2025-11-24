/** 
 * I18nProvider.tsx
 *
 * Minimal i18n context with persistent language and a simple t() function.
 * - Languages: 'en' | 'zh'
 * - Persists to localStorage, auto-detects browser language (zh -> 'zh', else 'en')
 * - Nested key access via dot notation, e.g., t('sections.news.title')
 */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

/** Supported language codes. */
export type Lang = 'en' | 'zh'

/** Shape of the i18n context. */
interface I18nContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Translate by key using dot notation. */
  t: (key: string) => string
}

/** Translation dictionary. Keep UI text here; content data can stay as-is. */
const dict = {
  en: {
    brand: 'Zhang Jia-Qi @ BUAA',
    nav: {
      about: 'About',
      news: 'News',
      research: 'Research',
      projects: 'Projects',
      gallery: 'Gallery',
    },
    actions: {
      email: 'Email',
      github: 'GitHub',
      scholar: 'Scholar',
      cv: 'CV',
      visitProject: 'Visit Project',
      filter: 'Filter',
      paper: 'Paper',
      code: 'Code',
      video: 'Video',
      project: 'Project',
    },
    sections: {
      news: {
        title: '🔥 News',
        subtitle: 'Latest updates and announcements.',
      },
      research: {
        title: '📝 Research',
        subtitle: '# These authors contributed equally.',
      },
      projects: {
        title: '💻 Projects',
        subtitle: 'Open-source and research-driven efforts.',
      },
      gallery: {
        title: '📸 Gallery',
        subtitle: 'Moments from research, travel and life.',
      },
      affiliations: {
        title: 'Affiliations',
        subtitle: 'Institutions I have been part of.',
      },
    },
    messages: {
      noWorks: 'No works under this tag.',
      all: 'All',
    },
    a11y: {
      switchLang: 'Switch language',
      openMenu: 'Open quick menu',
    },
    langToggle: '中文',
  },
  zh: {
    brand: '张加其 @ BUAA',
    nav: {
      about: '关于',
      news: '新闻',
      research: '研究',
      projects: '项目',
      gallery: '图库',
    },
    actions: {
      email: '邮箱',
      github: 'GitHub',
      scholar: '学术主页',
      cv: '简历',
      visitProject: '访问项目',
      filter: '筛选',
      paper: '论文',
      code: '代码',
      video: '视频',
      project: '项目页',
    },
    sections: {
      news: {
        title: '🔥 新闻',
        subtitle: '最新动态与公告。',
      },
      research: {
        title: '📝 研究',
        subtitle: '# 代表共同一作。',
      },
      projects: {
        title: '💻 项目',
        subtitle: '开源与研究驱动的项目。',
      },
      gallery: {
        title: '📸 图库',
        subtitle: '记录研究、出行和生活瞬间。',
      },
      affiliations: {
        title: '就读/任职机构',
        subtitle: '我曾就读或任职的机构。',
      },
    },
    messages: {
      noWorks: '该标签下暂无成果。',
      all: '全部',
    },
    a11y: {
      switchLang: '切换语言',
      openMenu: '打开快速菜单',
    },
    langToggle: 'EN',
  },
} as const

/** Safely get nested value from dict by key path, fallback to key itself. */
function get(dictObj: any, path: string): string {
  const parts = path.split('.')
  let cur = dictObj
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in cur) cur = cur[p]
    else return path
  }
  return typeof cur === 'string' ? cur : path
}

const I18nContext = createContext<I18nContextValue | null>(null)

/** Choose initial language: localStorage -> browser -> 'en'. */
function getInitialLang(): Lang {
  const fromStorage = typeof window !== 'undefined' ? (localStorage.getItem('lang') as Lang | null) : null
  if (fromStorage === 'en' || fromStorage === 'zh') return fromStorage
  if (typeof navigator !== 'undefined') {
    const nav = (navigator.language || '').toLowerCase()
    if (nav.startsWith('zh')) return 'zh'
  }
  return 'en'
}

/** I18nProvider: holds current language and a t() function. */
export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(getInitialLang)

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang)
    } catch {
      // ignore
    }
  }, [lang])

  const t = useMemo(() => {
    return (key: string) => get(dict[lang], key)
  }, [lang])

  const setLang = (l: Lang) => setLangState(l)

  const value = useMemo<I18nContextValue>(() => ({ lang, setLang, t }), [lang, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

/** Hook to access i18n context. */
export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
