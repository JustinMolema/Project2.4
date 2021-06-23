module.exports = function(express, authenticateToken, connection) {
    var router = express.Router();
 
    router.get('/api/games', authenticateToken, (req, res) => {
        console.log("PP");
        connection.query('SELECT * FROM games', function (err, result, fields) {
            if (err) console.log(err);
            for (let item of result) {
                item.Image = item.Image.toString();
            }
            res.send(result);
        })
    })
 
    router.post('/api/games', (req, res) => {
        connection.connect(function (err) {
            connection.query('INSERT INTO games (Name, Category, Description, Image) VALUES (?,?,?,?)', [req.body.name, req.body.category, req.body.description, req.body.image], function (err, result, fields) {
                if (err) return res.json({status: "error"});
                res.json({status: "ok"});
            })
        })
    })
    
    router.delete('/api/games/:name', (req, res) => {
        let name = req.params['name']
        connection.connect(function (req, err) {
            connection.query('DELETE FROM games WHERE Name = ?', [name], function (err, result, fields) {
                if (err) {
                    res.sendStatus(400);
                } else {
                    res.json({status: 200})
                }
            })
        })
    })
    
    router.put('/api/games/', authenticateToken, (req, res) => {
        connection.query('UPDATE games SET Name = ?, Category = ?, Description = ?, Image = ? WHERE Name = ?', [req.body.newname, req.body.category, req.body.description, req.body.image, req.body.name], function (err, result, fields) {
            if (err) return res.sendStatus(400);
            res.json({status: "ok"});
        })
    })

    return router;  
 }