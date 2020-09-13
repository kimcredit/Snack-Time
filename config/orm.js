// Import MySQL connection
const connection = require("../config/connection.js");

// Helper function for SQL syntax to convert ["?", "?", "?"] to string "?,?,?"
function printQuestionMarks(num) {
	const arr = [];
	for (let i = 0; i < num; i++) {
		arr.push('?');
	}
	return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    const arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (let key in ob) {
      let value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }
  
  // Object for all SQL statement functions.
  const orm = {
	all: (tableInput, cb) => {
		let queryString = `SELECT * FROM ${tableInput} ORDER BY id DESC`;
		connection.query(queryString, (err, result) => {
			if (err) throw err;
			cb(result);
		});
	},
	create: (table, cols, vals, cb) => {
        console.log("table: ", table);
        console.log("cols: ", cols);
        console.log("vals: ", vals);

        let queryString = 'INSERT INTO ' + table;
        
        queryString += ' (';
        queryString += cols.toString();
        queryString += ') ';
        queryString += 'VALUES (';
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
		connection.query(queryString, vals, (err, result) => {
			if (err) throw err;
			cb(result);
		});
	},
	update: (table, objColVals, condition, cb) => {
        let queryString = 'UPDATE ' + table;
        
        queryString += ' SET ';
        queryString += objToSql(objColVals); 
        queryString += ' WHERE ';
        queryString += condition;

        console.log( "update query: ", queryString);

		connection.query(queryString, (err, result) => {
			if (err) throw err;
			cb(result);
		});
	}
};

// Export the orm object for the model
module.exports = orm;