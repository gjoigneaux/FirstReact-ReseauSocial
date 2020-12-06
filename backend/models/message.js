const db = require('../mysqlconfig');//Configuration information de connections mysql
console.log(db);

exports.getAllMessages = function () {
	return	db.query(
		'SELECT * FROM messages WHERE idPARENT=0 ORDER BY created_at DESC', (error, result, field) => {
			if (error) {
				return { 'succeed': false, 'result': error };
			}
			return { 'succeed': true, 'result': result };
		});
};
