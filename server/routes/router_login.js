const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const Axios = require('axios');
const Auth = require('./api/Auth');
const {gh, webhook, GetAllRepos} = require('./api/GitHub');
const {sendTime, setTimerMeteo} = require('./api/Timer');
const Youtube = require('./api/google');
const {door, saveDoor} = require('./api/Door');
const timer_door = require('./api/timer_door');
const { signInWithEmail, signUpWithEmail } = require('./api/EmailHandling');
const {sendmess, saveDiscord} = require('./api/apiDiscord');

router.get('/', (req, res) => {
    res.send('server');
});

router.post('/api/auth', (req, res) => {
    console.log('req.body: ', req.body);
    switch (req.body.other) {
        case 'magic link':
            console.log('magic link');
            Auth.getAuth(req.body.email, res);
            break;
        default:
            console.log('default');
            res.sendStatus(400);
            break;
    }
});

router.post('/api/login', (req, res) => {
    const session = JSON.parse(req.body.body);
    if (session.is_new_user) {
        signUpWithEmail(session, res);
    } else {
        signInWithEmail(session, res);
    }
});

router.get('/discord_test', (req, res) => {
    
});

router.post('/api/github', async (req, res) => {
    const data = await gh(JSON.parse(req.body.body));
    if (data == 200) {
        console.log('200');
        res.sendStatus(200);
    } else {
        console.log('400');
        res.sendStatus(400);
    }
});

router.post('/api/webhook', async (req, res) => {
    await webhook(req, res);
});

router.post('/api/getAllRepos', async (req, res) => {
    console.log('req.body: ', req.body)
    const session = JSON.parse(req.body.body);
    console.log('session: ', session)
    await GetAllRepos(session, res);
});

// router.post('/api/google', async (req, res) => {
//     const session = JSON.parse(req.body.body);
//     console.log('req: ', req.body);
//     console.log('session: ', session);
//     if (session.provider_token === null || session.provider_token === undefined) {
//         res.sendStatus(400);
//         console.log('session is null');
//         return;
//     }
//     await gapi(session, res);
// });

router.post('/api/google', async (req, res) => {
    const session = JSON.parse(req.body.body);
    console.log('req: ', req.body);
    console.log('session: ', session);
    // if (!session || !receiverEmail || !playlistIds) {
    //     res.sendStatus(400);
    //     console.log('session is null');
    //     return;
    // }
    await Youtube(session.receiverEmail, session.playlistIds);
});

router.post('/api/discord', async (req, res) => {
    const session = JSON.parse(req.body.body);
    await sendmess(session);
});

router.post('/api/door', async (req, res) => {
    const name_door = JSON.parse(req.body.body).name_door;
    if (!name_door) {
        res.sendStatus(400);
        return;
    }
    await door(name_door, res);
});

router.post("/api/timer_send", async (req, res) => {
    const session = JSON.parse(req.body.body);
    // console.log(req);
    await sendTime(session, res);
});

router.post("/api/timer_meteo", async (req, res) => {
    const session = JSON.parse(req.body.body);
    console.log(session);
    setTimerMeteo(session, session.time, res);
});

router.post("/api/door_save", async (req, res) => {
    const session = JSON.parse(req.body.body);
    const door = session.name_door;
    const time = session.hour;
    console.log('session: ', session);
    console.log('door: ', door);
    console.log('time: ', time);
    await saveDoor(session.session, door, time, res);
});

router.post("/api/message_save", async (req, res) => {
    const session = JSON.parse(req.body.body);
    const message = session.message;
    const time = session.hour;
    const webhook = session.webhook;
    await saveDiscord(session.session, message, time, webhook, res);
});

module.exports = router;