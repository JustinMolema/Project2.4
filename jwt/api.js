require('dotenv').config()
const express = require('express')
const cors = require('cors')
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

refreshTokens = [];
app.post('/api/login', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	console.log("dfsdfdsf");
    const username = req.body.username;
	const user = { name: username }

	const accessToken = generateAccessToken(user);
	const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
	refreshTokens.push(refreshToken)
	console.log(refreshToken);
	res.json({ accessToken: accessToken, refreshToken: refreshToken })
})



function generateAccessToken(user) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '25m' });
}

app.listen(5001, () => {
	console.log('Server started!')
})