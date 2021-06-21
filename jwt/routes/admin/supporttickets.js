module.exports = function (express, authenticateToken, connection) {
	var router = express.Router();

	router.get('/api/support/tickets', authenticateToken, (req, res) => {
		connection.query('SELECT * FROM support_tickets', function (err, result, fields) {
			if (err) res.sendStatus(418);
			res.send(result);
		})
	})
	
	router.delete('/api/support/tickets/:id', authenticateToken, (req, res) => {
		let id = req.params['id']
		connection.query('DELETE FROM support_tickets WHERE TicketID = ?', [id], function (err, result, fields) {
			if (err) res.sendStatus(418);
			res.sendStatus(200);
		})
	})

	return router;
}
