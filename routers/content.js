const express = require("express");
const server = express.Router();
const functions = require("../structs/functions");

server.get("/content/api/pages/fortnite-game", async (req, res) => {
    const season = await functions.GetSeason(req.headers["user-agent"]);
    const build = await functions.GetBuild(req.headers["user-agent"]);

    const content = require("../responses/fortnite-game.json");

    if (season == 22) {
        if (build == 22.30) {
            content.dynamicbackgrounds.backgrounds.backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp22-lobby-square-2048x2048-2048x2048-e4e90c6e8018.jpg";
        }
    }

    if (season == 23) {
        content.dynamicbackgrounds.backgrounds.backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp23-lobby-2048x1024-2048x1024-26f2c1b27f63.png";
        if (build == 23.10) {
            content.dynamicbackgrounds.backgrounds.backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-bp23-winterfest-lobby-square-2048x2048-2048x2048-277a476e5ca6.png";
        }
        if (build == 23.40) {
            content.dynamicbackgrounds.backgrounds.backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/mostwanted-final-v2-2048x2048-2048x2048-39f2b5041a40.jpg";
        }
    }

    if (season == 24) {
        content.dynamicbackgrounds.backgrounds.backgrounds[0].backgroundimage = "https://cdn2.unrealengine.com/t-ch4s2-bp-lobby-4096x2048-edde08d15f7e.jpg";
    }

    res.json(content);
})

server.get("/content/api/pages/fortnite-game/media-events", async (req, res) => {
    const content = require("../responses/media-events.json");
    res.json(content);
})

server.get("/content/api/pages/fortnite-game/media-events-v2", async (req, res) => {
    const content = require("../responses/media-events-v2.json");
    res.json(content);
})

module.exports = server;