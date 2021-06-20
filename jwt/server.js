require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const http = require('http');
const {Console} = require('console');
const bcrypt = require('bcrypt');
const fs = require('fs');


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors({
    origin: "*"
}));


const {Model} = require('objection');
const Knex = require('knex');

let refreshTokens = []

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Findr'
});

const games = require('./routes/games')(express, authenticateToken, connection);
app.use(games)

const profile = require('./routes/profile')(express, authenticateToken, connection);
app.use(profile)

const friends = require('./routes/friends')(express, authenticateToken, connection);
app.use(friends)

const friendrequests = require('./routes/friendrequests')(express, authenticateToken, connection);
app.use(friendrequests)

const knex = Knex({
    client: 'mysql',
    useNullAsDefault: true,
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'Findr'
    }
});

Model.knex(knex);

class User extends Model {

    static get tableName() {
        return 'users'
    }

    static get idColumn() {
        return 'User_ID'
    }

    static get usernameColumn() {
        return 'Username';
    }

    static get passwordColumn() {
        return 'Password';
    }

    static get emailColumn() {
        return 'Email';
    }

    static get warningsColumn() {
        return 'Warnings';
    }

    static get bannedColumn() {
        return 'Banned';
    }

    static get profPicColumn() {
        return 'Profile_picture';
    }
}

class user_friends_with_user extends Model {

    static relationMappings() {
        return {
            User_One: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'user_friends_with_user.UserOne',
                    to: 'users.User_ID'
                }
            },
            User_Two: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'user_friends_with_user.UserTwo',
                    to: 'users.User_ID'
                }
            }
        }
    }

    static get UserOne() {
        return 'UserOne'
    }

    static get UserTwo() {
        return 'UserTwo';
    }
}

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


io.use((socket, next) => {
    const username = socket.handshake.auth.username;

    socket.username = username;
    socket.sessionID = socket.handshake.auth.sessionID;
    next();
});


io.on('connection', (socket) => {
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

app.route('/api/users').get(authenticateToken, (req, res) => {
    connection.query('SELECT * FROM users', function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.put('/api/users/warn/', authenticateToken, (req, res) => {
    const user_ID = req.body.userID;
    connection.query('UPDATE users SET Warnings = Warnings+1 WHERE User_ID = ?', [user_ID], function(err, result, fields) {
        if (err) res.sendStatus(400);
        res.sendStatus(200);
    });
});


app.put('/api/users/ban', authenticateToken, (req, res) => {
    const user_ID = req.body.userID;
    connection.query('UPDATE users SET Banned = 1 WHERE User_ID = ?', [user_ID], function(err, result, fields) {
        if (err) return res.json({status: "error"});
        return res.sendStatus(200);
    })
})

app.put('/api/users/unban', authenticateToken, (req, res) => {
    const user_ID = req.body.userID;
    connection.query('UPDATE users SET Banned = 0 WHERE User_ID = ?', [user_ID], function(err, result, fields) {
        if (err) return res.json({status: "error"});
        return res.sendStatus(200);
    })
})

// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~\\
//                 USER PROFILE CALLS                     \\
// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~\\

// get friends

// block user
app.route('/api/user/:userID/blocked/:blockeduser').post(authenticateToken, async (req, res) => {
    let UserOne = req.params['userID']
    const UserTwo = req.params['blockeduser'];// person getting blocked
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
        if (err) return res.send(err);
    })
    res.json({status: 200})
})

// get blocked users
app.route('/api/user/:userID/blocked').get(authenticateToken, async (req, res) => {
    let user_id = req.params['userID']
    connection.query('SELECT User_ID, Username, Profile_picture FROM user_blocked_user AS BU JOIN users ON users.User_ID = BU.user_blockee WHERE BU.user_blocker = ?', [user_id], function (err, result, fields) {
        if (err) throw err;
        if (result.length > 0) {
            result.forEach(element => {
                if (element.Profile_picture) {
                    element.Profile_picture = element.Profile_picture.toString();
                }
            });
            res.send([result]);
        } else {
            res.send(result);
        }
    })
})

// unblock user
app.route('/api/user/:userID/blocked/:unblockeeID').delete(authenticateToken, async (req, res) => {
    let UserOne = req.params['userID']
    let UserTwo = req.params['unblockeeID'];// person getting blocked

    connection.query('DELETE FROM user_blocked_user WHERE user_blocker = ' + UserOne + ' AND user_blockee = ' + UserTwo, function (err, result, fields) {
        if (err) throw err;
        res.send([result]);
    })
})

app.post('/api/users/reported', (req, res) => {
    connection.query('INSERT INTO reported_users (UserID, Username, Date, Reason, Message) VALUES (?,?,?,?,?)',
        [req.body.userID, req.body.username, new Date(new Date().toUTCString()), req.body.reason, req.body.message], function (err, result, fields) {
            if (err) return res.sendStatus(400);

            res.json({status: 200});
        })
})

app.get('/api/users/reported', authenticateToken, (req, res) => {
    connection.query('SELECT * FROM reported_users', function (err, result, field) {
        if (err) res.sendStatus(418);
        res.send(JSON.stringify(result));
    })
})

app.delete('/api/users/reported/:id', authenticateToken, (req, res) => {
    let name = req.params['id'];
    connection.query('DELETE FROM reported_users WHERE ReportedUserID = ?', [name], function (err, result, fields) {
        if (err) res.sendStatus(418);
        res.sendStatus(200);
    })
})

app.get('/api/support/tickets', authenticateToken, (req, res) => {
    connection.query('SELECT * FROM support_tickets', function (err, result, fields) {
        if (err) res.sendStatus(418);
        res.send(result);
    })
})

app.delete('/api/support/tickets/:id', authenticateToken, (req, res) => {
    let id = req.params['id']
    connection.query('DELETE FROM support_tickets WHERE TicketID = ?', [id], function (err, result, fields) {
        if (err) res.sendStatus(418);
        res.sendStatus(200);
    })
})

// user login
app.post('/api/user/login', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const username = req.body.username;
    const pw = req.body.password;
    connection.connect(function (req, err) {
        connection.query('SELECT User_ID, password FROM users WHERE username = ?', [username], function (err, result, fields) {
            if (err) {
                res.send(err)
            }

            if (result) {
                const dbPassword = JSON.parse(JSON.stringify(result[0].password));
                const User_ID = JSON.parse(JSON.stringify(result[0].User_ID));


                bcrypt.compare(pw, dbPassword, (err, result) => {
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
                        res.json({
                            status: 403,
                            message: err
                        })
                    }
                })
            }
        })
    })
})

// api call to create user in database

app.post('/api/user/signup', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    // encode so that special symbols dont destroy DB

    var pic;
    const username = encodeURIComponent(req.body.username);
    const password = encodeURIComponent(req.body.password);
    const email = encodeURIComponent(req.body.email);
    try {
        pic = fs.readFileSync('default-user.jpg', 'base64')
        pic = encodeURIComponent("data:image/jpg;base64,"+pic)
    } catch (err) {
        pic = null;
    }

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            console.log(hash);
            connection.connect(function (req, err) {
                connection.query('INSERT INTO users (username, password, email, Profile_picture) VALUES (?, ?, ?, ?)', [username, hash, email, pic], function (err, result, fields) {

                    if (err) {
                        return res.send(err);
                    } else {
                        res.json({status: 200});
                    }
                });
            });
        });
    });
});

app.post('/api/admin/login', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const username = req.body.username;
    const pw = req.body.password;
    console.log(pw);
    connection.connect(function (req, err) {
        connection.query('SELECT AdminID, password FROM users WHERE username = ?', [username], function (err, result, fields) {
            if (err) {
                res.send(err)
            }

            if (result) {
                const dbPassword = JSON.parse(JSON.stringify(result[0].password));
                const User_ID = JSON.parse(JSON.stringify(result[0].User_ID));


                bcrypt.compare(pw, dbPassword, (err, result) => {
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
                        res.json({
                            status: 403,
                            message: err
                        })
                    }
                })
            }
        })
    })
})

app.post('/api/admin/signup', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    // encode so that special symbols dont destroy DB
    const username = encodeURIComponent(req.body.username);
    const password = encodeURIComponent(req.body.password);
    const email = encodeURIComponent(req.body.email);
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            console.log(hash);
            connection.connect(function (req, err) {
                connection.query('INSERT INTO admins (username, password, email) VALUES (?, ?, ?)', [username, hash, email], function (err, result, fields) {

                    if (err) {
                        console.log(err)
                        return res.send(err);
                    } else {
                        res.json({status: 200});
                    }
                });
            });
        });
    });
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
    console.log("OEN")
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
