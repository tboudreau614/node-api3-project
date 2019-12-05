const express = require("express");

// const server = express();

const server = require('./server.js')

server.use(express.json());

server.get("/", (req, res) => {
    res.send({api: "api is responsive"});
})

const port = 6000;
server.listen(port, () => 
    console.log(`api running on port ${port}`)
);