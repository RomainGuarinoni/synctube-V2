export const LOCALES = ['fr', 'en'] as const;

export type translationKeys = {
  search: string;
  connection: string;
  profil: {
    logout: string;
  };
  login: {
    welcome: string;
    explanation: string;
    googleText: string;
    errors: {
      scope: string;
      internal: string;
    };
  };
  searchLocation: {
    youtube: string;
    history: string;
    favourite: string;
  };
  searchResult: {
    noMoreResult: string;
  };
  videoDetail: {
    description: string;
    watch: string;
    favourite: string;
  };
  toast: {
    videoAddedToFavourite: string;
    emptySearch: string;
  };
};

export const translation: Record<typeof LOCALES[number], translationKeys> = {
  fr: {
    search: 'Rechercher une vidéo',
    connection: 'connexions',
    profil: { logout: 'Se déconnecter' },
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
    searchLocation: {
      youtube: 'Youtube',
      history: 'Historique',
      favourite: 'Favoris',
    },
    searchResult: {
      noMoreResult: 'Fin des résultats de recherche',
    },
    videoDetail: {
      description: 'Description',
      watch: 'Regarder',
      favourite: 'Favoris',
    },
    toast: {
      videoAddedToFavourite: 'Vidéo ajouté à vos favoris',
      emptySearch: 'Veuillez remplir un contenu avant de faire une recherche',
    },
  },
  en: {
    search: 'Search for a video',
    connection: 'connections',
    profil: { logout: 'Logout' },
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
    searchLocation: {
      youtube: 'Youtube',
      history: 'History',
      favourite: 'Favourite',
    },
    searchResult: {
      noMoreResult: 'No more results',
    },
    videoDetail: {
      description: 'Description',
      watch: 'Watch',
      favourite: 'Favourite',
    },
    toast: {
      videoAddedToFavourite: 'Video added to your favourite',
      emptySearch: 'Please fill in a content before doing a search',
    },
  },
};
