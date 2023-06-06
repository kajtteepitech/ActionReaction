# meteo.js
[meteo.js](../../src/pages/meteo.js)

## Meteo
Un composant React pour afficher les données météorologiques pour une position géographique donnée. Il utilise l'API OpenWeatherMap pour obtenir les données météorologiques.

## Dépendances

- `react`
- `react-router-dom`
- `semantic-ui-react`
- `semantic-ui-css`
- `@supabase/supabase-js`

## Utilisation
```js
import { Meteo } from './Meteo'

function App() {
  return (
    <Meteo session={session} />
  );
}
```

Le composant `Meteo` prend un objet `session` en prop qui contient les informations de session de l'utilisateur connecté. Si `session` est null, il essaiera de récupérer les informations de session à partir du stockage local.

## Fonctions
### `getData()`
Obtient les données météorologiques pour la position géographique actuelle en utilisant l'API OpenWeatherMap. Les données sont stockées dans l'état `data`.

### `getD()`
Obtient la position géographique de l'utilisateur à partir de Supabase s'il est enregistré, sinon obtient la position géographique actuelle en utilisant `navigator.geolocation.getCurrentPosition()`. La position est stockée dans les états `lat` et `long`.

### `CardExampleCard()`
Un composant pour afficher les données météorologiques dans une carte `semantic-ui-react`. Prend un objet `weatherData` en paramètre.

### `save()`
Sauvegarde la position géographique de l'utilisateur dans la base de données Supabase. La position est stockée dans les états `lat` et `long`.

### `getCurrentLocation()`
Obtient la position géographique actuelle de l'utilisateur en utilisant `navigator.geolocation.getCurrentPosition()`. La position est stockée dans les états `lat` et `long`.

### `getSavedLocation()`
Obtient la position géographique enregistrée de l'utilisateur à partir de la base de données Supabase. La position est stockée dans les états lat et long.

### `addTimer`
Ajoute un timer a la liste enregistrer sur supabase afin d'envoyé un mail contenant les infos météo aux heures désiré. Il fait appelle a l'api afin d'enregistré les données. Aucune fonction n'existe a l'heure actuel pour retiré un timer.

### `getAllExistentTimer`
Récupère la liste des timers existant dans la base de donnée `supabase`.

### `printAllTimers`
Affiche la liste des timers contenue dans la base de donnée sous forme de liste, il précise l'heure que l'utilisateur as défini ainsi que l'email utilisé pour l'envoie.

## États
- `loading` : un booléen qui indique si les données sont en cours de chargement ou non.
- `lat` : la latitude de la position géographique actuelle ou enregistrée.
- `long` : la longitude de la position géographique actuelle ou enregistrée.
- `data` : les données météorologiques pour la position géographique actuelle. Les données sont un objet JSON renvoyé par l'API OpenWeatherMap. Si les données ne sont pas disponibles, la valeur est `null`.
- `navigate` : un objet qui fournit des méthodes de navigation pour le composant `Meteo`.
