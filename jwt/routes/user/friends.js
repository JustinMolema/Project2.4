module.exports = function (express, authenticateToken, connection) {
	var router = express.Router();

	router.get('/api/user/:userID/friends', authenticateToken, async (req, res) => {
		let user_id = req.params['userID']
		res.header("Access-Control-Allow-Origin", "*");
		try {
			const friends = await User.query()
				.select('User_ID', 'Username', "Profile_picture")
				.from('friends')
				.innerJoin('users AS user', 'user.Username', 'friends.UserTwo')
				.where('UserOne', '=', user_id)
			if (friends.length > 0) {
				friends.forEach(element => {
					if (element.Profile_picture) {
						element.Profile_picture = element.Profile_picture.toString();
					}
				});
				res.send(friends)
			} else {
				res.send(friends)
			}
		} catch (error) {
			res.send({ status: 403 })
		}
	})

	router.get('/api/user/:userID/friends/:friendID', authenticateToken, async (req, res) => {
		let user_id = req.params['userID']
		let friend_id = req.params['friendID']
		res.header("Access-Control-Allow-Origin", "*");
		connection.query('SELECT User_ID, Username, Profile_picture FROM friends WHERE UserTwo = ? AND UserOne = ?', [friend_id, user_id], await function (err, result, fields) {
			if (err) return res.sendStatus(400);
			if (result.length > 0) {
				if (result[0].Profile_picture) {
					result[0].Profile_picture = result[0].Profile_picture.toString();
				}
				res.send([result]);
			}
		})
	})

	router.delete('/api/user/:userID/friends/:friendID', authenticateToken, async (req, res) => {
		let UserOne = req.params['userID']
		const UserTwo = req.params['friendID']
		connection.query('DELETE FROM friends WHERE UserOne = ? AND UserTwo = ?', [UserOne, UserTwo], function (err, result, fields) {
			if (err) return res.send(err)
		})

		connection.query('DELETE FROM friends WHERE UserOne = ? AND UserTwo = ?', [UserTwo, UserOne], function (err, result, fields) {
			if (err) return res.send(err);
		})
		res.json({ status: 200 })
	})
	return router;
}

const { Model } = require('objection');
const Knex = require('knex');

const knex = Knex({
	client: 'mysql',
	useNullAsDefault: true,
	connection: {
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'Findr'
	}
});

Model.knex(knex);
class User extends Model {

	static get tableName() {
		return 'users'
	}

	static get idColumn() {
		return 'User_ID'
	}

	static get usernameColumn() {
		return 'Username';
	}

	static get passwordColumn() {
		return 'Password';
	}

	static get emailColumn() {
		return 'Email';
	}

	static get warningsColumn() {
		return 'Warnings';
	}

	static get bannedColumn() {
		return 'Banned';
	}

	static get profPicColumn() {
		return 'Profile_picture';
	}
}