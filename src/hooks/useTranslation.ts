import { useAuthStore } from '@/store/authStore'
import { translations } from '@/lib/i18n'

export function useTranslation() {
  const lang = useAuthStore((s) => s.selectedLanguage)
  return translations[lang] ?? translations.en
}
