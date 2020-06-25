const express = require('express')
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'typing'
});

connection.connect(err => {
    if (err) return err;
})
app.use(cors());
//route for insert data
app.get('/rank', (req, res) => {
    let data = JSON.parse(req.query.rank)
    let sql = "INSERT INTO `rank`(`id`, `name`, `wpm`, `error`, `accuracy`) VALUES (?,?,?,?,?)"
    let query = connection.query(sql, [null,data.name, data.wpm, data.error, data.accuracy], (err, results) => {
        if (err) throw err;
        res.send('ok')
    });
});

// Listen at port 8080
app.listen(process.env.PORT || 8080, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });