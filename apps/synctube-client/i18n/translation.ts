export const LOCALES = ['fr', 'en'] as const;

export type translationKeys = {
  search: string;
  connection: string;
  login: {
    welcome: string;
    explanation: string;
    googleText: string;
    errors: {
      scope: string;
      internal: string;
    };
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
      errors: {
        scope:
          "Tous les champs d'application de l'application synctube n'ont pas été acceptés, veuillez vous connecter à nouveau.",
        internal:
          "Une erreur interne s'est produite, veuillez réessayer plus tard.",
      },
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
      errors: {
        scope:
          'All scopes of the synctube application have not been accepted, please log in again',
        internal: 'An internal error has occurred, please try again later',
      },
    },
  },
};
