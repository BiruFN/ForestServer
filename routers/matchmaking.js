const express = require("express");
const server = express.Router();
const functions = require("../structs/functions");

server.get("/fortnite/api/game/v2/matchmakingservice/ticket/player/*", async (req, res) => {
    res.json({
        "serviceUrl": "ws://forestservermatchmaker.herokuapp.com",
        "ticketType": "mms-player",
        "payload": "69=",
        "signature": "420="
    })
})

server.get("/fortnite/api/matchmaking/session/findPlayer/*", async (req, res) => {
    res.status(200);
    res.end();
})

server.get("/fortnite/api/game/v2/matchmaking/account/:accountId/session/:sessionId", async (req, res) => {
    res.json({
        "accountId": req.params.accountId,
        "sessionId": req.params.sessionId,
        "key": "forestserver"
    })
})

server.get("/fortnite/api/matchmaking/session/:sessionId", async (req, res) => {
    res.json({
        "id": req.params.sessionId,
        "ownerId": "ownerId",
        "ownerName": "[DS]forestserver",
        "serverName": "[DS]forestserver",
        "serverAddress": "127.0.0.1",
        "serverPort": -1,
        "maxPublicPlayers": 220,
        "openPublicPlayers": 175,
        "maxPrivatePlayers": 0,
        "openPrivatePlayers": 0,
        "attributes": {},
        "publicPlayers": [],
        "privatePlayers": [],
        "totalPlayers": 45,
        "allowJoinInProgress": false,
        "shouldAdvertise": false,
        "isDedicated": false,
        "usesStats": false,
        "allowInvites": false,
        "usesPresence": false,
        "allowJoinViaPresence": true,
        "allowJoinViaPresenceFriendsOnly": false,
        "buildUniqueId": 0,
        "lastUpdated": new Date(),
        "started": false
    });
})

server.post("/fortnite/api/matchmaking/session/*/join", async (req, res) => {
    res.status(204);
    res.end();
})

module.exports = server;