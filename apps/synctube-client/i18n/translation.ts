export const LOCALES = ['fr', 'en'] as const;

export type translationKeys = {
  search: string;
  connection: string;
  login: {
    welcome: string;
    explanation: string;
    googleText: string;
    error: string;
  };
};

export const translation: Record<typeof LOCALES[number], translationKeys> = {
  fr: {
    search: 'Rechercher une vidéo',
    connection: 'connexions',
    login: {
      welcome: 'Bienvenue sur',
      explanation:
        "Pour accéder à toutes les fonctionnalités de l'application, veuillez vous connecter avec votre compte Google.",
      googleText: 'Se connecter avec Google',
      error:
        "Nous n'avons pas pu nous connecter à votre compte Google. Veuillez vérifier que vous avez accepté les pop-ups et les cookies pour ce site.",
    },
  },
  en: {
    search: 'Search for a video',
    connection: 'connections',
    login: {
      welcome: 'Welcome to',
      explanation:
        'To access all the features of the application, please sign in with your Google account',
      googleText: 'Connect with Google',
      error:
        'We were unable to log into your Google Account. Please verify that you have accepted pop-ups and cookies for this site',
    },
  },
};
