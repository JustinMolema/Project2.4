module.exports = function (express, authenticateToken, connection) {
	var router = express.Router();

	// get blocked users
	router.get('/api/user/:userID/blocked', authenticateToken, async (req, res) => {
		let user_id = req.params['userID']
		connection.query('SELECT User_ID, Username, Profile_picture FROM user_blocked_user AS BU JOIN users ON users.User_ID = BU.user_blockee WHERE BU.user_blocker = ?', [user_id], function (err, result, fields) {
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
			if (err) return res.send(err);
		})
		res.json({ status: 200 })
	})

	router.delete('/api/user/:userID/blocked/:unblockeeID', authenticateToken, async (req, res) => {
		let UserOne = req.params['userID']
		let UserTwo = req.params['unblockeeID'];

		connection.query('DELETE FROM user_blocked_user WHERE user_blocker = ' + UserOne + ' AND user_blockee = ' + UserTwo, function (err, result, fields) {
			if (err) throw err;
			res.send([result]);
		})
	})
	return router;
}

