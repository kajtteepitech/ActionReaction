# Door.js
La fonction door permet de déverrouiller une porte d'Epitech Montpellier en envoyant une requête à l'API d'Epilogue.

## Utilisation
La fonction door prend deux paramètres :

- name_door : le nom de la porte que vous souhaitez vérifier.
- res : la réponse HTTP que vous souhaitez renvoyer.
Pour appeler la fonction door, vous pouvez utiliser la syntaxe suivante :

```js
const door = require('./door');

door("nom_de_la_porte", res);
```

## Exemple
```js
const axios = require('axios');
const door = async (name_door, res) => {
    try {
        await axios.get("https://epilogue.arykow.com/api/doors_open?token=qKMrJWl4QOos0woTgrOK8aT48fXZ1NPDYAuPeRsWDMu7YK402FYNsMglGjAoISIP&door_name=" + name_door).catch(err => {
            throw new Error(err);
        });
        res.sendStatus(200);
        console.log("200");
    } catch (error) {
        console.error(error);
        res.send({error: error.message, status: 400})
    }
}

module.exports = door;
```