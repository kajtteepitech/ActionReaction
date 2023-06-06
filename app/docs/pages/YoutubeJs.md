# youtube.js
[youtube.js](../../src/pages/youtube.js)

Ce fichier contient un composant React appelé `Appyoutube`. Il permet de récupérer l'adresse email d'un utilisateur et l'ID d'une playlist YouTube pour envoyer des notifications sur les vidéos ajoutées à la playlist.

## Utilisation

### Prérequis

- Node.js installé sur votre ordinateur
- Accès à un serveur local

### Installation
1. Cloner le repository GitHub sur votre ordinateur
2. Ouvrir le terminal dans le dossier du projet
3. Installer les dépendances avec la commande suivante : `npm install`

### Lancement
1. Ouvrir le terminal dans le dossier du projet
2. Démarrer le serveur local avec la commande suivante : `npm start`
3. Accéder à l'application dans votre navigateur à l'adresse suivante : http://localhost:8081

### Fonctionnement
1. Remplir les champs "Email" et "Playlist ID" avec les informations souhaitées
2. Cliquer sur le bouton "Submit" pour envoyer les informations au serveur
3. Les informations seront envoyées au serveur qui se chargera d'envoyer les notifications à l'adresse email indiquée, pour chaque nouvelle vidéo ajoutée à la playlist YouTube correspondante.

## Fonctionnement interne
Le fichier contient deux fonctions : `gapi` et `Appyoutube`.

La fonction gapi permet de communiquer avec l'API Google en envoyant les informations de session, l'adresse email et l'ID de la playlist. Les résultats de l'API sont affichés dans la console.

Le composant `Appyoutube` est le composant principal de l'application. Il utilise le hook `useState` pour stocker les informations de l'utilisateur, et la fonction `handleSubmit` pour envoyer les informations au serveur.