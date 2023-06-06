# supabaseClient.js
[supabaseClient.js](../../../routes/api/supabaseClient.js)

Ce module permet d'établir une connexion avec une base de données Supabase en utilisant la bibliothèque `@supabase/supabase-js`.

## Installation
Pour utiliser ce module, il faut tout d'abord l'installer via `npm` en tapant la commande suivante :
```bash
npm install @supabase/supabase-js
```

## Utilisation
### Configuration
Pour utiliser ce module, il faut tout d'abord configurer l'URL de la base de données ainsi que la clé d'accès anonyme. Voici un exemple de configuration :
```js
const supa = require('@supabase/supabase-js');

const supabaseUrl = "https://<your_supabase_url>.supabase.co";
const supabaseAnonKey = "<your_supabase_anonymous_key>";

const supabase = supa.createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;
```
Remplacez <your_supabase_url> et <your_supabase_anonymous_key> par l'URL et la clé d'accès anonyme correspondantes de votre base de données Supabase.

### Exemple d'utilisation
Vous pouvez utiliser le module pour effectuer des opérations sur la base de données Supabase. Par exemple, voici comment exécuter une requête SELECT :
```js
const supabase = require('./supabaseClient');

async function getUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*');

  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
}

getUsers();
```
Dans cet exemple, nous récupérons tous les utilisateurs de la table `users`. Vous pouvez modifier la requête en fonction de vos besoins.
