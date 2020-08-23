const mysql = require('mysql');

if (process.env.JAWSDB_URL) {
	connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
	connection = mysql.createConnection({
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: 'popcicle11',
		database: 'snacks_db'
	});
}

connection.connect();

module.exports = connection;