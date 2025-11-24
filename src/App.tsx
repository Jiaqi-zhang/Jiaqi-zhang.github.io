import { HashRouter, Route, Routes } from 'react-router'
import HomePage from './pages/Home'
import { I18nProvider } from './i18n/I18nProvider'

/**
 * App.tsx
 *
 * Root app with router and global providers.
 */
export default function App() {
  return (
    <I18nProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </HashRouter>
    </I18nProvider>
  )
}
