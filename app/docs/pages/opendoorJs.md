# opendoor.js
[opendoor.js](../../src/pages/opendoor.js)

## Description
Ce module représente un composant React permettant d'ouvrir différentes portes en utilisant une API REST.

## Installation
Ce module utilise `React`, `react-router-dom` et `axios`. Vous devez donc installer ces dépendances avant de l'utiliser. Vous pouvez les installer avec la commande suivante :

```js
npm install react react-router-dom axios
```

## Utilisation
Pour utiliser ce composant, vous pouvez l'importer et l'utiliser dans votre code React.

```js
import Opendoor from './Opendoor';

function App() {
  return (
    <div className="App">
      <Opendoor />
    </div>
  );
}

export default App;
```

Le composant `Opendoor` affichera une liste de boutons pour ouvrir différentes portes. Lorsque vous cliquez sur un bouton, le composant enverra une requête à l'API REST pour ouvrir la porte correspondante.

Le composant utilise également `react-router-dom` pour afficher un bouton de déconnexion.

## API
### `door(name_door: string)`
Cette fonction est appelée lorsque vous cliquez sur l'un des boutons pour ouvrir une porte. Elle envoie une requête à l'API REST pour ouvrir la porte correspondante.

## Arguments
- `name_door` : Le nom de la porte à ouvrir.

## Exemple
```js
<button type="button" className="button block" onClick={() => door("HUB")}>
  Open HUB
</button>
```