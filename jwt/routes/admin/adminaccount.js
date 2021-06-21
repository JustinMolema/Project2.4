const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = function (express, generateAccessToken, connection) {
	var router = express.Router();

	router.post('/api/admin/login', (req, res) => {
		res.header("Access-Control-Allow-Origin", "*");
		const username = req.body.username;
		const pw = req.body.password;
		connection.connect(function (req, err) {
			connection.query('SELECT AdminID, password FROM admins WHERE username = ?', [username], function (err, result, fields) {
				if (err) {
					return res.send({status: "error"});
				}
				if (result.length === 0) return res.send({status: "error"});
				
				const dbPassword = JSON.parse(JSON.stringify(result[0].password));
				const User_ID = JSON.parse(JSON.stringify(result[0].AdminID));


				bcrypt.compare(pw, dbPassword, (err, result) => {
					if (err) {
						return res.send({status: "error"});
					}

					if (result) {
						const user = {name: username}
						const accessToken = generateAccessToken(user);
						res.json({
							accessToken: accessToken,
							password: dbPassword,
							userID: User_ID,
							status: 200
						})
					} else {
						console.log("WRONG");
						return res.send({status: "error"});
					}
				})
				
			})
		})
	})
	
	router.post('/api/admin/signup', async (req, res) => {
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

	return router;
}


