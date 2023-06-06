# Meteo.js
[meteo.js](../../../routes/api/Meteo.js)

Ce fichier contient plusieurs fonctions qui permettent d'obtenir des informations météorologiques à partir de l'API d'OpenWeatherMap et de les stocker dans une base de données Supabase.

## Installation
Le fichier nécessite l'installation des modules Node.js `node-fetch` et `@supabase/supabase-js`. Pour les installer, exécutez les commandes suivantes dans votre terminal :
```bash
npm install node-fetch
npm install @supabase/supabase-js
```

## Configuration
Le fichier nécessite également une clé d'API valide pour l'API OpenWeatherMap. Vous pouvez en obtenir une en vous inscrivant sur leur site web et en créant un compte. Une fois que vous avez une clé, remplacez la valeur des ${} dans les fonctions getData et getData2 par votre propre clé.

## Utilisation
Les fonctions suivantes sont exportées :

### `getCity(id)`
Cette fonction prend un identifiant de ville en paramètre et retourne les informations météorologiques pour cette ville. Elle utilise la fonction `getData2` pour récupérer les données météorologiques à partir de l'API OpenWeatherMap.

### `getData(lat, long)`
Cette fonction prend les coordonnées de latitude et de longitude en paramètre et retourne les informations météorologiques pour cette zone. Elle utilise la fonction `fetch` pour récupérer les données météorologiques à partir de l'API OpenWeatherMap.

### `getData2(city)`
Cette fonction prend le nom d'une ville en paramètre et retourne les informations météorologiques pour cette ville. Elle utilise la fonction `fetch` pour récupérer les données météorologiques à partir de l'API OpenWeatherMap.

### `getD(id)`
Cette fonction prend un identifiant de ville en paramètre et retourne les informations météorologiques pour cette ville. Elle utilise la fonction `getData` pour récupérer les données de latitude et de longitude à partir de la base de données Supabase, puis utilise ces données pour récupérer les informations météorologiques à partir de l'API OpenWeatherMap.