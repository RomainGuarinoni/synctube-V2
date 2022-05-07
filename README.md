# Synctube-V2

The V2 of synctube, faster, more powerfull and nicer !

# Idea

## UI

- infinite scroll sur l'historique
- listener sur les fleches du pad pour avancerr dans la video
- utiliser la vrai barres du lecteur youtube
- Faire en sorte que quand un user arrive sur synctube, la vidéo est déjà chargé et se lance au bon endroit !
- Faire de la transcription avec i18next
- faire un sytème de salle custom

## Server

- lancer la video en meme temps que tout le monde, le user envoie un event , le server re spreaad un event a tout le monde meme le user de base et une fois le nouveau event recu, la video se lance
- quand le user fait pause, on envoie en plus de l'event le timestamp de la pausee pour requalibrer tout le monde
- Faire des stats sur l'pp ( nb de user, temps total de video etcc ) et se les envoyer par mail chaque fois en mode newsletter

## Stack

- Nextjs
- Nestjs
- NX for monorepo

## Chrome extension

- Faire une extension chrome pour que a chaque fois qu'un user va sur une video ytoutube, il y ai boutons qui se rajoute sur sa page " voir sur synctube", et qui envoie ensuite sur synctube avec ka video prechargé !
