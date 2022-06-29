export const LOCALES = ['fr', 'en'] as const;

export type translationKeys = {
  search: string;
  connection: string;
  profil: {
    logout: string;
  };
  errors: {
    internal: string;
  };
  login: {
    welcome: string;
    explanation: string;
    googleText: string;
    errors: {
      scope: string;
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
  room: {
    modal: {
      title: string;
      name: string;
      description: string;
      button: string;
      created: string;
      error: string;
    };
    description: {
      visitors: string;
      createdBy: string;
      createdAt: string;
      you: string;
      year: string;
      month: string;
      day: string;
      hour: string;
      minutes: string;
    };
    selectPage: {
      title: string;
      owner: string;
      visited: string;
    };
  };
};

export const translation: Record<typeof LOCALES[number], translationKeys> = {
  fr: {
    search: 'Rechercher une vidéo',
    connection: 'connexions',
    profil: { logout: 'Se déconnecter' },
    errors: {
      internal:
        "Une erreur interne s'est produite, veuillez réessayer plus tard.",
    },
    login: {
      welcome: 'Bienvenue sur',
      explanation:
        "Pour accéder à toutes les fonctionnalités de l'application, veuillez vous connecter avec votre compte Google.",
      googleText: 'Se connecter avec Google',
      errors: {
        scope:
          "Tous les champs d'application de l'application synctube n'ont pas été acceptés, veuillez vous connecter à nouveau.",
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
    room: {
      modal: {
        title: 'Créer une nouvelle salle',
        name: 'Nom de la salle',
        description: 'Description',
        button: 'Créer',
        created: 'La salle a été créée',
        error: 'Veuillez remplir ce champ',
      },
      description: {
        createdBy: 'Créée par',
        visitors: 'Visiteurs',
        createdAt: 'Créée depuis',
        you: 'vous',
        year: 'années',
        month: 'mois',
        day: 'jours',
        hour: 'heures',
        minutes: 'minutes',
      },
      selectPage: {
        title: 'Choisissez une salle',
        owner: 'Vos salles',
        visited: 'Salles que vous avez visité',
      },
    },
  },
  en: {
    search: 'Search for a video',
    connection: 'connections',
    profil: { logout: 'Logout' },
    errors: {
      internal: 'An internal error has occurred, please try again later',
    },
    login: {
      welcome: 'Welcome to',
      explanation:
        'To access all the features of the application, please sign in with your Google account',
      googleText: 'Connect with Google',
      errors: {
        scope:
          'All scopes of the synctube application have not been accepted, please log in again',
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
    room: {
      modal: {
        title: 'Create a new room',
        name: 'Name of the room',
        description: 'Description',
        button: 'Create',
        created: 'The room has been created',
        error: 'Please fill in this field',
      },
      description: {
        visitors: 'Visitors',
        createdBy: 'Created by',
        createdAt: 'Created since',
        you: 'you',
        year: 'years',
        month: 'months',
        day: 'days',
        hour: 'hours',
        minutes: 'minutes',
      },
      selectPage: {
        title: 'Select a room',
        owner: 'Your rooms',
        visited: 'Rooms that you visited',
      },
    },
  },
};
