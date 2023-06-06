const express = require("express");
const router = express.Router();
const data = require("../data");

router.get("/", (req, res) => {
        res.json("Hello world!!");
});

router.get("/persons", (req, res) => {
    res.json(data.users);
    res.status(200);
});

router.get("/persons/:id", (req, res) => {
    const user = data.GetUserById(req.params.id);
    if (user === 84) {
        res.json({
            error: "User not found"
        }).status(404);
    } else {
        res.json(user).status(200);
    }
});

router.post('/person', (req, res) => {
    const p = data.insertUser(req.body);
    if (p === 84) {
        res.status(400).json({"error": "Bad request"});
    } else {
        res.status(201)
            .json(p);
    }
})

router.delete('/person/:id', (req, res) => {
    const p = data.removeUser(req.params.id);
    if (p === 84) {
        res.status(400).json({"error": "Bad request"});
    } else {
        res.status(200)
            .json(p)
            .end();
    }
});

router.use((req, res) => {
    res.status(404);
    res.json({
        error: "Page not found"
    });
});

module.exports = router;
