# App.js
[App.js](../src/App.js)

Ce fichier contient le code pour une application web basée sur React qui utilise Supabase pour l'authentification et le stockage de données. Cette application est destinée à être utilisée pour accéder à différentes fonctionnalités telles que Discord, OpenDoor, la météo, GitHub, l'heure et YouTube.

## Installation
Pour installer cette application, vous devez d'abord cloner le dépôt à partir de GitHub. Ensuite, vous devez exécuter la commande `npm install` pour installer toutes les dépendances requises.

## Configuration
L'application nécessite une configuration de Supabase pour fonctionner correctement. Pour cela, vous devez créer un compte Supabase et créer une nouvelle base de données. Ensuite, vous devez copier les clés d'API fournies par Supabase et les coller dans le fichier `supabaseClient.js`.

## Utilisation
Pour utiliser l'application, vous pouvez lancer le serveur de développement en exécutant la commande `npm start`. Cela ouvrira l'application dans votre navigateur par défaut.

L'application est divisée en différentes pages, chacune accessible via une URL spécifique. Vous pouvez naviguer entre les pages en utilisant les liens fournis dans l'application.

# Détails du code
## Importations
Les modules nécessaires sont importés en début de fichier :
```js
import './index.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './pages/Auth'
import Account from './pages/Account'
import Discord from './pages/discord'
import Meteo from './pages/meteo'
import Github from './pages/Github'
import Heure from './pages/heure'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Opendoor from './pages/opendoor'
import Appyoutube from './pages/youtube'
const cors = require("cors")

cors({ origin: true })
```

## Fonction App
La fonction `App` est définie comme une fonction fléchée. Elle contient les routes pour les différentes pages de l'application. Elle utilise également le hook `useEffect` pour récupérer la session utilisateur à partir de Supabase et la stocker dans l'état local de l'application.

```js
export default function App() {
    const [session, setSession] = useState(null)
    global.service = "";
    global.sess = session;

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            global.sess = session;
            localStorage.setItem('session', JSON.stringify(session))
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            global.sess = session;
            localStorage.setItem('session', JSON.stringify(session))
        })
    }, [])
}
```

La fonction `Home` est également définie comme une fonction fléchée. Elle renvoie la page de connexion si l'utilisateur n'est pas connecté et la page de compte s'il est connecté.

```js
const Home = () => {
    return session ? <Account session={session} /> : <Auth />;
};
```

Les routes sont définies à l'aide de la balise `Route` de React Router. Chaque route correspond à une page différente de l'application et est liée à un composant spécifique.

```js
return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element ={<Home />} />
            <Route path="/discord" element={<Discord />} />
            <Route path="/opendoor" element={<Opendoor />} />
            <Route path="/discord" element={<Discord session={session}/>} />
            <Route path="/meteo" element={<Meteo session={session}/>} />
            <Route path="/github" element={<Github session={session}/>} />
            <Route path="/heure" element={<Heure city="Europe/Paris"/>} />
            <Route path="/youtube" element={<Appyoutube session={session}/>} />
        </Routes>
    </BrowserRouter>
)
```

Les pages sont importées en haut du fichier à l'aide de la syntaxe `import` de JavaScript.

```js
import Auth from './pages/Auth'
import Account from './pages/Account'
import Discord from './pages/discord'
import Meteo from './pages/meteo'
import Github from './pages/Github'
import Heure from './pages/heure'
import Opendoor from './pages/opendoor'
import Appyoutube from './pages/youtube'
```

Les dépendances sont également importées en haut du fichier. Le module `react` est utilisé pour créer l'interface utilisateur de l'application. Le module `react-router-dom` est utilisé pour la gestion de la navigation dans l'application.

```js
import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
```

Le module `supabaseClient` est utilisé pour l'authentification et la communication avec la base de données de Supabase.

```js
import { supabase } from './supabaseClient'
```

Enfin, le module `cors` est utilisé pour autoriser les requêtes provenant d'autres domaines.

```js
const cors = require("cors")
cors({ origin: true })
```

# Toute les pages
## - [AccountJs.md](pages/AccountJs.md)
## - [Authjsx.md](pages/Authjsx.md)
## - [GithubJs.md](pages/GithubJs.md)
## - [heureJs.md](pages/heureJs.md)
## - [meteoJs.md](pages/meteoJs.md)
## - [opendoorJs.md](pages/opendoorJs.md)
## - [YoutubeJs.md](pages/YoutubeJs.md)