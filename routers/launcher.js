const express = require("express");
const server = express.Router();
const crypto = require("crypto");
const fs = require("fs");
const functions = require("../structs/functions");

server.get("/launcher/api/public/assets/Windows/*/FortniteContentBuilds", async (req, res) => {
    const manifest = fs.readFileSync("./responses/CloudDir/ForestServer.manifest");
    res.json({
        "appName": "FortniteContentBuilds",
        "labelName": "ForestServer",
        "buildVersion": "++Fortnite+Release-23.00-CL-23344627-Windows",
        "catalogItemId": "5cb97847cee34581afdbc445400e2f77",
        "metadata": {},
        "expires": "9999-12-31T23:59:59.999Z",
        "items": {
            "MANIFEST": {
                "signature": "Policy=ForestServer",
                "distribution": "https://download.epicgames.com/",
                "path": "Builds/Fortnite/Content/CloudDir/ForestServer.manifest",
                "hash": crypto.createHash("sha1").update(manifest).digest("hex"),
                "additionalDistributions": []
            }
        },
        "assetId": "FortniteContentBuilds"
    });
})

server.get("/launcher/api/public/distributionpoints", async (req, res) => {
    res.json({
        "distributions": [
            "https://download.epicgames.com/",
            "https://download2.epicgames.com/",
            "https://download3.epicgames.com/",
            "https://download4.epicgames.com/",
            "https://epicgames-download1.akamaized.net/",
            "https://fastly-download.epicgames.com/"
        ]
    });
})

server.get("/Builds/Fortnite/Content/CloudDir/*.ini", async (req, res) => {
    res.set("Content-Type", "application/octet-stream");
    const ini = fs.readFileSync("./responses/CloudDir/ForestServer.ini");
    res.send(ini);
})

server.get("/Builds/Fortnite/Content/CloudDir/*.manifest", async (req, res) => {
    res.set("Content-Type", "application/octet-stream");
    const manifest = fs.readFileSync("./responses/CloudDir/ForestServer.manifest");
    res.send(manifest);
})

module.exports = server;