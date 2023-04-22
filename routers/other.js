const express = require("express");
const server = express.Router();
const functions = require("../structs/functions");

server.get("/fortnite/api/v2/versioncheck/Windows", async (req, res) => {
    res.json({
        "type": "NO_UPDATE"
    });
})

server.all("/v1/epic-settings/public/users/:accountId/values", async (req, res) => {
    res.json({
        "response": {
            "settings": [
                {
                    "namespace": "profile",
                    "settingName": "allow-non-squad-users-to-see-my-username",
                    "effectiveValue": true,
                    "effectiveSource": "preference",
                    "parentLimit": true
                },
                {
                    "namespace": "profile",
                    "settingName": "can-see-player-usernames-from-other-squads",
                    "effectiveValue": true,
                    "effectiveSource": "preference",
                    "parentLimit": true
                },
                {
                    "namespace": "chat",
                    "settingName": "filter-out-mature-language",
                    "effectiveValue": false,
                    "effectiveSource": "preference",
                    "parentLimit": false
                },
                {
                    "namespace": "chat",
                    "settingName": "text",
                    "effectiveValue": "everybody",
                    "effectiveSource": "preference",
                    "parentLimit": "everybody"
                },
                {
                    "namespace": "chat",
                    "settingName": "voice",
                    "effectiveValue": "everybody",
                    "effectiveSource": "preference",
                    "parentLimit": "everybody"
                }
            ]
        },
        "meta": {
            "requestId": req.params.accountId,
            "timestamp": new Date()
        }
    });
})

server.get("/lightswitch/api/service/bulk/status", async (req, res) => {
    res.json([
        {
            "serviceInstanceId": "fortnite",
            "status": "UP",
            "message": "Fortnite is online",
            "maintenanceUri": null,
            "overrideCatalogIds": [
                "a7f138b2e51945ffbfdacc1af0541053"
            ],
            "allowedActions": [],
            "banned": false,
            "launcherInfoDTO": {
                "appName": "Fortnite",
                "catalogItemId": "4fe75bbc5a674f4f9b356b5c90567da5",
                "namespace": "fn"
            }
        }
    ]);
})

server.get("/waitingroom/api/waitingroom", async (req, res) => {
    res.status(204);
    res.end();
})


server.get("/fortnite/api/calendar/v1/timeline", async (req, res) => {
    const season = await functions.GetSeason(req.headers["user-agent"]);
    res.json({
        "channels": {
            "client-events": {
                "states": [
                    {
                        "validFrom": "9999-12-31T23:59:59.999Z",
                        "activeEvents": [],
                        "state": {
                            "activeStorefronts": [],
                            "eventNamedWeights": {},
                            "activeEvents": [],
                            "seasonNumber": season,
                            "seasonTemplateId": `AthenaSeason:athenaseason${season}`,
                            "matchXpBonusPoints": 0,
                            "eventPunchCardTemplateId": "",
                            "seasonBegin": "9999-12-31T23:59:59.999Z",
                            "seasonEnd": "9999-12-31T23:59:59.999Z",
                            "seasonDisplayedEnd": "9999-12-31T23:59:59.999Z",
                            "weeklyStoreEnd": "9999-12-31T23:59:59.999Z",
                            "stwEventStoreEnd": "9999-12-31T23:59:59.999Z",
                            "stwWeeklyStoreEnd": "9999-12-31T23:59:59.999Z",
                            "sectionStoreEnds": {},
                        },
                        "rmtPromotion": "",
                        "dailyStoreEnd": "9999-12-31T23:59:59.999Z"
                    }
                ],
                "cacheExpire": "9999-12-31T23:59:59.999Z"
            }
        },
        "cacheIntervalMins": 1.0,
        "currentTime": new Date()
    });
})


server.get("/eulatracking/api/public/agreements/fn/account/*", async (req, res) => {
    res.status(204);
    res.end();
})

server.get("/fortnite/api/game/v2/enabled_features", async (req, res) => {
    res.json([]);
})


server.get("/fortnite/api/storefront/v2/keychain", async (req, res) => {
    const keychain = require("../responses/keychain.json");
    res.json(keychain);
})

server.get("/fortnite/api/storefront/v2/catalog", async (req, res) => {
    const shop = require("../responses/catalog.json");
    res.json(shop);
})

server.post("/catalog/api/shared/namespace/fn/bulk/offers", async (req, res) => {
    res.status(204);
    res.end();
})


server.get("/party/api/v1/Fortnite/user/*", async (req, res) => {
    res.json({
        "current": [],
        "pending": [],
        "invites": [],
        "pings": []
    });
})

server.get("/statsproxy/api/statsv2/account/:accountId", async (req, res) => {
    res.json({
        "startTime": 0,
        "endTime": 0,
        "stats": {},
        "accountId": req.params.accountId
    });
})

server.get("/socialban/api/public/v1/*", async (req, res) => {
    res.json({
        "bans": [],
        "warnings": []
    });
})

server.get("/api/v1/events/Fortnite/download/*", async (req, res) => {
    res.json({});
})

server.get("/fortnite/api/game/v2/br-inventory/account/*", async (req, res) => {
    res.json({
        "stash": {
            "globalcash": 0
        }
    });
})


server.post("/publickey/v1/publickey", async (req, res) => {
    res.status(200);
    res.end();
})

server.get("/content-controls/*", async (req, res) => {
    res.json({});
})

server.get("/app_installation/status", async (req, res) => {
    res.json({});
})

server.get("/api/content/v2/launch-data", async (req, res) => {
    res.status(204);
    res.json({});
})


server.get("/presence/api/v1/_/*/last-online", async (req, res) => {
    res.json([]);
})

server.get("/friends/api/v1/*/summary", async (req, res) => {
    res.json({
        "friends": [],
        "incoming": [],
        "outgoing": [],
        "suggested": [],
        "blocklist": [],
        "settings": {
            "acceptInvites": "public",
            "mutualPrivacy": "NONE"
        },
        "limitsReached": {
            "incoming": false,
            "outgoing": false,
            "accepted": false
        }
    });
})

server.post("/api/v1/discovery/surface/*", async (req, res) => {
    res.json([]);
})

server.post("/api/v1/fortnite-br/surfaces/motd/target", async (req, res) => {
    res.status(200);
    res.end();
})


server.get("/api/v1/assets/*", async (req, res) => {
    res.json([]);
})

server.post("/api/v1/assets/*", async (req, res) => {
    res.json({
        "FortPlaylistAthena": {
            "meta": {
                "promotion": 0
            },
            "assets": {}
        }
    });
})


server.get("/fortnite/api/game/v2/privacy/account/:accountId", async (req, res) => {
    res.json({
        "accountId": req.params.accountId,
        "optOutOfPublicLeaderboards": false
    });
})

server.post("/fortnite/api/game/v2/privacy/account/:accountId", async (req, res) => {
    res.json({
        "accountId": req.params.accountId,
        "optOutOfPublicLeaderboards": req.body.optOutOfPublicLeaderboards,
    });
})


server.post("/links/api/fn/mnemonic", async (req, res) => {
    res.status(200);
    res.end();
})

server.get("/links/api/fn/mnemonic/:playlist", async (req, res) => {
    res.json({
        "namespace": "fn",
        "accountId": "epic",
        "creatorName": "Epic",
        "mnemonic": req.params.playlist,
        "linkType": "BR:Playlist",
        "metadata": {
            "matchmaking": {
                "override_Playlist": req.params.playlist
            },
        },
        "version": 95,
        "active": true,
        "disabled": false,
        "created": "2021-10-01T00:56:42.938Z",
        "published": "2021-08-03T15:27:17.566Z",
        "descriptionTags": []
    });
})

server.get("/api/v1/links/history/*", async (req, res) => {
    res.json({
        "results": [],
        "hasMore": false
    });
})

module.exports = server;