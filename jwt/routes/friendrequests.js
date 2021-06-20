module.exports = function (express, authenticateToken, connection) {
	var router = express.Router();

	router.get('/api/user/:userID/friend-requests', authenticateToken, async (req, res) => {
		let user_id = req.params['userID']
		res.header("Access-Control-Allow-Origin", "*");
		connection.query('SELECT User_ID, Username, Profile_picture FROM user_befriends_user AS FR JOIN users ON users.User_ID = FR.UserTwo WHERE FR.UserOne = ?', [user_id], function (err, result, fields) {
			if (err) {
				return res.send(err);
			}
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

	router.post('/api/user/:userID/friend-requests/:reqID', authenticateToken, async (req, res) => {
		let UserOne = req.params['userID']
		let UserTwo = req.params['reqID']

		connection.query('INSERT INTO user_befriends_user (UserOne, UserTwo) VALUES (' + UserTwo + ', ' + UserOne + ');', function (err, result, fields) {
			if (err) throw err;
			if (result.length > 0) {
				result.forEach(element => {
					element.Profile_picture = element.Profile_picture.toString();
				});
				res.send([result]);
			} else {
				res.send({ status: 403 });
			}
		})
	})

	router.put('/api/user/:userID/friend-requests/:senderID', authenticateToken, async (req, res) => {
		res.header("Access-Control-Allow-Origin", "*");
		const accepterID = req.params['userID'];
		const senderID = req.params['senderID'];
		connection.query('INSERT INTO user_friends_with_user (UserOne, UserTwo) VALUES (' + accepterID + ', ' + senderID + ');', function (err, result, fields) {
			if (err) return res.send(err);
		})
		connection.query('INSERT INTO user_friends_with_user (UserOne, UserTwo) VALUES (' + senderID + ', ' + accepterID + ');', function (err, result, fields) {
			if (err) return res.send(err);
		})
		connection.query('DELETE FROM user_befriends_user WHERE UserOne = ' + accepterID + ' AND UserTwo = ' + senderID, function (err, result, fields) {
			if (err) return res.send(err);
		})
		res.send({status: 200})
	})

	router.delete('/api/user/:userID/friend-requests/:requesterID', authenticateToken, async (req, res) => {
		res.header("Access-Control-Allow-Origin", "*");
		const accepterID = req.params['userID'];
		const senderID = req.params['requesterID'];
		connection.query('DELETE FROM user_befriends_user WHERE UserOne = ' + accepterID + ' AND UserTwo = ' + senderID, function (err, result, fields) {
			if (err) return res.send(err);
			res.send({ status: 200 })
		})
	})
	return router;
}

