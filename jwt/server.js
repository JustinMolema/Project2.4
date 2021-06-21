require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const http = require('http');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors({
    origin: "*"
}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Findr'
});

const games = require('./routes/admin/games')(express, authenticateToken, connection);
const profile = require('./routes/user/profile')(express, authenticateToken, connection);
const friends = require('./routes/user/friends')(express, authenticateToken, connection);
const friendrequests = require('./routes/user/friendrequests')(express, authenticateToken, connection);
const blockedusers = require('./routes/user/blockedusers')(express, authenticateToken, connection);
const reportedusers = require('./routes/admin/reportedusers')(express, authenticateToken, connection);
const supporttickets = require('./routes/admin/supporttickets')(express, authenticateToken, connection);
const users = require('./routes/admin/users')(express, authenticateToken, connection);
const account = require('./routes/user/account')(express, generateAccessToken, connection);
const adminaccount = require('./routes/admin/adminaccount')(express, generateAccessToken, connection);
app.use(games, profile, friends, friendrequests, blockedusers, reportedusers, supporttickets, users, account, adminaccount);


const chatport = '8081';
app.set('port', chatport);
var server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        methods: ["GET", "POST"]
    }
});


io.use((socket, next) => {
    const username = socket.handshake.auth.username;

    socket.username = username;
    socket.sessionID = socket.handshake.auth.sessionID;
    next();
});


io.on('connection', (socket) => {
	console.log("aaa");
    socket.emit("session", {
        sessionID: socket.sessionID,
    });

    socket.join(socket.sessionID);

    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
            userID: socket.sessionID,
            username: socket.username,
        });
    }

    socket.emit("users", users);

    socket.onAny((event, ...args) => {
        console.log("Event: " + event + " Args: " + args)
    })

    socket.broadcast.emit("user connected", {
        userID: socket.sessionID,
        username: socket.username,
    });

    socket.on('join', function (data) {
        socket.join(data.room);
    });

    socket.on('leave', function (data) {
        socket.leave(data.room);
    });

    socket.on('message', function (data) {
        socket.to(data.room).emit('new message', {userID: data.userID, user: data.user, message: data.message});
    });

    socket.on("private message", (data) => {
        socket.to(data.room).emit("private message", {
            userID: socket.sessionID,
            user: data.user,
            message: data.message
        });
    });

    socket.on("disconnect", () => {
        socket.broadcast.emit("user disconnected", {
            userID: socket.sessionID,
            username: socket.username,
        });
    });
});

server.listen(chatport);

const port = process.env.PORT || 8080;

app.listen(8001, () => {
    console.log('Server started!');
});


// check token
app.post('/api/token/refresh', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const refreshToken = req.body.token;

    if (refreshToken == null) return res.sendStatus(401)
    // if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({name: user.name})
        res.json({accessToken: accessToken})
    })
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '25m'});
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user;
        next()
    })
}

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`)
})
