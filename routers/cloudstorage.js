const express = require("express");
const server = express.Router();
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const functions = require("../structs/functions");
const CloudStorage = path.join(__dirname, "../cloudstorage/");

server.get("/fortnite/api/cloudstorage/system", async (req, res) => {
    const response = [];
    const dir = await fs.promises.opendir(CloudStorage);
    
    for await (const dirent of dir) {
        const fileName = dirent.name;
        const filePath = CloudStorage + fileName;
	    const fileData = fs.readFileSync(filePath);

	    response.push({
		    "uniqueFilename": fileName,
		    "filename": fileName,
		    "hash": crypto.createHash("sha1").update(fileData).digest("hex"),
		    "hash256": crypto.createHash("sha256").update(fileData).digest("hex"),
		    "length": fileData.length,
		    "contentType": "text/plain",
		    "uploaded": fs.statSync(filePath).mtime,
		    "storageType": "S3",
		    "doNotCache": false
	    })
    }
    res.json(response);
})

server.get("/fortnite/api/cloudstorage/system/config", async (req, res) => {
    res.json({});
})

server.get("/fortnite/api/cloudstorage/system/:fileName", async (req, res) => {
    const fileName = req.params.fileName;
    const filePath = CloudStorage + fileName;
    
    if (fs.existsSync(filePath)) {
        res.set("Content-Type", "application/octet-stream");
        const file = fs.readFileSync(filePath);
        res.send(file);
    } else {
        res.json({
            "error": "file not found"
        });
    }
})


server.get("/fortnite/api/cloudstorage/user/*/*", async (req, res) => {
    res.status(200);
    res.end();
})

server.put("/fortnite/api/cloudstorage/user/*/*", async (req, res) => {
    res.status(204);
    res.end();
})

server.get("/fortnite/api/cloudstorage/user/config", async (req, res) => {
    res.json({});
})

server.get("/fortnite/api/cloudstorage/user/*", async (req, res) => {
    res.json([]);
})

module.exports = server;