require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const jwt = require('jsonwebtoken')
const mysql = require('mysql')

let rememberme = true;

app.use(express.json());
app.use(express.urlencoded());

const connection = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE
});

// connection.connect(function (err) {
// 	if (err) throw err;
// })

const port = process.env.PORT || 8080;

app.listen(8001, () => {
	console.log('Server started!')
})

app.route('/api/users').get(authenticateToken, (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	connection.query('SELECT * FROM users', function (err, result, fields) {
		if (err) throw err;
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
	//console.log("ff");
	connection.connect(function (err) {
		connection.query('insert into games (GameName, Category, Description, Image) VALUES (?,?,?,?)', [req.body.name, req.body.category, req.body.description, "imagedestroyed2"], function (err, result, fields) {
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
		connection.query('DELETE FROM games WHERE GameName = ?', [name], function (err, result, fields) {
			if (err) return res.json({ status: "error" });

			res.json({ status: "ok" });
		})
	})
})

let refreshTokens = []
app.post('/api/login', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");

	const username = req.body.username;
	const user = { name: username }

	const accessToken = generateAccessToken(user);
	const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
	refreshTokens.push(refreshToken)
	res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

function generateAccessToken(user) {
	if(rememberme === true)
	{
		console.log('43800m');
		return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '43800m' });
	}
	else
	{
		console.log('25m');
		return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '25m' });
	}
	
}

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

app.post('/api/remember', (req, res) => {
	
	res.header("Access-Control-Allow-Origin", "*");
	if(req.body.remember == "true")
	{
		rememberme = true;
	}
	else
	{
		rememberme = false;
	}
	
})

// app.route('/api/cats/:name').get((req, res) => {
// 	// res.header("Access-Control-Allow-Origin", "*");
// 	// res.header("Access-Control-Allow-Methods", "*");
// 	// res.header("Access-Control-Allow-Headers", "*");
// 	const requestedCatName = req.params['name'];
// 	res.send({ name: requestedCatName });
// })

// app.route('/api/cats').post((req, res) => {
// 	res.send(201, req.body)
// })

// app.route('/api/cats/:name').put((req, res) => {
// 	res.send(200, req.body)
// })

// app.route('/api/cats/:name').delete((req, res) => {
// 	res.sendStatus(204)
// })


const posts = [{ username: "Kenobi", title: "General" },
{ username: "Robbin", title: "Noob" }]

app.post("/posts", authenticateToken, (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.json(posts.filter(post => post.username === req.user.name));
})

function authenticateToken(req, res, next) {
	console.log("nani");
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

app.use(cors())
