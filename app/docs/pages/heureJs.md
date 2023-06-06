# heure.js
[heure.js](../../src/pages/heure.js)

Le composant Clock est un composant React qui affiche l'heure d'une ville donnée. Le temps est récupéré en utilisant la bibliothèque moment-timezone.

## Installation
Avant d'utiliser le composant Clock, vous devez installer les dépendances suivantes :

- React
- moment-timezone
- Axios

Vous pouvez les installer avec la commande suivante :
```bash
npm install react moment-timezone axios
```

## Utilisation
Le composant Clock prend une prop "city" qui doit être une chaîne de caractères représentant le nom de la ville dont vous souhaitez afficher l'heure.

```js
import React from 'react';
import Clock from './Clock';

function App() {
  return (
    <div>
      <Clock city="America/Los_Angeles" />
      <Clock city="Europe/Paris" />
      <Clock city="Asia/Tokyo" />
    </div>
  );
}

export default App;
```

## Fonctionnalités
Le composant Clock met à jour l'heure toutes les secondes. Il contient également une zone de texte et un bouton qui permettent d'envoyer une requête à un serveur distant en utilisant la bibliothèque Axios.

Le bouton envoie une requête POST à l'URL http://localhost:8080/api/timer_send avec un objet JSON qui contient l'ID de l'utilisateur actuellement connecté (stocké dans le stockage local) et une heure spécifiée dans la zone de texte.

## Remarques
Ce composant dépend d'un serveur distant pour envoyer des données. Par conséquent, il est destiné à être utilisé dans le cadre d'une application qui utilise également un serveur distant pour stocker et récupérer des données.