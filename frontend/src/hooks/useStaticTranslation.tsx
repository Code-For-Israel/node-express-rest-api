import { LocaleContext } from '@/context/LocaleProvider'
import { useContext } from 'react'

const useStaticTranslation = () => {
  const { locale, setLocale, activeLang } = useContext(LocaleContext)

  const t = (key: string, variables?: { [key: string]: string | number }) => {
    let translation = activeLang[key] || key

    if (variables) {
      for (const [variable, value] of Object.entries(variables)) {
        translation = translation.replace(`{{${variable}}}`, String(value))
      }
    }

    return translation
  }

  return {
    t,
    locale,
    setLocale,
  }
}

export default useStaticTranslation
