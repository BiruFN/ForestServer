const express = require("express");
const server = express.Router();
const fs = require("fs");
const functions = require("../structs/functions");

server.post("/fortnite/api/game/v2/profile/:accountId/client/QueryProfile", async (req, res) => {
    const accountId = req.params.accountId;
    const profileId = req.query.profileId;

    const season = await functions.GetSeason(req.headers["user-agent"]);

    if (!fs.existsSync(`./profiles/${profileId}.json`)) {
        res.status(403);
        res.json({
            "errorCode": "errors.com.epicgames.modules.profiles.operation_forbidden",
            "errorMessage": `Unable to find template configuration for profile ${profileId}`,
            "messageVars": [profileId],
            "numericErrorCode": 12813,
            "originatingService": "fortnite",
            "intent": "prod-live"
        });
        return;
    }

    const profile = require(`../profiles/${profileId}.json`);

    if (profileId == "athena") {
        profile.profile.stats.attributes.season_num = season;
    }

    fs.writeFileSync(`./profiles/${profileId}.json`, JSON.stringify(profile, null, 4));

    res.json({
        "profileRevision": profile.profile.rvn,
        "profileId": profileId,
        "profileChangesBaseRevision": profile.profile.rvn,
        "profileChanges": [profile],
        "profileCommandRevision": profile.profile.commandRevision,
        "serverTime": new Date(),
        "responseVersion": 1
    });
})

server.post("/fortnite/api/game/v2/profile/:accountId/client/ClientQuestLogin", async (req, res) => {
    const accountId = req.params.accountId;
    const profileId = req.query.profileId;

    if (!fs.existsSync(`./profiles/${profileId}.json`)) {
        res.status(403);
        res.json({
            "errorCode": "errors.com.epicgames.modules.profiles.operation_forbidden",
            "errorMessage": `Unable to find template configuration for profile ${profileId}`,
            "messageVars": [profileId],
            "numericErrorCode": 12813,
            "originatingService": "fortnite",
            "intent": "prod-live"
        });
        return;
    }

    if (profileId != "athena" && profileId != "campaign") {
        res.status(400);
        res.json({
            "errorCode": "errors.com.epicgames.modules.profiles.invalid_command",
            "errorMessage": `ClientQuestLogin is not valid on player:profile_${profileId} profiles (${profileId})`,
            "messageVars": [
                "ClientQuestLogin",
                `player:profile_${profileId}`,
                profileId
            ],
            "numericErrorCode": 12801,
            "originatingService": "fortnite",
            "intent": "prod-live"
        });
        return;
    }

    const profile = require(`../profiles/${profileId}.json`);

    profile.profile.updated = new Date();
    profile.profile.rvn = profile.profile.rvn += 1;
    profile.profile.commandRevision = profile.profile.commandRevision += 1;

    fs.writeFileSync(`./profiles/${profileId}.json`, JSON.stringify(profile, null, 4));

    res.json({
        "profileRevision": profile.profile.rvn,
        "profileId": profileId,
        "profileChangesBaseRevision": profile.profile.rvn,
        "profileChanges": [profile],
        "profileCommandRevision": profile.profile.commandRevision,
        "serverTime": new Date(),
        "responseVersion": 1
    });
})

server.post("/fortnite/api/game/v2/profile/:accountId/client/SetCosmeticLockerSlot", async (req, res) => {
    const accountId = req.params.accountId;
    const profileId = req.query.profileId;

    if (!fs.existsSync(`./profiles/${profileId}.json`)) {
        res.status(403);
        res.json({
            "errorCode": "errors.com.epicgames.modules.profiles.operation_forbidden",
            "errorMessage": `Unable to find template configuration for profile ${profileId}`,
            "messageVars": [profileId],
            "numericErrorCode": 12813,
            "originatingService": "fortnite",
            "intent": "prod-live"
        });
        return;
    }

    if (profileId != "athena" && profileId != "campaign") {
        res.status(400);
        res.json({
            "errorCode": "errors.com.epicgames.modules.profiles.invalid_command",
            "errorMessage": `SetCosmeticLockerSlot is not valid on player:profile_${profileId} profiles (${profileId})`,
            "messageVars": [
                "SetCosmeticLockerSlot",
                `player:profile_${profileId}`,
                profileId
            ],
            "numericErrorCode": 12801,
            "originatingService": "fortnite",
            "intent": "prod-live"
        });
        return;
    }

    const profile = require(`../profiles/${profileId}.json`);

    const lockerItem = req.body.lockerItem;
    const category = req.body.category;
    const itemToSlot = req.body.itemToSlot;
    const slotIndex = req.body.slotIndex;
    const variantUpdates = req.body.variantUpdates;
    const optLockerUseCountOverride = req.body.optLockerUseCountOverride;

    switch (category) {
        case "Pickaxe":
            profile.profile.items[lockerItem].attributes.locker_slots_data.slots.Pickaxe.items[slotIndex] = itemToSlot;
            profile.profile.items[lockerItem].attributes.locker_slots_data.slots.Pickaxe.activeVariants[slotIndex] = { "variants": variantUpdates };
            break;
        case "Dance":
            if (slotIndex == -1) {
                for (var i = 0; i < 6; i++) {
                    profile.profile.items[lockerItem].attributes.locker_slots_data.slots.Dance.items[i] = itemToSlot;
                    profile.profile.items[lockerItem].attributes.locker_slots_data.slots.Dance.activeVariants[i] = { "variants": variantUpdates };
                }
            }
            else {
                profile.profile.items[lockerItem].attributes.locker_slots_data.slots.Dance.items[slotIndex] = itemToSlot;
                profile.profile.items[lockerItem].attributes.locker_slots_data.slots.Dance.activeVariants[slotIndex] = { "variants": variantUpdates };
            }
            break;
        case "Glider":
            profile.profile.items[lockerItem].attributes.locker_slots_data.slots.Glider.items[slotIndex] = itemToSlot;
            profile.profile.items[lockerItem].attributes.locker_slots_data.slots.Glider.activeVariants[slotIndex] = { "variants": variantUpdates };
            break;
        case "Character":
            profile.profile.items[lockerItem].attributes.locker_slots_data.slots.Character.items[slotIndex] = itemToSlot;
            profile.profile.items[lockerItem].attributes.locker_slots_data.slots.Character.activeVariants[slotIndex] = { "variants": variantUpdates };
            break;
        case "Backpack":
            profile.profile.items[lockerItem].attributes.locker_slots_data.slots.Backpack.items[slotIndex] = itemToSlot;
            profile.profile.items[lockerItem].attributes.locker_slots_data.slots.Backpack.activeVariants[slotIndex] = { "variants": variantUpdates };
            break;
        case "ItemWrap":
            if (slotIndex == -1) {
                for (var i = 0; i < 7; i++) {
                    profile.profile.items[lockerItem].attributes.locker_slots_data.slots.ItemWrap.items[i] = itemToSlot;
                    profile.profile.items[lockerItem].attributes.locker_slots_data.slots.ItemWrap.activeVariants[i] = { "variants": variantUpdates };
                }
            }
            else {
                profile.profile.items[lockerItem].attributes.locker_slots_data.slots.ItemWrap.items[slotIndex] = itemToSlot;
                profile.profile.items[lockerItem].attributes.locker_slots_data.slots.ItemWrap.activeVariants[slotIndex] = { "variants": variantUpdates };
            }
            break;
        case "LoadingScreen":
            profile.profile.items[lockerItem].attributes.locker_slots_data.slots.LoadingScreen.items[slotIndex] = itemToSlot;
            profile.profile.items[lockerItem].attributes.locker_slots_data.slots.LoadingScreen.activeVariants[slotIndex] = { "variants": variantUpdates };
            break;
        case "MusicPack":
            profile.profile.items[lockerItem].attributes.locker_slots_data.slots.MusicPack.items[slotIndex] = itemToSlot;
            profile.profile.items[lockerItem].attributes.locker_slots_data.slots.MusicPack.activeVariants[slotIndex] = { "variants": variantUpdates };
            break;
        case "SkyDiveContrail":
            profile.profile.items[lockerItem].attributes.locker_slots_data.slots.SkyDiveContrail.items[slotIndex] = itemToSlot;
            profile.profile.items[lockerItem].attributes.locker_slots_data.slots.SkyDiveContrail.activeVariants[slotIndex] = { "variants": variantUpdates };
            break;
        default:
            break;
    }

    profile.profile.updated = new Date();
    profile.profile.rvn = profile.profile.rvn += 1;
    profile.profile.commandRevision = profile.profile.commandRevision += 1;

    fs.writeFileSync(`./profiles/${profileId}.json`, JSON.stringify(profile, null, 4));

    res.json({
        "profileRevision": profile.profile.rvn,
        "profileId": profileId,
        "profileChangesBaseRevision": profile.profile.rvn,
        "profileChanges": [profile],
        "profileCommandRevision": profile.profile.commandRevision,
        "serverTime": new Date(),
        "responseVersion": 1
    });
})

server.post("/fortnite/api/game/v2/profile/:accountId/client/SetCosmeticLockerBanner", async (req, res) => {
    const accountId = req.params.accountId;
    const profileId = req.query.profileId;

    if (!fs.existsSync(`./profiles/${profileId}.json`)) {
        res.status(403);
        res.json({
            "errorCode": "errors.com.epicgames.modules.profiles.operation_forbidden",
            "errorMessage": `Unable to find template configuration for profile ${profileId}`,
            "messageVars": [profileId],
            "numericErrorCode": 12813,
            "originatingService": "fortnite",
            "intent": "prod-live"
        });
        return;
    }

    if (profileId != "athena" && profileId != "campaign") {
        res.status(400);
        res.json({
            "errorCode": "errors.com.epicgames.modules.profiles.invalid_command",
            "errorMessage": `SetCosmeticLockerBanner is not valid on player:profile_${profileId} profiles (${profileId})`,
            "messageVars": [
                "SetCosmeticLockerBanner",
                `player:profile_${profileId}`,
                profileId
            ],
            "numericErrorCode": 12801,
            "originatingService": "fortnite",
            "intent": "prod-live"
        });
        return;
    }

    const profile = require(`../profiles/${profileId}.json`);

    const lockerItem = req.body.lockerItem;
    const bannerIconTemplateName = req.body.bannerIconTemplateName;
    const bannerColorTemplateName = req.body.bannerColorTemplateName;

    profile.profile.items[lockerItem].attributes.banner_icon_template = bannerIconTemplateName;
    profile.profile.items[lockerItem].attributes.banner_color_template = bannerColorTemplateName;

    profile.profile.updated = new Date();
    profile.profile.rvn = profile.profile.rvn += 1;
    profile.profile.commandRevision = profile.profile.commandRevision += 1;

    fs.writeFileSync(`./profiles/${profileId}.json`, JSON.stringify(profile, null, 4));

    res.json({
        "profileRevision": profile.profile.rvn,
        "profileId": profileId,
        "profileChangesBaseRevision": profile.profile.rvn,
        "profileChanges": [profile],
        "profileCommandRevision": profile.profile.commandRevision,
        "serverTime": new Date(),
        "responseVersion": 1
    });
})

server.post("/fortnite/api/game/v2/profile/:accountId/client/SetCosmeticLockerName", async (req, res) => {
    const accountId = req.params.accountId;
    const profileId = req.query.profileId;

    if (!fs.existsSync(`./profiles/${profileId}.json`)) {
        res.status(403);
        res.json({
            "errorCode": "errors.com.epicgames.modules.profiles.operation_forbidden",
            "errorMessage": `Unable to find template configuration for profile ${profileId}`,
            "messageVars": [profileId],
            "numericErrorCode": 12813,
            "originatingService": "fortnite",
            "intent": "prod-live"
        });
        return;
    }

    if (profileId != "athena" && profileId != "campaign") {
        res.status(400);
        res.json({
            "errorCode": "errors.com.epicgames.modules.profiles.invalid_command",
            "errorMessage": `SetCosmeticLockerName is not valid on player:profile_${profileId} profiles (${profileId})`,
            "messageVars": [
                "SetCosmeticLockerName",
                `player:profile_${profileId}`,
                profileId
            ],
            "numericErrorCode": 12801,
            "originatingService": "fortnite",
            "intent": "prod-live"
        });
        return;
    }

    const profile = require(`../profiles/${profileId}.json`);

    const lockerItem = req.body.lockerItem;
    const name = req.body.name;
        
    profile.profile.items[lockerItem].attributes.locker_name = name;

    profile.profile.updated = new Date();
    profile.profile.rvn = profile.profile.rvn += 1;
    profile.profile.commandRevision = profile.profile.commandRevision += 1;

    fs.writeFileSync(`./profiles/${profileId}.json`, JSON.stringify(profile, null, 4));

    res.json({
        "profileRevision": profile.profile.rvn,
        "profileId": profileId,
        "profileChangesBaseRevision": profile.profile.rvn,
        "profileChanges": [profile],
        "profileCommandRevision": profile.profile.commandRevision,
        "serverTime": new Date(),
        "responseVersion": 1
    });
})

server.post("/fortnite/api/game/v2/profile/:accountId/client/SetItemFavoriteStatusBatch", async (req, res) => {
    const accountId = req.params.accountId;
    const profileId = req.query.profileId;

    if (!fs.existsSync(`./profiles/${profileId}.json`)) {
        res.status(403);
        res.json({
            "errorCode": "errors.com.epicgames.modules.profiles.operation_forbidden",
            "errorMessage": `Unable to find template configuration for profile ${profileId}`,
            "messageVars": [profileId],
            "numericErrorCode": 12813,
            "originatingService": "fortnite",
            "intent": "prod-live"
        });
        return;
    }

    if (profileId != "athena" && profileId != "campaign") {
        res.status(400);
        res.json({
            "errorCode": "errors.com.epicgames.modules.profiles.invalid_command",
            "errorMessage": `SetItemFavoriteStatusBatch is not valid on player:profile_${profileId} profiles (${profileId})`,
            "messageVars": [
                "SetItemFavoriteStatusBatch",
                `player:profile_${profileId}`,
                profileId
            ],
            "numericErrorCode": 12801,
            "originatingService": "fortnite",
            "intent": "prod-live"
        });
        return;
    }

    const profile = require(`../profiles/${profileId}.json`);

    const itemIds = req.body.itemIds;
    const itemFavStatus = req.body.itemFavStatus;
    
    for (var i in itemIds) {
        profile.profile.items[itemIds[i]].attributes.favorite = itemFavStatus[i];
    }

    profile.profile.updated = new Date();
    profile.profile.rvn = profile.profile.rvn += 1;
    profile.profile.commandRevision = profile.profile.commandRevision += 1;

    fs.writeFileSync(`./profiles/${profileId}.json`, JSON.stringify(profile, null, 4));

    res.json({
        "profileRevision": profile.profile.rvn,
        "profileId": profileId,
        "profileChangesBaseRevision": profile.profile.rvn,
        "profileChanges": [profile],
        "profileCommandRevision": profile.profile.commandRevision,
        "serverTime": new Date(),
        "responseVersion": 1
    });
})

server.post("/fortnite/api/game/v2/profile/:accountId/client/SetItemArchivedStatusBatch", async (req, res) => {
    const accountId = req.params.accountId;
    const profileId = req.query.profileId;

    if (!fs.existsSync(`./profiles/${profileId}.json`)) {
        res.status(403);
        res.json({
            "errorCode": "errors.com.epicgames.modules.profiles.operation_forbidden",
            "errorMessage": `Unable to find template configuration for profile ${profileId}`,
            "messageVars": [profileId],
            "numericErrorCode": 12813,
            "originatingService": "fortnite",
            "intent": "prod-live"
        });
        return;
    }

    if (profileId != "athena" && profileId != "campaign") {
        res.status(400);
        res.json({
            "errorCode": "errors.com.epicgames.modules.profiles.invalid_command",
            "errorMessage": `SetItemArchivedStatusBatch is not valid on player:profile_${profileId} profiles (${profileId})`,
            "messageVars": [
                "SetItemArchivedStatusBatch",
                `player:profile_${profileId}`,
                profileId
            ],
            "numericErrorCode": 12801,
            "originatingService": "fortnite",
            "intent": "prod-live"
        });
        return;
    }

    const profile = require(`../profiles/${profileId}.json`);

    const itemIds = req.body.itemIds;
    const archived = req.body.archived;
    
    for (var i in itemIds) {
        profile.profile.items[itemIds[i]].attributes.archived = archived;
    }

    profile.profile.updated = new Date();
    profile.profile.rvn = profile.profile.rvn += 1;
    profile.profile.commandRevision = profile.profile.commandRevision += 1;

    fs.writeFileSync(`./profiles/${profileId}.json`, JSON.stringify(profile, null, 4));

    res.json({
        "profileRevision": profile.profile.rvn,
        "profileId": profileId,
        "profileChangesBaseRevision": profile.profile.rvn,
        "profileChanges": [profile],
        "profileCommandRevision": profile.profile.commandRevision,
        "serverTime": new Date(),
        "responseVersion": 1
    });
})

server.post("/fortnite/api/game/v2/profile/:accountId/client/*", async (req, res) => {
    const accountId = req.params.accountId;
    const profileId = req.query.profileId;

    if (!fs.existsSync(`./profiles/${profileId}.json`)) {
        res.status(403);
        res.json({
            "errorCode": "errors.com.epicgames.modules.profiles.operation_forbidden",
            "errorMessage": `Unable to find template configuration for profile ${profileId}`,
            "messageVars": [profileId],
            "numericErrorCode": 12813,
            "originatingService": "fortnite",
            "intent": "prod-live"
        });
        return;
    }

    const profile = require(`../profiles/${profileId}.json`);

    profile.profile.updated = new Date();
    profile.profile.rvn = profile.profile.rvn += 1;
    profile.profile.commandRevision = profile.profile.commandRevision += 1;

    fs.writeFileSync(`./profiles/${profileId}.json`, JSON.stringify(profile, null, 4));

    res.json({
        "profileRevision": profile.profile.rvn,
        "profileId": profileId,
        "profileChangesBaseRevision": profile.profile.rvn,
        "profileChanges": [profile],
        "profileCommandRevision": profile.profile.commandRevision,
        "serverTime": new Date(),
        "responseVersion": 1
    });
})

module.exports = server;