const WebSocket = require("ws");
const wss = new WebSocket.Server({ "port": 80 });

wss.on("listening", async (ws) => {
    console.log("[\x1b[33mXMPP\x1b[0m]", "XMPP is up listening (not working)", "\x1b[0m");
})

wss.on("connection", async (ws) => {
    ws.on("message", async () => {
        console.log("[\x1b[33mXMPP\x1b[0m]", "XMPP Connection", "\x1b[0m");
    })

    ws.on("close", async () => {
        console.log("[\x1b[33mXMPP\x1b[0m]", "XMPP Disconnection", "\x1b[0m");
    })
})