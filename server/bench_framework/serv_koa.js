const Koa = require("koa");
const parser = require("koa-bodyparser");
const cors = require("@koa/cors");
const router = require("./router_koa");
const App = new Koa();
const port = 8080;

App.use(parser())
    .use(cors())
    .use(router.routes())
    .listen(port, () => {
        console.log(`🚀 Server listening http://127.0.0.1:${port}/ 🚀`);
    });