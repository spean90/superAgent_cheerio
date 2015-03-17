/**
 * Created by Administrator on 2015/3/17.
 */
var mysql = require('mysql');
var pool  = mysql.createPool({
    connectionLimit : 5,
    host            : 'localhost',
    database        : 'demodb',
    user            : 'root',
    password        : 'root'
});

//pool.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//    if (err) throw err;
//
//    console.log('The solution is: ', rows[0].solution);
//});

module.exports = pool;