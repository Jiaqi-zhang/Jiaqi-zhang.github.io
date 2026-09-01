/** Scroll after React has committed the page change and before the next paint. */
export function scrollToSection(sectionId: string) {
  window.requestAnimationFrame(() => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  })
}
