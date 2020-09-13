const orm = require('../config/orm.js');

const snack= {
	all: (cb) => {
		orm.all('snacks', (res) => {
			cb(res);
		});
	},
	create: (cols, vals, cb) => {
		orm.create('snacks', cols, vals, (res) => {
			cb(res);
		});
	},
	update: (objColVals, condition, cb) => {
		orm.update('snacks', objColVals, condition, (res) => {
			cb(res);
		});
	}
};

module.exports = snack;