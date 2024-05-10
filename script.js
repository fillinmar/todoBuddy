require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const router = require("./routes");
const {connectToMongoDB} = require("./database");
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "build/index.html"))
})

app.use("/api", router);

const port = process.env.PORT || 5000;

async function startServer() {
    await connectToMongoDB();
    app.listen(port, ()=> {
        console.log(`server is listening on http://localhost:${port}`)
    })
}

startServer();