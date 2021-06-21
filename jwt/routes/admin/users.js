module.exports = function (express, authenticateToken, connection) {
	var router = express.Router();


	router.get('/api/users', authenticateToken, (req, res) => {
		connection.query('SELECT * FROM users', function (err, result, fields) {
			if (err) throw err;
			res.send(result);
		});
	});

	router.put('/api/users/warn/', authenticateToken, (req, res) => {
		const user_ID = req.body.userID;
		connection.query('UPDATE users SET Warnings = Warnings+1 WHERE User_ID = ?', [user_ID], function (err, result, fields) {
			if (err) res.sendStatus(400);
			res.sendStatus(200);
		});
	});

	router.put('/api/users/ban', authenticateToken, (req, res) => {
		const user_ID = req.body.userID;
		connection.query('UPDATE users SET Banned = 1 WHERE User_ID = ?', [user_ID], function (err, result, fields) {
			if (err) return res.json({ status: "error" });
			return res.sendStatus(200);
		})
	})

	router.put('/api/users/unban', authenticateToken, (req, res) => {
		const user_ID = req.body.userID;
		connection.query('UPDATE users SET Banned = 0 WHERE User_ID = ?', [user_ID], function (err, result, fields) {
			if (err) return res.json({ status: "error" });
			return res.sendStatus(200);
		})
	})

	return router;
}


