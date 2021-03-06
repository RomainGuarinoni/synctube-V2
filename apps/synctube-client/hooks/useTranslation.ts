import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
  translation as AppTranslation,
  translationKeys,
  LOCALES,
} from '../i18n/translation';

export function useTranslation(): translationKeys {
  const router = useRouter();

  const locale = router.locale as string;

  const [translation, setTranslation] = useState<translationKeys>(
    AppTranslation[locale as typeof LOCALES[number]],
  );

  useEffect(() => {
    setTranslation(AppTranslation[locale as typeof LOCALES[number]]);
  }, [locale]);

  return translation;
}
