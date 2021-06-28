module.exports = function (express, authenticateToken, connection) {
	var router = express.Router();

	router.get('/api/user/:userID/profile', authenticateToken, (req, res) => {
		let user_id = req.params.userID;

		connection.query('SELECT Username, Email, Warnings, Profile_picture FROM users WHERE User_ID = ?', [user_id], function (err, result, fields) {
			if (err) {
				throw err;
			} else {
				if (result.length > 0) {
					if (result[0].Profile_picture) {
						result[0].Profile_picture = result[0].Profile_picture.toString();
					}
					res.send(result);
				}
			}
		});
	});

	router.put('/api/user/:userID/picture', authenticateToken, (req, res) => {
		const user_id = req.params.userID;
		const new_profile_pic = req.body.newPic;
		connection.query('UPDATE users SET Profile_picture = ? WHERE users.User_ID = ?', [new_profile_pic, user_id], function (err, result, fields) {
			if (err){ 
				return res.send(err);
			}
			res.send({status: 200});
		});
	})

	router.put('/api/user/:userID/username', authenticateToken, (req, res) => {
		let user_id = req.params.userID;

		const new_username = req.body.newName;
		connection.query('UPDATE users SET Username = ? WHERE users.User_ID = ?', [new_username, user_id], function (err, result, fields) {
			if (err) return res.send(err);
			res.sendStatus(200);
		});
	})

	router.put('/api/user/:userID/password', authenticateToken, (req, res) => {
		let user_id = req.params.userID;
		const new_pass = req.body.newPass;
		const saltRounds = 10;
		bcrypt.genSalt(saltRounds, function (err, salt) {
			bcrypt.hash(new_pass, salt, function (err, hash) {
				connection.query('UPDATE users SET Password = ? WHERE User_ID = ?', [hash, user_id], function (err, result, fields) {
					if (err) return res.send(err);
				});
			});
		});
	});
	return router;
}
