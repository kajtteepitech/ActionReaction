# Router.js
[router_login.js](../../routes/router_login.js)

Ce code utilise Node.js et Express pour créer un serveur web. Il implémente un certain nombre de routes pour les demandes GET et POST. Voici une brève description de chaque route :

## Route '/'
La route '/' renvoie simplement la chaîne de caractères "home" en réponse à une demande GET.

## Route '/api/auth'
La route '/api/auth' gère les demandes POST pour l'authentification. Si la valeur de 'other' est "magic link", elle appelle la fonction 'getAuth' du module 'Auth', en passant l'adresse e-mail du corps de la demande POST. Sinon, elle renvoie une réponse 400.

## Route '/login'
La route '/login' renvoie simplement la chaîne de caractères "login" en réponse à une demande GET.

## Route '/discord_test'
La route '/discord_test' ne fait actuellement rien et ne renvoie pas de réponse.

## Route '/api/github'
La route '/api/github' gère les demandes POST pour les interactions avec l'API GitHub. Elle appelle la fonction 'gh' du module 'GitHub' en passant les données JSON du corps de la demande POST. Si la réponse est 200, elle renvoie une réponse 200, sinon elle renvoie une réponse 400.

## Route '/api/webhook'
La route '/api/webhook' gère les demandes POST pour les webhooks. Elle appelle la fonction 'webhook' du module 'GitHub'.

## Route '/api/getAllRepos'
La route '/api/getAllRepos' gère les demandes POST pour récupérer tous les dépôts à partir de l'API GitHub. Elle appelle la fonction 'GetAllRepos' du module 'GitHub' en passant la session JSON du corps de la demande POST.

## Route '/api/google'
La route '/api/google' gère les demandes POST pour les interactions avec l'API Google. Elle appelle la fonction 'gapi' du module 'google' en passant la session JSON du corps de la demande POST. Si le jeton du fournisseur est nul ou indéfini, elle renvoie une réponse 400.

## Route '/api/door'
La route '/api/door' gère les demandes POST pour l'ouverture d'une porte. Elle appelle la fonction 'door' du module 'Door' en passant le nom de la porte à ouvrir.

## Externes
Ce code utilise également plusieurs modules tiers, notamment 'connect-ensure-login', 'axios', et les modules locaux 'Auth', 'supabase_auth', 'GitHub' et 'google'.

# Tout les liens de doccumentation d'api
### - [AuthJs.md](api/AuthJs.md)
### - [Door.md](api/Door.md)
### - [GitHubJs.md](api/GithubJs.md)
### - [GoogleJs.md](api/GoogleJs.md)