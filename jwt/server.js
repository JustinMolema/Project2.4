require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const jwt = require('jsonwebtoken')
const mysql = require('mysql')
const test = require('./api.js');
const http = require('http')
const { Console } = require('console')
const bcrypt = require('bcrypt')

// import {test} from './api'

app.use(express.json());
app.use(express.urlencoded());

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
		io.emit('new user joined', { user: data.user, message: 'has joined  room.' });
	});

	socket.on('leave', function (data) {
		io.emit('left room', { user: data.user, message: 'has left room.' });
		socket.leave(data.room);
	});

	socket.on('message', function (data) {
		console.log(data);
		socket.to(data.room).emit('new message', { user: data.user, message: data.message });
	})
});

server.listen(chatport);


const port = process.env.PORT || 8080;

app.listen(8001, () => {
	console.log('Server started!')
	// test()
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

app.route('/api/passwordchange').post(authenticateToken, (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	const user_id = req.body.userID;
	const new_pass = req.body.newPass;
	const saltRounds = 10;
	bcrypt.genSalt(saltRounds, function (err, salt) {
		bcrypt.hash(new_pass, salt, function (err, hash) {
			connection.query('UPDATE users SET Password = ? WHERE User_ID = ?', [hash, user_id], function (err, result, fields) {
				if (err) return res.json({ status: "error" });
				res.json({ status: "ok" });
			})
		})
	})
})

app.route('/api/getFriends').post(authenticateToken, async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	const user_id = req.body.userID;
	console.log(user_id)
	connection.query('SELECT User_ID, Username FROM user_friends_with_user JOIN users ON users.User_ID = user_friends_with_user.UserTwo WHERE UserOne = ?', [user_id], await function (err, result, fields) {
		console.log("Friends: ");
		console.log(result);
		if (err) throw err;
		friendInfo = JSON.stringify(result);
		res.send([result]);
	})
})

app.route('/api/getFriendRequests').post(authenticateToken, async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	const user_id = req.body.userID;
	connection.query('SELECT User_ID, Username FROM user_befriends_user AS FR JOIN users ON users.User_ID = FR.UserTwo WHERE FR.UserOne = ?', [user_id], function (err, result, fields) {
		console.log("Friends Requests: ");
		console.log(result);
		if (err) throw err;
		friendRequests = JSON.stringify(result);
		res.send([result]);
	})
})

app.route('/api/getBlockedUsers').post(authenticateToken, async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	const user_id = req.body.userID;
	connection.query('SELECT User_ID, Username FROM user_blocked_user AS BU JOIN users ON users.User_ID = BU.user_blockee WHERE BU.user_blocker = ?', [user_id], function (err, result, fields) {
		console.log("Blocked Users: ");
		console.log(result);
		if (err) throw err;
		BlockedInfo = JSON.stringify(result);
		res.send([result]);
	})
})

// for getting basic user information such as name and profile picture by ID
app.route('/api/getUserInformation').post(authenticateToken, (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	const userID = req.body.userID

	connection.query('SELECT Username FROM users WHERE User_ID = ?', [userID], function (err, result, fields) {
		if (err) throw err;
		username = JSON.stringify(result);
		res.send(username)
		//TODO PROFILE PICTURE
	})
})

app.route('/api/profile').post(authenticateToken, (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	const userID = req.body.userID;

	connection.query('SELECT Username, Email, Warnings FROM users WHERE User_ID = ?', [userID], function (err, result, fields) {
		console.log(result)
		if (err) throw err;
		res.send(JSON.stringify(result));
	})
})

app.route('/api/supporttickets').get((req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	connection.query('SELECT * FROM support_tickets', function (err, result, fields) {
		if (err) throw err;
		//console.log((result));
		res.send(result);
	})
})

app.route('/api/addgame').post((req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	connection.connect(function (err) {
		connection.query('insert into games (Name, Category, Description, Image) VALUES (?,?,?,?)', [req.body.name, req.body.category, req.body.description, "imagedestroyed2"], function (err, result, fields) {
			if (err) return res.json({ status: "error" });

			res.json({ status: "ok" });
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
			if (err) return res.json({ status: "error" });

			res.json({ status: "ok" });
		})
	})
})

let refreshTokens = []
app.post('/api/login', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	const username = req.body.username;
	const pw = req.body.password;

	connection.connect(function (req, err) {
		connection.query('SELECT User_ID, password FROM users WHERE username = ?', [username], function (err, result, fields) {

			const dbPassword = JSON.parse(JSON.stringify(result[0].password));
			console.log(dbPassword)
			const User_ID = JSON.parse(JSON.stringify(result[0].User_ID));
			console.log(User_ID)
			if (err) {
				return res.json({ status: "error" })
			}

			bcrypt.compare(pw, dbPassword, (err, result) => {
				console.log("compare: " + result)
				if (err) {
					return res.json({ status: "error" })
				}

				if (result) {
					const user = { name: username }
					const accessToken = generateAccessToken(user);
					const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
					refreshTokens.push(refreshToken)
					res.json({ accessToken: accessToken, refreshToken: refreshToken, password: dbPassword, userID: User_ID, status: "ok" })
				}
				else {
					res.json({ status: "wrong password" })
				}
			})

		})
	})

})

// api call to create user in database
app.post('/api/login/signup', async (req, res) => {
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

					if (err) return res.json({ status: "error" });
					res.json({ status: "ok" });
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
		const accessToken = generateAccessToken({ name: user.name })
		res.json({ accessToken: accessToken })
	})
})

function generateAccessToken(user) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '25m' });
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
