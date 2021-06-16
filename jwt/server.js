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
const crypto = require("crypto");
let refreshTokens = []

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors({
	origin: "*"
}))
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
		console.log(data);
		socket.to(data.room).emit('new message', { userID: data.userID, user: data.user, message: data.message });
	});

	socket.on("private message", (data) => {
		socket.to(data.room).emit("private message", { userID: socket.sessionID, user: data.user, message: data.message });
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
    console.log('Server started!')
})

app.route('/api/users').get(authenticateToken, (req, res) => {
    connection.query('SELECT * FROM users', function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    })
})


app.route('/api/chats').get(authenticateToken, (req, res) => {
    connection.query('SELECT * FROM chats', function (err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    })
})

// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
//                 USER PROFILE CALLS
// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
app.route('/api/user/:userID/profile').get(authenticateToken, (req, res) => {
    let user_id = req.params['userID'];

    connection.query('SELECT Username, Email, Warnings, Profile_picture FROM users WHERE User_ID = ?', [user_id], function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            if (result.length > 0) {
                if (result[0].Profile_picture) {
                    result[0].Profile_picture = result[0].Profile_picture.toString();
                }
                res.send(JSON.stringify(result));
            }
        }
    })
})

app.route('/api/user/:userID/password').put(authenticateToken, (req, res) => {
    let user_id = req.params['userID'];
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

app.route('/api/user/:userID/picture').put(authenticateToken, (req, res) => {
    let user_id = req.params['userID'];
    const new_profile_pic = req.body.newPic

    connection.query('UPDATE users SET Profile_picture = ? WHERE users.User_ID = ?', [new_profile_pic, user_id], function (err, result, fields) {
        if (err) {
            res.send(err);
        }
    });
})

app.route('/api/user/:userID/username').put(authenticateToken, (req, res) => {
    let user_id = req.params['userID'];

    const new_username = req.body.newName;
    connection.query('UPDATE users SET Username = ? WHERE users.User_ID = ?', [new_username, user_id], function (err, result, fields) {
        if (err) return res.send(err)
    })
})

// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
//                 USER FRIEND CALLS
// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
app.route('/api/user/:userID/friends').get(authenticateToken, async (req, res) => {
    let user_id = req.params['userID']
    connection.query('SELECT User_ID, Username FROM user_friends_with_user JOIN users ON users.User_ID = user_friends_with_user.UserTwo WHERE UserOne = ?', [user_id], await function (err, result, fields) {
        if (err) return res.sendStatus(400);
        friendInfo = JSON.stringify(result);
        res.send([result]);
    })
})
// accept friendrequest
app.route('/api/user/:userID/friend-requests/:senderID').put(authenticateToken, async (req, res) => {
    const accepterID = req.params['userID'];
    const senderID = req.params['senderID'];
    connection.query('INSERT INTO user_friends_with_user (UserOne, UserTwo) VALUES (' + accepterID + ', ' + senderID + ');', function (err, result, fields) {
        console.log(err)
    })
    connection.query('INSERT INTO user_friends_with_user (UserOne, UserTwo) VALUES (' + senderID + ', ' + accepterID + ');', function (err, result, fields) {
        console.log(err)
    })
    connection.query('DELETE FROM user_befriends_user WHERE UserOne = ' + accepterID + ' AND UserTwo = ' + senderID, function (err, result, fields) {
        console.log(err)
    })
    res.send({status: 200})
})

// delete friendrequest
app.route('/api/user/:userID/friend-requests/:requesterID').delete(authenticateToken, async (req, res) => {
    const accepterID = req.params['userID'];
    const senderID = req.params['requesterID'];
    connection.query('DELETE FROM user_befriends_user WHERE UserOne = ' + accepterID + ' AND UserTwo = ' + senderID, function (err, result, fields) {
        if (err) return res.send(err);
        res.send({status: 200})
    })

})

// delete friend
app.route('/api/user/:userID/friends/:friendID').delete(authenticateToken, async (req, res) => {
    let UserOne = req.params['userID']
    const UserTwo = req.params['friendID']
    connection.query('DELETE FROM user_friends_with_user WHERE UserOne = ' + UserOne + ' AND UserTwo = ' + UserTwo, function (err, result, fields) {
        console.log(err)
        if (err) return res.send(err)
    })

    connection.query('DELETE FROM user_friends_with_user WHERE UserOne = ' + UserTwo + ' AND UserTwo = ' + UserOne, function (err, result, fields) {
        console.log(err)
        if (err) return res.send(err);
    })
    res.json({status: 200})
})

// block user
app.route('/api/user/:userID/block/:blockeduser').post(authenticateToken, async (req, res) => {
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
        console.log(err)
    })
    res.json({status: 200})
})

// get friendrequests
app.route('/api/user/:userID/friend-requests').get(authenticateToken, async (req, res) => {
    let user_id = req.params['userID']
    connection.query('SELECT User_ID, Username FROM user_befriends_user AS FR JOIN users ON users.User_ID = FR.UserTwo WHERE FR.UserOne = ?', [user_id], function (err, result, fields) {
        if (err) return res.send(err);
        let friendRequests = JSON.stringify(result);
        res.send([result]);
    })
})

// send friendrequest
app.route('/api/user/:userID/friend-requests/:reqID').post(authenticateToken, async (req, res) => {
    let UserOne = req.params['userID']
    let UserTwo = req.params['reqID'];// receiver

    connection.query('INSERT INTO user_befriends_user (UserOne, UserTwo) VALUES (' + UserTwo + ', ' + UserOne + ');', function (err, result, fields) {
        if (err) throw err;
        let friendRequests = JSON.stringify(result);
        res.send([result]);
    })
})
// get blocked users
app.route('/api/user/:userID/blocked').get(authenticateToken, async (req, res) => {
    let user_id = req.params['userID']
    connection.query('SELECT User_ID, Username FROM user_blocked_user AS BU JOIN users ON users.User_ID = BU.user_blockee WHERE BU.user_blocker = ?', [user_id], function (err, result, fields) {
        if (err) throw err;
        let BlockedInfo = JSON.stringify(result);
        res.send([result]);
    })
})
// unblock user
app.route('/api/user/:userID/blocked/:unblockeeID').delete(authenticateToken, async (req, res) => {
    let UserOne = req.params['userID']
    let UserTwo = req.params['unblockeeID'];// person getting blocked

    connection.query('DELETE FROM user_blocked_user WHERE user_blocker = ' + UserOne + ' AND user_blockee = ' + UserTwo, function (err, result, fields) {
        if (err) throw err;
        let BlockedInfo = JSON.stringify(result);
        res.send([result]);
    })
})


app.route('/api/supporttickets').get((req, res) => {
    connection.query('SELECT * FROM support_tickets', function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    })
})

app.route('/api/games').get(authenticateToken, (req, res) => {
    connection.query('SELECT * FROM games', function (err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    })
})

app.route('/api/game').post((req, res) => {
    connection.connect(function (err) {
        connection.query('INSERT INTO games (Name, Category, Description, Image) VALUES (?,?,?,?)', [req.body.name, req.body.category, req.body.description, "imagedestroyed2"], function (err, result, fields) {
            if (err) return res.json({status: "error"});
            res.json({status: "ok"});
        })
    })
})

app.route('/api/game/:name').delete((req, res) => {
    let name = req.params['name']
    connection.connect(function (req, err) {
        connection.query('DELETE FROM games WHERE Name = ?', [name], function (err, result, fields) {
            if (err) {
                res.sendStatus(400);
            } else {
                res.json({status: 200});
            }
        })
    })
})

app.post('/api/users/reported', (req, res) => {
    connection.query('INSERT INTO reported_users (UserID, Username, Date, Reason, Message) VALUES (?,?,?,?,?)', 
		[req.body.userID, req.body.username, new Date(new Date().toUTCString()), req.body.reason, req.body.message], function(err, result, fields) {
            if (err) res.sendStatus(400);
			else res.sendStatus(200);
        })
})

app.get('/api/users/reported',authenticateToken, (req, res) => {
    connection.query('SELECT * FROM reported_users', function(err, result, field) {
        if(err) res.sendStatus(418);
        res.send(JSON.stringify(result));
    })
})

app.delete('/api/users/reported/:id', authenticateToken, (req, res) => {
	console.log("peter");
    let name = req.params['id'];
    connection.query('DELETE FROM reported_users WHERE ReportedUserID = ?', [name], function(err, result, fields){
        if(err) res.sendStatus(418);
        res.sendStatus(200);
    })
})

app.get('/api/support/tickets', authenticateToken, (req, res) => {
    connection.query('SELECT * FROM support_tickets', function(err, result, fields){
        if(err) res.sendStatus(418);
        res.send(JSON.stringify(result));
    })
})

app.delete('/api/support/tickets/:id', authenticateToken, (req, res) => {
    let id = req.params['id']
    connection.query('DELETE FROM support_tickets WHERE TicketID = ?', [id], function(err, result, fields){
        if(err) res.sendStatus(418);
        res.sendStatus(200);
    })
})






app.post('/user/login', (req, res) => {
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
                });
            });
        });
    });
});

app.post('/api/token', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const refreshToken = req.body.token;

    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
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
    console.log(`Express server listening on port ${port}`);
});