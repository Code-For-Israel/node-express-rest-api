import he from '@/util/locales/he.json'
import { ReactNode, createContext, useState } from 'react'

type LocaleContextType = {
  locale: string
  translations: Record<string, string>
  setLocale: (locale: string) => void
}
export const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
  translations: {},
  setLocale: () => undefined,
})

type Props = {
  children: ReactNode
}
const LocaleProvider = ({ children }: Props) => {
  const [locale, setLocale] = useState('en')
  const translations = he
  return <LocaleContext.Provider value={{ locale, setLocale, translations }}>{children}</LocaleContext.Provider>
}

export default LocaleProvider
