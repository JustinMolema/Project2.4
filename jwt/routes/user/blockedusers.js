module.exports = function (express, authenticateToken, connection) {
	var router = express.Router();

	// get blocked users
	router.get('/api/user/:userID/blocked', authenticateToken, async (req, res) => {
		let user_id = req.params['userID']
		connection.query('SELECT User_ID, Username, Profile_picture FROM blocked_users AS BU JOIN users ON users.Username = BU.user_blockee WHERE BU.user_blocker = ?', [user_id], function (err, result, fields) {
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

	router.post('/api/user/:userID/blocked/:blockeduser', authenticateToken, async (req, res) => {
		let UserOne = req.params['userID']
		const UserTwo = req.params['blockeduser'];
		connection.query('INSERT INTO blocked_users (user_blocker, user_blockee) VALUES (?, ?);', [UserOne, UserTwo], function (err, result, fields) {
			if (err) return res.send(err);
		})

		connection.query('DELETE FROM friends WHERE UserOne = ? AND UserTwo = ?', [UserOne, UserTwo], function (err, result, fields) {
			if (err) return res.send(err);
		})

		connection.query('DELETE FROM friends WHERE UserOne = ? AND UserTwo = ?',[UserTwo, UserOne], function (err, result, fields) {
			if (err) return res.send(err);
		})

		connection.query('DELETE FROM friend_requests WHERE UserOne = ? AND UserTwo = ?', [UserOne, UserTwo], function (err, result, fields) {
			if (err) return res.send(err);
		})

		connection.query('DELETE FROM friend_requests WHERE UserOne = ? AND UserTwo = ?', [UserTwo, UserOne], function (err, result, fields) {
			if (err) return res.send(err);
		})
		res.json({ status: 200 })
	})

	router.delete('/api/user/:userID/blocked/:unblockeeID', authenticateToken, async (req, res) => {
		let UserOne = req.params['userID']
		let UserTwo = req.params['unblockeeID'];

		connection.query('DELETE FROM blocked_users WHERE user_blocker = ? AND user_blockee = ?', [UserOne, UserTwo], function (err, result, fields) {
			if (err) throw err;
			res.send([result]);
		})
	})
	return router;
}

