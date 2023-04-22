const express = require("express");
const server = express.Router();
const functions = require("../structs/functions");

server.get("/hotconfigs/v2/:fileName", async (req, res) => {
    const hotconfigs = require(`../responses/hotconfigs/${req.params.fileName}`);
    res.json(hotconfigs);
})

module.exports = server;