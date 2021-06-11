require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const jwt = require('jsonwebtoken')
const mysql = require('mysql')
const test = require('./api.js');
const http = require('http')
const {Console} = require('console')
const bcrypt = require('bcrypt')

let refreshTokens = []

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Findr'
});

// connection.connect(function (err) {
// 	if (err) throw err;
// })

const chatport = '8081';
app.set('port', chatport);
var server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        methods: ["GET", "POST"]
    }
});


io.on('connection', (socket) => {
    console.log("aaaa");
    socket.on('join', function (data) {
        console.log(data)
        socket.join(data.room);
        io.emit('new user joined', {user: data.user, message: 'has joined  room.'});
    });

    socket.on('leave', function (data) {
        io.emit('left room', {user: data.user, message: 'has left room.'});
        socket.leave(data.room);
    });

    socket.on('message', function (data) {
        console.log(data);
        socket.to(data.room).emit('new message', {user: data.user, message: data.message});
    })
});

server.listen(chatport);

const port = process.env.PORT || 8080;

app.listen(8001, () => {
    console.log('Server started!')
})

app.route('/api/users').get(authenticateToken, (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    connection.query('SELECT * FROM users', function (err, result, fields) {
        if (err) throw err;
        res.send(result);
        res.send(result);
    })
})

app.route('/api/games').get(authenticateToken, (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    connection.query('SELECT * FROM games', function (err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    })
})

app.route('/api/chats').get(authenticateToken, (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    connection.query('SELECT * FROM chats', function (err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    })
})

// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
//                 USER PROFILE CALLS
// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
app.route('/user/profile/:userID').get(authenticateToken, (req, res) => {
    let user_id = req.params['userID'];
    res.header("Access-Control-Allow-Origin", "*");

    connection.query('SELECT Username, Email, Warnings, Profile_picture FROM users WHERE User_ID = ?', [user_id], function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            if (result.length > 0) {
                result[0].Profile_picture = result[0].Profile_picture.toString();
                res.send(JSON.stringify(result));
            }
        }
    })
})

app.route('/user/profile/password').put(authenticateToken, (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const user_id = req.body.userID;
    const new_pass = req.body.newPass;
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(new_pass, salt, function (err, hash) {
            connection.query('UPDATE users SET Password = ? WHERE User_ID = ?', [hash, user_id], function (err, result, fields) {
                if (err) return res.send(err);
            })
        })
    })
})

app.route('/user/profile/username').put(authenticateToken, (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const user_id = req.body.userID;
    const new_username = req.body.newName;
    connection.query('UPDATE users SET Username = ? WHERE users.User_ID = ?', [new_username, user_id], function (err, result, fields) {
        if (err) return res.send(err)
    })
})

app.route('/user/profile/picture').put(authenticateToken, (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const user_id = req.body.userID
    const new_profile_pic = req.body.newPic

    connection.query('UPDATE users SET Profile_picture = ? WHERE users.User_ID = ?', [new_profile_pic, user_id], function (err, result, fields) {
        if (err) {
            res.send(err);
        }
    });
})

// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
//                 USER FRIEND CALLS
// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
app.route('/user/friends/:userID').get(authenticateToken, async (req, res) => {
    let user_id = req.params['userID']
    res.header("Access-Control-Allow-Origin", "*");
    console.log(user_id)
    connection.query('SELECT User_ID, Username FROM user_friends_with_user JOIN users ON users.User_ID = user_friends_with_user.UserTwo WHERE UserOne = ?', [user_id], await function (err, result, fields) {
        if (err) return res.sendStatus(400);
        friendInfo = JSON.stringify(result);
        res.send([result]);
    })
})

app.route('/user/friend-requests/accept').post(authenticateToken, async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const accepterID = req.body.accepterID;
    const senderID = req.body.senderID;
    connection.query('INSERT INTO user_friends_with_user (UserOne, UserTwo) VALUES (' + accepterID + ', ' + senderID + ');', function (err, result, fields) {
        console.log(err)
    })
    connection.query('INSERT INTO user_friends_with_user (UserOne, UserTwo) VALUES (' + senderID + ', ' + accepterID + ');', function (err, result, fields) {
        console.log(err)
    })
    connection.query('DELETE FROM user_befriends_user WHERE UserOne = ' + accepterID + ' AND UserTwo = ' + senderID, function (err, result, fields) {
        console.log(err)
    })

})

app.route('/user/friends/friend-requests/remove').post(authenticateToken, async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const accepterID = req.body.accepterID;
    const senderID = req.body.senderID;
    connection.query('DELETE FROM user_befriends_user WHERE UserOne = ' + accepterID + ' AND UserTwo = ' + senderID, function (err, result, fields) {
        if (err) return res.send(err);
    })

})

app.route('/user/friends/delete').post(authenticateToken, async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const UserOne = req.body.userOne;
    const UserTwo = req.body.userTwo;
    connection.query('DELETE FROM user_friends_with_user WHERE UserOne = ' + UserOne + ' AND UserTwo = ' + UserTwo, function (err, result, fields) {
        console.log(err)
        if (err) return res.send(err)
    })

    connection.query('DELETE FROM user_friends_with_user WHERE UserOne = ' + UserTwo + ' AND UserTwo = ' + UserOne, function (err, result, fields) {
        console.log(err)
        if (err) return res.send(err);
    })
    res.json({status: "ok"})
})

app.route('/user/friends/block').post(authenticateToken, async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const UserOne = req.body.userOne;// blocker
    const UserTwo = req.body.userTwo;// person getting blocked
    connection.query('INSERT INTO user_blocked_user (user_blocker, user_blockee) VALUES (' + UserOne + ', ' + UserTwo + ');', function (err, result, fields) {
        if (err) return res.send(err);
    })

    connection.query('DELETE FROM user_friends_with_user WHERE UserOne = ' + UserOne + ' AND UserTwo = ' + UserTwo, function (err, result, fields) {
        if (err) return res.send(err);
    })

    connection.query('DELETE FROM user_friends_with_user WHERE UserOne = ' + UserTwo + ' AND UserTwo = ' + UserOne, function (err, result, fields) {
        if (err) return res.send(err);
    })

    connection.query('DELETE FROM user_befriends_user WHERE UserOne = ' + UserOne + ' AND UserTwo = ' + UserTwo, function (err, result, fields) {
        if (err) return res.send(err);
    })

    connection.query('DELETE FROM user_befriends_user WHERE UserOne = ' + UserTwo + ' AND UserTwo = ' + UserOne, function (err, result, fields) {
        console.log(err)
    })
    res.json({status: "ok"})
})

app.route('/user/friends/friend-requests/:userID').get(authenticateToken, async (req, res) => {
    let user_id = req.params['userID']
    res.header("Access-Control-Allow-Origin", "*");
    connection.query('SELECT User_ID, Username FROM user_befriends_user AS FR JOIN users ON users.User_ID = FR.UserTwo WHERE FR.UserOne = ?', [user_id], function (err, result, fields) {
        if (err) return res.send(err);
        let friendRequests = JSON.stringify(result);
        res.send([result]);
    })
})

app.route('/api/sendfriendrequest').post(authenticateToken, async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const UserOne = req.body.userOne;// sender
    const UserTwo = req.body.userTwo;// receiver
    connection.query('INSERT INTO user_befriends_user (UserOne, UserTwo) VALUES (' + UserTwo + ', ' + UserOne + ');', function (err, result, fields) {
        if (err) throw err;
        let friendRequests = JSON.stringify(result);
        res.send([result]);
    })
})

app.route('/user/friends/blocked/:userID').get(authenticateToken, async (req, res) => {
    let user_id = req.params['userID']
    res.header("Access-Control-Allow-Origin", "*");
    connection.query('SELECT User_ID, Username FROM user_blocked_user AS BU JOIN users ON users.User_ID = BU.user_blockee WHERE BU.user_blocker = ?', [user_id], function (err, result, fields) {
        if (err) throw err;
        let BlockedInfo = JSON.stringify(result);
        res.send([result]);
    })
})

app.route('/user/friends/blocked/unblock').post(authenticateToken, async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const UserOne = req.body.userOne;// blocker
    const UserTwo = req.body.userTwo;// person getting blocked
    connection.query('DELETE FROM user_blocked_user WHERE user_blocker = ' + UserOne + ' AND user_blockee = ' + UserTwo, function (err, result, fields) {
        if (err) throw err;
        let BlockedInfo = JSON.stringify(result);
        res.send([result]);
    })
})


app.route('/api/supporttickets').get((req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    connection.query('SELECT * FROM support_tickets', function (err, result, fields) {
        if (err) res.send(err);
        res.send(result);
    })
})

app.route('/api/addgame').post((req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    connection.connect(function (err) {
        connection.query('insert into games (Name, Category, Description, Image) VALUES (?,?,?,?)', [req.body.name, req.body.category, req.body.description, "imagedestroyed2"], function (err, result, fields) {
            if (err) {
                res.send(err)
            } else {
                res.json({status: "ok"})
            }
        })
    })
})

app.route('/api/deletegame/:name').delete((req, res) => {
    let name = req.params['name']

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");

    connection.connect(function (req, err) {
        connection.query('DELETE FROM games WHERE Name = ?', [name], function (err, result, fields) {
            if (err) {
                res.sendStatus(400);
            } else {
                res.json({status: "ok"})
            }
        })
    })
})

app.post('/user/login', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const username = req.body.username;
    const pw = req.body.password;

    connection.connect(function (req, err) {
        connection.query('SELECT User_ID, password FROM users WHERE username = ?', [username], function (err, result, fields) {

            const dbPassword = JSON.parse(JSON.stringify(result[0].password));
            const User_ID = JSON.parse(JSON.stringify(result[0].User_ID));
            if (err) {
                res.send(err)
            }

            bcrypt.compare(pw, dbPassword, (err, result) => {
                console.log("compare: " + result)
                if (err) {
                    res.sendStatus(403).send("Wrong password")
                }

                if (result) {
                    const user = {name: username}
                    const accessToken = generateAccessToken(user);
                    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
                    refreshTokens.push(refreshToken)
                    res.json({
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        password: dbPassword,
                        userID: User_ID,
                        status: 200
                    })
                } else {
                    res.send(err)
                }
            })
        })
    })
})

// api call to create user in database
app.post('/user/login/signup', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    // encode so that special symbols dont destroy DB
    const username = encodeURIComponent(req.body.username);
    const password = encodeURIComponent(req.body.password);
    const email = encodeURIComponent(req.body.email);

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {

            connection.connect(function (req, err) {
                connection.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hash, email], function (err, result, fields) {

                    if (err) {
                        return res.send(err);
                    } else {
                        res.json({status: 200});
                    }
                })
            })
        });
    });
})

app.post('/api/token', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const refreshToken = req.body.token;
    /*console.log(refreshToken == null);
    console.log(refreshToken);
    console.log(typeof refreshToken);
    console.log(refreshTokens.includes(refreshToken));
    console.log(typeof refreshToken[0]);*/

    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    //console.log("here");
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
    // Bearer TOKEN
}


app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});

app.use((req, res, next) => {
    res.setHeader('Acces-Control-Allow-Origin', '*');
    res.setHeader('Acces-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Acces-Contorl-Allow-Methods', 'Content-Type', 'Authorization');
    next();
})
app.use(cors())
