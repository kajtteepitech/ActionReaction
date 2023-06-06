# Auth.js
[Auth.js](../../../routes/api/Auth.js)

La fonction getAuth est une fonction asynchrone qui permet à un utilisateur de s'authentifier sur Supabase en utilisant un email.

## Paramètres
- email (string) : l'adresse email de l'utilisateur qui souhaite s'authentifier.
- res (object) : l'objet réponse à renvoyer à l'utilisateur.

## Utilisation
Pour utiliser cette fonction, il faut d'abord importer le module contenant la fonction en utilisant la syntaxe suivante :

```js
const { getAuth } = require('./nom-du-module');
```

Ensuite, il faut appeler la fonction en lui passant en paramètres l'email de l'utilisateur et l'objet réponse. Voici un exemple d'utilisation :

```js
app.post('/auth', (req, res) => {
  const { email } = req.body;
  getAuth(email, res);
});
```

## Fonctionnement
La fonction getAuth utilise l'objet SupabaseClient initialisé dans le module supabaseClient pour authentifier l'utilisateur en utilisant son email. Elle renvoie une réponse HTTP 200 si l'opération est réussie, sinon elle renvoie une réponse HTTP correspondant à l'erreur rencontrée.

En cas d'erreur, la fonction lève une exception qui est ensuite récupérée et affichée dans la console.

Notez que la fonction utilise le protocole asynchrone/await pour attendre la fin de l'opération avant de renvoyer une réponse. Cela signifie que la fonction peut être appelée de manière synchrone, mais que son exécution sera asynchrone.