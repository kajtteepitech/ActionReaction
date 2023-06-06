# Github.js
[Github.js](../../src/pages/Github.js)

Ce code est un composant React nommé `Github`. Ce composant est utilisé pour afficher une page web qui permet aux utilisateurs de se connecter à leur compte Github, d'envoyer des données à une API et d'afficher les informations de tous les dépôts associés à leur compte Github.

## Installation
1. Installez Node.js sur votre ordinateur.
2. Clonez ce repo.
3. Ouvrez un terminal à la racine du projet et exécutez `npm install` pour installer toutes les dépendances.

## Utilisation
1. Pour utiliser ce composant, importez-le dans votre projet React.
2. Utilisez la balise `<Github /`> dans votre fichier JSX pour afficher la page web.

## Configuration
Ce composant utilise les bibliothèques React, React Router DOM et Axios. Assurez-vous que ces bibliothèques sont installées dans votre projet.

## Variables
### session
La variable `session` est un objet contenant des informations sur l'utilisateur connecté à leur compte Github. Si cette variable n'est pas définie, elle est récupérée à partir de l'espace de stockage local de l'utilisateur.

## Fonctions
### sendToApi
La fonction `sendToApi` envoie les données de l'utilisateur à une API. Elle est déclenchée lorsque l'utilisateur clique sur le bouton "Send to API".

### getAllRepos
La fonction `getAllRepos` récupère les informations de tous les dépôts associés à l'utilisateur connecté. Elle est déclenchée lorsque l'utilisateur clique sur le bouton "Get all repos".

### getRedirect
La fonction `getRedirect` redirige l'utilisateur vers une autre page web. Elle est déclenchée lorsque l'utilisateur clique sur le bouton "Sign Out".

### displayRepos
La fonction `displayRepos` affiche les informations de tous les dépôts associés à l'utilisateur connecté. Elle est appelée par la fonction `getAllRepos`.

## Composants
### Boutons
Deux boutons sont affichés sur la page web : "Send to API" et "Get all repos". Le premier bouton envoie les données de l'utilisateur à une API, tandis que le deuxième bouton récupère les informations de tous les dépôts associés à l'utilisateur connecté.

### Liste de dépôts
Les informations de tous les dépôts associés à l'utilisateur connecté sont affichées dans une liste. Chaque élément de la liste contient un lien vers le dépôt sur Github.