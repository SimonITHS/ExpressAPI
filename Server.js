const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());
const port = 3000;

//Temporary placeholder
const NET_API_URL = "http://localhost:5013"; //MongoDB connection G-string
//const AzureConnection = insert Azure string



app.get("/games", async (req, res) => {
    try {
        const response = await globalThis.fetch(`${NET_API_URL}/games`);
        res.json(await response.json());
    } catch {
        res.status(500).json({ error: "Failed to fetch" });
    }
});

app.post("/games", async (req, res) => {
    try {
        const { name, type } = req.body;
        if (!name || !type) return res.status(400).json({ error: "Missing required fields" });

        console.log("Sending to .NET API:", req.body);

        const response = await fetch(`${NET_API_URL}/games`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body)
        });

        res.json({ message: "Data sent", response: await response.json() });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to send data" });
    }
});



app.listen(port, () => {
    console.log("Wallabilla it's running!");
});