module.exports = function (express, authenticateToken, connection) {
	var router = express.Router();

	router.get('/api/users/reported', authenticateToken, (req, res) => {
		connection.query('SELECT * FROM reported_users', function (err, result, field) {
			if (err) res.sendStatus(418);
			res.send(JSON.stringify(result));
		})
	})
	
	router.post('/api/users/reported', (req, res) => {
		connection.query('INSERT INTO reported_users (UserID, Username, Date, Reason, Message) VALUES (?,?,?,?,?)',
			[req.body.userID, req.body.username, new Date(new Date().toUTCString()), req.body.reason, req.body.message], function (err, result, fields) {
				if (err) return res.sendStatus(400);
	
				res.json({status: 200});
			})
	})

	
	router.delete('/api/users/reported/:id', authenticateToken, (req, res) => {
		let name = req.params['id'];
		connection.query('DELETE FROM reported_users WHERE ReportedUserID = ?', [name], function (err, result, fields) {
			if (err) res.sendStatus(418);
			res.sendStatus(200);
		})
	})

	return router;
}


