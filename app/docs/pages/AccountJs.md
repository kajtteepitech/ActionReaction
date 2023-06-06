# Account.js
[Account.js](../../src/pages/Account.js)

Le composant "Account" est un composant React qui permet à un utilisateur de se connecter à son compte via des fournisseurs tiers tels que Discord, GitHub, Google, Twitter, etc.

## Installation
Ce composant utilise les packages `react-router-dom`, `react` et `@supabase/supabase-js`. Vous pouvez les installer avec `npm` en exécutant la commande suivante :

```bash
npm install react-router-dom react @supabase/supabase-js
```

## Utilisation

### Importation

Tout d'abord, vous devez importer le composant et les packages nécessaires :

```js
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'
import { useState } from 'react'
import './Account.css'
```

### Configuration
Le composant nécessite un objet "session" en tant que prop qui contient les informations d'identification de l'utilisateur connecté. Vous pouvez le passer en tant que prop lorsque vous utilisez le composant dans votre application :

```js
<Account session={session} />
```

### Fonctionnalités
Le composant "Account" permet aux utilisateurs de se connecter à leur compte via des fournisseurs tiers. Il affiche une liste de boutons pour chaque fournisseur tiers pris en charge.

Pour ajouter un fournisseur tiers, vous pouvez ajouter son nom à la variable `all_oauth` :

```js
const all_oauth = ['discord', 'github', 'google', 'twitter']
```

Pour ajouter un nouveau bouton de connexion, vous pouvez ajouter un élément `<button>` à la liste `<ul>` :

```js
<button type="button" className="button block" onClick={() => getToken("monfournisseur")}>
    Mon Fournisseur
</button>
```

Le composant utilise également la fonction `getToken` pour récupérer le jeton d'accès auprès du fournisseur tiers :

```js
const getToken = async (provider) => {
    let test = false;
    try {
        setLoading(true)
        let { user } = session;
        user.identities.forEach(element => {
            if (element.provider === provider) {
                test = true;
            }
        });
        if (!test && all_oauth.contains(provider)) {
            const { data } = await supabase.auth.signInWithOAuth({ provider: provider }).catch(err => {
                console.log(err);
                throw err;
            });
            user = data.user;
        }
    } catch (error) {
        alert(error.message)
    } finally {
        setLoading(false)
        navigate('/' + provider);
    }
}
```

La fonction vérifie d'abord si l'utilisateur est déjà connecté via le fournisseur tiers. Si ce n'est pas le cas et que le fournisseur tiers est pris en charge, il récupère le jeton d'accès via la méthode `signInWithOAuth` de Supabase.

Une fois que l'utilisateur s'est connecté, la fonction utilise la méthode `navigate` de `useNavigate` pour rediriger l'utilisateur vers une page spécifique pour le fournisseur tiers.

### Déconnexion
Enfin, le composant inclut un bouton "Sign Out" qui permet à l'utilisateur de se déconnecter de son compte :

```js
<button type="button" className="button block" onClick={() => supabase.auth.signOut()}>
    Sign Out
</button>
```