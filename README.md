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
- page d'acceuil avec la liste de ses salles custom et celles qu'il a visité qui sont pas les siennes


## Server

- lancer la video en meme temps que tout le monde, le user envoie un event , le server re spreaad un event a tout le monde meme le user de base et une fois le nouveau event recu, la video se lance
- quand le user fait pause, on envoie en plus de l'event le timestamp de la pausee pour requalibrer tout le monde
- Faire des stats sur l'pp ( nb de user, temps total de video etcc ) et se les envoyer par mail chaque fois en mode newsletter
- chaque user peut créer jusqu'à 5 salles perso avec un nom custom

## Stats

- nbre de vidéo en tout sur l'app
- nbre d'utilisateurs sur l'app
- nbre de video sur la salle privée

## Rooms

- post the user in the db at the login 
- each user can create 5 distinct rooms
- at the  / route, they can see theire rooms and the one they visited
- The creator of the room can kick user in the room
- Create a Room context with : 

```ts
{
  video: Video,
  isOwner: boolean,
  connected: Profil[],
  onVideoChange: ()=>void,
  ...
}
```


## Stack

- Nextjs
- Nestjs
- NX for monorepo

## Chrome extension

- Faire une extension chrome pour que a chaque fois qu'un user va sur une video ytoutube, il y ai boutons qui se rajoute sur sa page " voir sur synctube", et qui envoie ensuite sur synctube avec ka video prechargé !
