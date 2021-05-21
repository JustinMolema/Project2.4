require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json())

let refreshTokens = []

app.post('/token', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");

	const refreshToken = req.body.token;
	console.log(refreshToken);
	if (refreshToken == null) return res.sendStatus(401)
	if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403)
		const accessToken = generateAccessToken({ name: user.name })
		res.json({ accessToken: accessToken })
	})
})

app.delete('/logout', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	
	refreshTokens = refreshTokens.filter(token => token !== req.body.token)
	res.sendStatus(204);
})

app.post('/login', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");

	const username = req.body.username;
	const user = { name: username }

	const accessToken = generateAccessToken(user);
	const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
	refreshTokens.push(refreshToken)
	res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

function generateAccessToken(user) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '25m' });
}

app.listen(4000);