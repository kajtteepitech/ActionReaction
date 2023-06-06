# Timer.js
[Timer.js](../../../routes/api/Timer.js)

Ce module permet de définir des timers effectuant des actions toutes les 50 secondes.

## Installation
Pour utiliser ce module, il faut tout d'abord l'installer via `npm` en tapant la commande suivante :
```bash
npm install @sendgrid/mail
```

## Utilisation
### Configuration
Pour utiliser ce module il faut tout d'abord definir une fonction qui sera appeller toutre les 50 secondes.
```js
const sendTime = async (session, res) => {
    try {
        const { data, error } = await supabase
            .from('timer')
            .select()
            .eq('id', session.id);
        if (error) throw error
        if (data.length !== 0) {
            await supabase.from('timer')
                .update({ hour: session.input_hour, email: session.email })
                .eq('id', session.id);
        } else {
            await supabase.from('timer')
                .insert({ id: session.id, hour: session.input_hour, email: session.email }).then((data) => {
                    console.log(data);
                }).catch((error) => {
                    throw new Error(error);
                });
        }
        res.sendStatus(200);
    } catch (error) {
        console.log("error: " + error.message)
        res.sendStatus(400);
    }
}
```
Dans cette expemple nous récupérons les heures stocker dans une bose de données `supabase` pour chaque client et comparons les heures avec celles actuels. Par la suite un mail est automatiquement envoyer a l'aide de `sendgrid`.

### Exemple d'utilisation
pour utiliser ce module il suffit de se rendre dans [server.js](../../../server.js) afin d'y appeller la fonction `setTimer` en lui donnant en argument vottre fonction.
```js
const express = require('express');
const app = express();
const router = require('./routes/router_login');
const dotenv = require('dotenv');
const cors = require('cors');
const {setTimer, getTime, getMeteoTime} = require('./routes/api/Timer');

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const PORT = process.env.PORT || 8080;

app.use(router);
setTimer(getTime);
setTimer(getMeteoTime);

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
```
Dans cet exemple, nous définissons 2 timers qui vont vérifier si un mail doit être envoyer pour nous donnez `l'heure` ou `la météo`.

## Annexe
### - [MeteoJs.md](MeteoJs.md)