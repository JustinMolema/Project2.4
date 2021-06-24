require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors({
    origin: "*"
}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
	limit: '100mb',
    password: '',
    database: 'Findr'
});

require('./routes/user/chat')();
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


const port = process.env.PORT || 8080;

app.listen(8001, () => {
    console.log('Server started!');
});


app.post('/api/token/refresh', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const refreshToken = req.body.token;

    if (refreshToken == null) return res.sendStatus(401)
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
