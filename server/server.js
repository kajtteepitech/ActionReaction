const express = require('express');
const app = express();
const router = require('./routes/router_login');
const dotenv = require('dotenv');
const cors = require('cors');
const {setTimer, getTime, getMeteoTime} = require('./routes/api/Timer');
const {timerdoor} = require('./routes/api/timer_door');
const {timerdiscord} = require('./routes/api/TimerDiscord')

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const PORT = process.env.PORT || 8080;

app.use(router);
setTimer(getTime);
setTimer(getMeteoTime);
setTimer(timerdoor);
setTimer(timerdiscord);

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});