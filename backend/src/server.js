const express = require("express");
const cors = require("cors");
const { runStressTest } = require("./stressEngine");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/test", async (req, res) => {
    const { url, requests, concurrency } = req.body;

    const result = await runStressTest(url, requests, concurrency);

    res.json(result);
});

app.listen(8080, () => {
    console.log("FluxForge backend running on port 8080");
});
app.get("/", (req, res) => {
    res.send("FluxForge backend is running 🚀");
});