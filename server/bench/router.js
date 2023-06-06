const express = require("express");
const router = express.Router();

let data = {
    users: [
        {id:1, name: 'John', email: 'jonh@gmail.com'},
        {id:2, name: 'John1', email: 'jonh1@gmail.com'},
        {id:3, name: 'John2', email: 'jonh2@gmail.com'},
    ]
};

router.get("/", (req, res) => {
    res.json(data.users);
    res.status(200);
});

router.use((req, res) => {
    res.status(404);
    res.json({
        error: "Page not found"
    });
});

module.exports = router;
