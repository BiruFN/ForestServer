const express = require("express");
const server = express.Router();
const crypto = require("crypto");
const functions = require("../structs/functions");

server.get("/sdk/v1/default", async (req, res) => {
    const sdk = require("../responses/sdk.json");
    res.json(sdk);
})

server.get("/sdk/v1/product/prod-fn", async (req, res) => {
    const sdk = require("../responses/sdk.json");
    res.json(sdk);
})


server.get("/epic/id/v2/sdk/accounts", async (req, res) => {
    var response = [];
    try {
        req.query.accountId.forEach(accountId => {
            response.push({
                "accountId": accountId,
                "displayName": accountId,
                "preferredLanguage": "en",
                "linkedAccounts": [],
                "cabinedMode": false,
                "empty": false
            })
        })
    }
    catch {
        response.push({
            "accountId": req.query.accountId,
            "displayName": req.query.accountId,
            "preferredLanguage": "en",
            "linkedAccounts": [],
            "cabinedMode": false,
            "empty": false
        })
    }
    res.json(response);
})

server.get("/epic/friends/v1/*/blocklist", async (req, res) => {
    res.json([]);
})


server.post("/auth/v1/oauth/token", async (req, res) => {
    res.json({
        "access_token": crypto.randomBytes(16).toString("hex"),
        "token_type": "bearer",
        "expires_at": "9999-12-31T23:59:59.999Z",
        "features": [],
        "organization_id": crypto.randomBytes(16).toString("hex"),
        "product_id": "prod-fn",
        "sandbox_id": "fn",
        "deployment_id": crypto.randomBytes(16).toString("hex"),
        "expires_in": 115200
    });
})

server.post("/epic/oauth/v2/token", (req, res) => {
    res.json({
        "scope": "basic_profile friends_list openid presence",
        "token_type": "bearer",
        "access_token": crypto.randomBytes(16).toString("hex"),
        "refresh_token": crypto.randomBytes(16).toString("hex"),
        "id_token": crypto.randomBytes(16).toString("hex"),
        "expires_in": 115200,
        "expires_at": "9999-12-31T23:59:59.999Z",
        "refresh_expires_in": 115200,
        "refresh_expires_at": "9999-12-31T23:59:59.999Z",
        "account_id": "forestserver",
        "client_id": "ec684b8c687f479fadea3cb2ad83f5c6",
        "application_id": "fghi4567FNFBKFz3E4TROb0bmPS8h1GW",
        "selected_account_id": "forestserver",
        "merged_accounts": []
    });
})

server.post("/epic/oauth/v2/revoke", async (req, res) => {
    res.status(200);
    res.end();
})

server.post("/epic/oauth/v2/tokenInfo", async (req, res) => {
    res.status(200);
    res.end();
})

module.exports = server;