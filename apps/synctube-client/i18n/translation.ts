export const LOCALES = ['fr', 'en'] as const;

export type translationKeys = {
  search: string;
  connection: string;
};

export const translation: Record<typeof LOCALES[number], translationKeys> = {
  fr: {
    search: 'Rechercher une vidéo',
    connection: 'connexions',
  },
  en: {
    search: 'Search for a video',
    connection: 'connections',
  },
};
