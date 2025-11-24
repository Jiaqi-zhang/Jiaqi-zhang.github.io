/**  
 * Hero.tsx  
 *  
 * Researcher hero section with avatar, name, title, affiliation and contacts.  
 * Buttons (Email/GitHub/Scholar/CV) are shown as icon-only under the avatar.  
 * Mobile: avatar and buttons centered; Desktop: left-aligned.  
 */
import parse from 'html-react-parser'
import { domToReact } from 'html-react-parser'
import { SiGooglescholar, SiOrcid, SiResearchgate } from 'react-icons/si'
import { Github, Mail, MapPin, FileText } from 'lucide-react'
import React from 'react'
import { useI18n } from '../../i18n/I18nProvider'

/** Structure for a single research interest item. */
export interface ResearchInterest {
  label: string
  description?: string
}

/** Basic profile data structure. */
export interface Profile {
  /** Full name. */
  name: string
  /** Academic/Job title. */
  title: string
  /** Affiliation info. */
  affiliation: string
  /** Location string. */
  location: string
  /** Short bio/intro. */
  bio: string
  /** Optional list of research interests/focus areas. */
  interests?: ResearchInterest[]
  /** Email address. */
  email: string
  /** Links for external profiles. */
  links?: {
    scholar?: string
    orcid?: string
    researchgate?: string
    github?: string
    cv?: string
  }
  /** Avatar image keyword for placeholder. */
  avatarKeyword?: string
  avatarPath?: string
}

/** Small round icon button props. */
interface IconButtonProps {
  /** Link URL; supports http(s) and mailto. */
  href: string
  /** Accessible label and title for the icon-only button. */
  label: string
  /** Icon to render. */
  children: React.ReactNode
  /** Optional inline style applied to the icon element (fontSize, color, etc). */
  iconStyle?: React.CSSProperties
}

/**
 * IconButton
 * Icon-only button without border/background.
 * - Keeps strong focus-visible ring for a11y.
 * - Hover: scales the icon smoothly (no layout shift).
 */
const IconButton: React.FC<IconButtonProps> = ({ href, label, children, iconStyle }) => {
  const isExternal = href.startsWith('http')
  const base =
    'group inline-flex h-10 w-10 items-center justify-center rounded-full ' +
    'text-neutral-700 dark:text-neutral-200 hover:text-sky-600 dark:hover:text-sky-400 ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      aria-label={label}
      title={label}
      className={base}
    >
      {/* Wrapper used to scale icon on hover without affecting layout */}
      <span className="transition-transform duration-200 ease-out group-hover:scale-110">
        {React.isValidElement(children)
          ? React.cloneElement(
              children as React.ReactElement,
              ( {
                style: { ...(children as any).props?.style, ...iconStyle },
                className: (children as any).props?.className,
              } as any ),
            )
          : children}
      </span>
    </a>
  )
}

/**  
 * Hero  
 * Displays top-of-page profile summary with avatar, actions (icons), and textual info.  
 */
const Hero: React.FC<{ profile: Profile }> = ({ profile }) => {
  const { t } = useI18n()
  // Static demo avatar; replace with real URL if available.
  // const avatarSrc = `https://pub-cdn.sider.ai/u/U0E5H6ZV1Y/web-coder/68c1399a70ddcc6cca3cb9c7/resource/07ec2252-879d-4693-a298-dce18751956b.jpg`
  const avatarSrc = profile.avatarPath

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8 pb-6">
      <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
        {/* Left column: avatar + icon-only actions */}
        <div className="flex w-full sm:w-auto flex-col items-center sm:items-start gap-3">
          <div className="relative h-28 w-28 sm:h-36 sm:w-36 overflow-hidden rounded-full shadow-xl ring-1 ring-neutral-200 dark:ring-neutral-800">
            <img src={avatarSrc} alt={profile.name} className="h-full w-full object-cover" />
          </div>

          {/* Separator line matching avatar width */}
          <div className="h-px w-28 sm:w-36 bg-neutral-200 dark:bg-neutral-700 mt-4" />


          {/* Icon buttons under avatar
            - Flow horizontally, wrap to next line when needed
            - Center each row and limit rows to at most 3 icons by constraining max-width */}
          {/* Single icon row: mobile uses full width (one line); >=sm constrained to avatar width so icons wrap into two rows */}
          <div className="flex w-full flex-wrap justify-center gap-3 max-w-full sm:max-w-[9rem] mt-4 sm:justify-start">
            {profile.links?.scholar ? (
              <IconButton href={profile.links.scholar} label={t('actions.scholar')} iconStyle={{ color: '#4285f4' }}>
                <SiGooglescholar className="h-10 w-10" aria-hidden />
              </IconButton>
            ) : null}

            {profile.links?.orcid ? (
              <IconButton href={profile.links.orcid} label="ORCID" iconStyle={{ color: '#9ece7a' }}>
                <SiOrcid className="h-10 w-10" aria-hidden />
              </IconButton>
            ) : null}

            {profile.links?.researchgate ? (
              <IconButton href={profile.links.researchgate} label="ResearchGate" iconStyle={{ color: '#00D0BB' }}>
                <SiResearchgate className="h-10 w-10" aria-hidden />
              </IconButton>
            ) : null}

            {profile.links?.github ? (
              <IconButton href={profile.links.github} label={t('actions.github')} iconStyle={{ color: '#171515' }}>
                <Github className="h-10 w-10" aria-hidden />
              </IconButton>
            ) : null}

            {profile.links?.cv ? (
              <IconButton href={profile.links.cv} label={t('actions.cv')} iconStyle={{ color: '#bd5d38' }}>
                <FileText className="h-10 w-10" aria-hidden />
              </IconButton>
            ) : null}

            {profile.links?.cv ? (
              <IconButton href={`mailto:${profile.email}`} label={t('actions.email')} iconStyle={{ color: '#635050' }}>
                <Mail className="h-10 w-10" aria-hidden />
              </IconButton>
            ) : null}

            
            
          </div>
        </div>

        {/* Right column: textual info */}
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            {profile.name}
          </h1>
          <p className="mt-2 text-neutral-700 dark:text-neutral-200">
            {profile.title} · {profile.affiliation}
          </p>
          <p className="mt-2 inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-300">
            <MapPin className="h-4 w-4" aria-hidden />
            <span className="font-bold">{profile.location}</span>
            <span className="mx-2 text-neutral-600">|</span>
            <Mail className="h-4 w-4" aria-hidden />
            <span className="font-bold">{profile.email}</span>
          </p>

          <p className="mt-4 text-neutral-700 dark:text-neutral-200 leading-relaxed">
            {parse(profile.bio, {
              replace: (domNode) => {
                if (
                  domNode.type === 'tag' &&
                  domNode.name === 'a' &&
                  'attribs' in domNode
                ) {
                  const el = domNode as any
                  return (
                    <a
                      href={el.attribs.href}
                      className="text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300 hover:underline"
                      target={el.attribs.target || '_blank'}
                      rel="noopener noreferrer"
                    >
                      {domToReact(el.children)}
                    </a>
                  )
                }
              },
            })}
          </p>

          {/* Research Interests Block (Gray Background) */}
          {profile.interests && profile.interests.length > 0 && (
            <div className="mt-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/60 p-3 text-sm border border-neutral-200/50 dark:border-neutral-800">
              <ul className="space-y-2.5">
                {profile.interests.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500 dark:bg-sky-400" />
                    <span className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      <strong className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {item.label}
                      </strong>
                      {item.description && (
                        <>
                          <span className="mx-1.5 text-neutral-400">|</span>
                          {item.description}
                        </>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/** Simple book icon (fallback for scholar). */
const BookOpenIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" className="text-current" aria-hidden>
    <path
      fill="currentColor"
      d="M3 4.5A2.5 2.5 0 0 1 5.5 2H12v17H6a3 3 0 0 0-3 3V4.5Zm18 0V22a3 3 0 0 0-3-3h-6V2h6A2.5 2.5 0 0 1 21 4.5Z"
    />
  </svg>
)

export default Hero
