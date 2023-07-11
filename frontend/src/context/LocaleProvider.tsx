import ar from '@/util/locales/ar.json'
import he from '@/util/locales/he.json'
import { ReactNode, createContext, useState } from 'react'

type LocaleContextType = {
  locale: string
  activeLang: Record<string, string>
  setLocale: (locale: string) => void
}
export const LocaleContext = createContext<LocaleContextType>({
  locale: 'he',
  activeLang: {},
  setLocale: () => undefined,
})

type Props = {
  children: ReactNode
}

const LocaleProvider = ({ children }: Props) => {
  const [locale, setLocale] = useState('he')
  const activeLang = locale === 'he' ? he : ar

  return <LocaleContext.Provider value={{ locale, setLocale, activeLang }}>{children}</LocaleContext.Provider>
}

export default LocaleProvider
