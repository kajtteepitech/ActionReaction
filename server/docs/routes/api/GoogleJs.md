# Google.js
[google.js](../../../routes/api/google.js)

Ce module permet de surveiller une playlist YouTube et d'envoyer une notification par email lorsqu'une nouvelle vidéo est ajoutée à la playlist. Il utilise l'API YouTube v3 de Google, le module `node-cron` pour planifier les tâches et le service d'envoi de mails SendGrid.

## Configuration
Le module nécessite les dépendances suivantes :

- `googleapis` : pour accéder à l'API YouTube v3 de Google
- `node-cron` : pour planifier la vérification de nouvelles vidéos
- `@sendgrid/mail` : pour envoyer des notifications par email

Pour utiliser le module, vous devez créer une instance en passant en paramètre l'adresse email du destinataire de la notification et l'identifiant de la playlist YouTube surveillée.

```js
const Youtube = require('./Youtube');

const receiverEmail = 'john.doe@example.com';
const playlistId = 'PL0dX5redvVZmPR9YtGpE8JhWtI5n1G5f1';

const youtubeNotifier = new Youtube(receiverEmail, playlistId);
```

Vous devez également configurer une clé d'API YouTube v3 et une clé d'API SendGrid dans le fichier. Cette clé doit être fournie en tant que chaîne de caractères pour la clé d'API YouTube et pour la clé d'API SendGrid.

```js
const apiKey = 'AIzaSyAgJ2VQ4-BLICIh3VHrFTX76ngqJLpSSA4';
const sendGridApiKey = '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';
```

## Utilisation
Une fois l'instance créée, le module commence à surveiller la playlist et envoie une notification par email lorsqu'une nouvelle vidéo est ajoutée à la playlist. Vous pouvez également planifier la vérification de nouvelles vidéos en modifiant la tâche cron dans la fonction `checkNewVideoInPlaylist`.

```js
cron.schedule('* * * * *', checkNewVideoInPlaylist);
```
