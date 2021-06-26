module.exports = function (express, authenticateToken, connection) {
	var router = express.Router();

	router.get('/api/user/:userID/friend-requests', authenticateToken, async (req, res) => {
		let user_id = req.params['userID']
		res.header("Access-Control-Allow-Origin", "*");
		connection.query('SELECT User_ID, Username, Profile_picture FROM friend_requests AS FR JOIN users ON users.Username = FR.UserTwo WHERE FR.UserOne = ?', [user_id], function (err, result, fields) {
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

	router.post('/api/user/:username/friend-requests/:friend', authenticateToken, async (req, res) => {
		let from = req.params['username']
		let to = req.params['friend']
		connection.query('INSERT INTO friend_requests (UserOne, UserTwo) VALUES (?,?)', [to, from], function (err, result, fields) {
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
		connection.query('INSERT INTO friends (UserOne, UserTwo) VALUES (?,?)', [accepterID, senderID], function (err, result, fields) {
			if (err) return res.send(err);
		})
		connection.query('INSERT INTO friends (UserOne, UserTwo) VALUES (?, ?)', [senderID, accepterID], function (err, result, fields) {
			if (err) return res.send(err);
		})
		connection.query('DELETE FROM friend_requests WHERE UserOne = ? AND UserTwo = ?', [accepterID, senderID], function (err, result, fields) {
			if (err) return res.send(err);
		})
		res.send({status: 200})
	})

	router.delete('/api/user/:userID/friend-requests/:requesterID', authenticateToken, async (req, res) => {
		res.header("Access-Control-Allow-Origin", "*");
		const accepterID = req.params['userID'];
		const senderID = req.params['requesterID'];
		connection.query('DELETE FROM friend_requests WHERE UserOne = ? AND UserTwo = ?', [accepterID, senderID] , function (err, result, fields) {
			if (err) return res.send(err);
			res.send({ status: 200 })
		})
	})
	return router;
}

