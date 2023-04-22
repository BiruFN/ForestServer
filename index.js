const express = require("express");
const server = express();
const functions = require("./structs/functions");

const port = 5595;

server.use(express.urlencoded({ "extended": false }));
server.use(express.json());
server.use(express.static("public"));

server.use(require("./routers/account"));
server.use(require("./routers/cloudstorage"));
server.use(require("./routers/content"));
server.use(require("./routers/eos"));
server.use(require("./routers/hotconfigs"));
server.use(require("./routers/launcher"));
server.use(require("./routers/matchmaking"));
server.use(require("./routers/other"));
server.use(require("./routers/profile"));

server.listen(port, async () => {
    console.log("[\x1b[32mFOREST\x1b[0m]", "ForestServer is up listening on port", port, "\x1b[0m");
    require("./xmpp/xmpp");
})

server.use(async (req, res) => {
    res.status(404);
    res.json({
        "errorCode": "errors.com.epicgames.common.not_found",
        "errorMessage": "Sorry the resource you were trying to find could not be found",
        "numericErrorCode": 1004,
        "originatingService": "fortnite",
        "intent": "prod-live"
    });
})
