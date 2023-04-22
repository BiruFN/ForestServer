const express = require("express");
const server = express.Router();
const crypto = require("crypto");
const functions = require("../structs/functions");
var UserName = "ForestServer";

server.post("/account/api/oauth/token", async (req, res) => {
    if (req.body.grant_type == "password") {
        try {
            UserName = req.body.username.split("@")[0];
        }
        catch {
            UserName = req.body.username;
        }
    }
    else {
        UserName = "ForestServer";
    }

    res.json({
        "access_token": crypto.randomBytes(16).toString("hex"),
        "expires_in": 28800,
        "expires_at": "9999-12-31T23:59:59.999Z",
        "token_type": "bearer",
        "refresh_token": crypto.randomBytes(16).toString("hex"),
        "refresh_expires": 86400,
        "refresh_expires_at": "9999-12-31T23:59:59.999Z",
        "account_id": UserName,
        "client_id": "ec684b8c687f479fadea3cb2ad83f5c6",
        "internal_client": true,
        "client_service": "fortnite",
        "displayName": UserName,
        "app": "fortnite",
        "in_app_id": UserName,
        "device_id": crypto.randomBytes(16).toString("hex")
    });
})

server.get("/account/api/oauth/verify", async (req, res) => {
    res.json({
        "access_token": req.headers.authorization.replace("bearer ", ""),
        "expires_in": 28800,
        "expires_at": "9999-12-31T23:59:59.999Z",
        "token_type": "bearer",
        "refresh_token": crypto.randomBytes(16).toString("hex"),
        "refresh_expires": 115200,
        "refresh_expires_at": "9999-12-31T23:59:59.999Z",
        "account_id": UserName,
        "client_id": "ec684b8c687f479fadea3cb2ad83f5c6",
        "internal_client": true,
        "client_service": "fortnite",
        "displayName": UserName,
        "app": "fortnite",
        "in_app_id": UserName,
        "device_id": crypto.randomBytes(16).toString("hex")
    });
})

server.get("/account/api/oauth/exchange", async (req, res) => {
    res.json({
        "expiresInSeconds": 300,
        "code": crypto.randomBytes(16).toString("hex"),
        "creatingClientId": "ec684b8c687f479fadea3cb2ad83f5c6"
    });
})

server.delete("/account/api/oauth/sessions/kill", async (req, res) => {
    res.status(204);
    res.end();
})

server.delete("/account/api/oauth/sessions/kill/*", async (req, res) => {
    res.status(204);
    res.end();
})



server.get("/account/api/public/account/*/externalAuths", async (req, res) => {
    res.json([]);
})

server.get("/account/api/public/account/:accountId", async (req, res) => {
    res.json({
        "id": req.params.accountId,
        "displayName": req.params.accountId,
        "name": "forest",
        "email": "forest@fn.dev",
        "failedLoginAttempts": 0,
        "lastLogin": "9999-12-31T23:59:59.999Z",
        "numberOfDisplayNameChanges": 1,
        "ageGroup": "UNKNOWN",
        "headless": false,
        "country": "BR",
        "lastName": "server",
        "preferredLanguage": "en",
        "lastDisplayNameChange": "9999-12-31T23:59:59.999Z",
        "canUpdateDisplayName": true,
        "tfaEnabled": true,
        "emailVerified": true,
        "minorVerified": false,
        "minorExpected": false,
        "minorStatus": "NOT_MINOR",
        "cabinedMode": false,
        "hasHashedEmail": false
    });
})

server.get("/account/api/public/account", async (req, res) => {
    var response = [];
    try {
        req.query.accountId.forEach(accountId => {
            response.push({
                "id": accountId,
                "displayName": accountId,
                "externalAuths": {}
            })
        })
    }
    catch {
        response.push({
            "id": req.query.accountId,
            "displayName": req.query.accountId,
            "externalAuths": {}
        })
    }
    res.json(response);
})

server.get("/api/v1/public/accounts", async (req, res) => {
    res.json({
        "accounts": []
    });
})

module.exports = server;