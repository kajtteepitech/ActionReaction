# Server.js
- [server.js](../server.js)

Ce code utilise Express pour créer un serveur web qui écoute les requêtes HTTP sur un port spécifié. Il utilise également dotenv, cors et le module router_login pour gérer les routes.

## Installation
Assurez-vous d'avoir Node.js installé sur votre ordinateur. Vous pouvez le télécharger à partir du site officiel.
Clonez ce dépôt à l'aide de la commande git clone
Ouvrez un terminal dans le dossier de votre projet et tapez npm install pour installer les dépendances nécessaires.

## Utilisation
Le serveur écoute les requêtes sur le port 8080 par défaut, mais vous pouvez modifier ce comportement en définissant la variable d'environnement PORT.

Pour démarrer le serveur, tapez la commande node app.js dans votre terminal. Le serveur va démarrer et afficher "Listening on port [votre_port]" dans la console.

## Routes
Le serveur utilise le module router_login pour gérer les routes. Vous pouvez consulter le fichier router_login.js pour voir les différentes routes et actions associées.

## Middleware
Le serveur utilise également des middlewares pour gérer les requêtes entrantes. Les middlewares sont des fonctions qui interceptent les requêtes avant qu'elles ne soient gérées par les routes.

## Le serveur utilise les middlewares suivants :

- cors() : permet à d'autres domaines d'accéder à votre API en ajoutant des en-têtes CORS à vos requêtes et réponses HTTP.
- express.json() : analyse le corps de la requête en JSON.
- express.urlencoded({ extended: false }) : analyse le corps de la requête en URL-encoded.

## Conclusion
Ce code montre comment créer un serveur web avec Express et gérer les routes avec un module externe. Les middlewares sont également utilisés pour gérer les requêtes entrantes. N'hésitez pas à explorer le code pour en savoir plus sur son fonctionnement.

## RouterJs.md
[routerJs.md](routes/routerJs.md)