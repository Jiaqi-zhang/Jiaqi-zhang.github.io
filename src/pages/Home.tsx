/**  
 * Home.tsx  
 *  
 * Researcher landing page composed of sections: About, News, Research, Projects, Gallery.  
 * Data of each section is sourced from a centralized config file.  
 * Includes tag-based research filtering and i18n UI.  
 */  
import React, { useMemo, useState } from 'react'
import AnchorNav from '../components/layout/AnchorNav'
import Section from '../components/common/Section'
import Hero from '../components/hero/Hero'
import NewsList from '../components/news/NewsList'
import ResearchList, { ResearchWork } from '../components/research/ResearchList'
import ResearchFilter from '../components/research/ResearchFilter'
import ProjectsGrid from '../components/projects/ProjectsGrid'
import GalleryMosaic from '../components/gallery/GalleryMosaic'
import AffiliationsRow from '../components/affiliations/AffiliationsRow'
import { useI18n } from '../i18n/I18nProvider'
import { profile, profileZh, news, works, projects, gallery, affiliations } from '../config/content'

/** Build unique tags from works (including All). */
function buildTags(works: ResearchWork[]): string[] {
  const set = new Set<string>()
  works.forEach((w) => w.tags.forEach((t) => set.add(t)))
  return ['All', ...Array.from(set)]
}

/**  
 * HomePage  
 * Main page with rich content and entrances.  
 */
export default function HomePage() {
  const { t, lang } = useI18n()

  // Select profile content based on current language
  const activeProfile = lang === 'zh' ? profileZh : profile

  const [selectedTag, setSelectedTag] = useState<string>('All')
  const tags = useMemo(() => buildTags(works), [])

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
      <AnchorNav />

      {/* About */}
      <div id="about" className="scroll-mt-20" />
      <Hero profile={activeProfile} />

      {/* News */}
      <Section id="news" title={t('sections.news.title')} subtitle={t('sections.news.subtitle')}>
        <NewsList items={news} />
      </Section>

      {/* Research */}
      <Section
        id="research"
        title={t('sections.research.title')}
        subtitle={t('sections.research.subtitle')}
      >
        <div className="mb-5">
          <ResearchFilter tags={tags} selected={selectedTag} onChange={setSelectedTag} />
        </div>
        <ResearchList works={works} selectedTag={selectedTag} />
      </Section>

      {/* Projects */}
      <Section id="projects" title={t('sections.projects.title')} subtitle={t('sections.projects.subtitle')}>
        <ProjectsGrid items={projects} />
      </Section>

      {/* Gallery */}
      <Section id="gallery" title={t('sections.gallery.title')} subtitle={t('sections.gallery.subtitle')}>
        <GalleryMosaic items={gallery} />
      </Section>

      {/* Affiliations */}
      <Section id="affiliations">
        <AffiliationsRow items={affiliations} />
      </Section>

      <footer className="mt-8 border-t border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 text-sm text-neutral-600 dark:text-neutral-400">
          © {new Date().getFullYear()} Dr. Zhang Jia-Qi. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
