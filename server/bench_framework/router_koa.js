const Router = require("koa-router");
const router = new Router();

let data = {
    users: [
        {id:1, name: 'John', email: 'jonh@gmail.com'},
        {id:2, name: 'John1', email: 'jonh1@gmail.com'},
        {id:3, name: 'John2', email: 'jonh2@gmail.com'},
    ]
};
router.get("/", (ctx) => (ctx.body = data.users));

module.exports = router;