const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = function (express, generateAccessToken, connection) {
	var router = express.Router();

	router.post('/api/user/login', (req, res) => {
		res.header("Access-Control-Allow-Origin", "*");
		const username = req.body.username;
		const pw = req.body.password;
		connection.connect(function (req, err) {
			connection.query('SELECT User_ID, password, Banned FROM users WHERE username = ?', [username], function (err, result, fields) {
				if (err) {
					return res.send({status: "error"});
				}
	
				if (result.length === 0) return res.send({status: "error"});
				const banned = JSON.parse(JSON.stringify(result[0].Banned));
				if (banned === 1) return res.send({status: "banned"});
				const dbPassword = JSON.parse(JSON.stringify(result[0].password));
				const User_ID = JSON.parse(JSON.stringify(result[0].User_ID));


				bcrypt.compare(pw, dbPassword, (err, result) => {
					if (err) {
						return res.send({status: "error"});
					}

					if (result) {
						const user = {name: username}
						const accessToken = generateAccessToken(user);
						const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
						res.json({
							accessToken: accessToken,
							refreshToken: refreshToken,
							password: dbPassword,
							userID: User_ID,
							status: 200
						})
					} else {
						return res.send({status: "error"});
					}
				})
				
			})
		})
	})
	
	
	router.post('/api/user/signup', async (req, res) => {
		res.header("Access-Control-Allow-Origin", "*");
	
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
				connection.connect(function (req, err) {
					connection.query('INSERT INTO users (username, password, email, Profile_picture) VALUES (?, ?, ?, ?)', [username, hash, email, pic], function (err, result, fields) {
						if (err) {
							return res.send({status: 400});
						} else {
							res.json({status: 200});
						}
					});
				});
			});
		});
	});

	return router;
}


