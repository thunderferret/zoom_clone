import express from "express";
import WebSocket from "ws";
import http from "http";

const app = express();


app.set("view engine","pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname +"/public"))

app.get("/", (_,res) => res.render("home"));
app.get("/*",(_,res)=> res.redirect("/"));

/*
const handleListen = () => console.log(`Listening on Http : } `)
console.log("Hello")

app.listen(3000);

app.listen(3000, handleListen);
*/

const handleListen = () => console.log(`Listening on http://localhost:3000`);

//Can Access Server as a variable
const server = http.createServer(app);

//By pass the server as parameter, we can run both http and WebSocket both
// * not a neccessary, but if you want to run 2 server at once
const wss = new WebSocket.Server({server})


wss.on("connection",(socket) => {
    socket.on("close",() => console.log("Disconnected from Browswer"))
    socket.on("message", (message)=>{
        console.log(message)
    })
    console.log(socket);
});

server.listen(3000,handleListen);