/* eslint-disable no-useless-escape */
const db = require('../mysqlconfig');//Configuration information de connections mysql
const fs = require('fs');

//Poster un message sans image
exports.postmessage = (req, res, next) => {
	const sql = 'INSERT INTO messages (\`idPARENT\`, \`idUSERS\`, \`message\`, \`username\`) VALUES (?,?,?,?)';
	const inserts = ['0', req.body.idUSERS, req.body.message, req.body.username];
	const request = db.format(sql, inserts);
	db.query(
		request, (error, result, field) => {
			if (error) {
				return res.status(400).json({ error });
			}
			return res.status(201).json({ message: 'Votre message a été posté !' });
		});
};


//Poster un message avec image
exports.postmessagewithimage = (req, res, next) => {
	const sql = 'INSERT INTO messages (\`idPARENT\`, \`idUSERS\`, \`message\`, \`username\`,  \`multimedia\`) VALUES (?,?,?,?,?)';
	const inserts = ['0', req.body.idUSERS, req.body.message, req.body.username, `${req.protocol}://${req.get('host')}/images/${req.file.filename}`];
	const request = db.format(sql, inserts);
	db.query(
		request, (error, result, field) => {
			if (error) {
				return res.status(400).json({ error });
			}
			return res.status(201).json({ message: 'Votre message a été posté !' });
		});
};


//Poster un Commentaire 
exports.postCommentaire = (req, res, next) => {
	const sql = 'INSERT INTO messages (\`idPARENT\`, \`idUSERS\`, \`message\`, \`username\`) VALUES (?,?,?,?)';
	const inserts = [req.body.idPARENT, req.body.idUSERS, req.body.message, req.body.username];
	const request = db.format(sql, inserts);
	db.query(
		request, (error, result, field) => {
			if (error) {
				return res.status(400).json(error);
			}
			return res.status(201).json({ message: 'Votre réponse a été posté !' });
		});
};


//Effacer un Message ou Commentaire
exports.deletePost = (req, res, next) => {
	if (req.body.multi !== null) {
		console.log(req.params, req.body);
		fs.unlink(`./public/images/${req.body.multi}`, (err => {
			if (err) {
				console.log(err);
				const sql = 'DELETE FROM messages WHERE idMESSAGES=? OR IdPARENT=?';
				const inserts = [req.params.id, req.params.id];
				const request = db.format(sql, inserts);
				db.query(
					request, (error, results, fields) => {
						if (error) {
							return res.status(400).json(error);
						}
						else {
							return res.status(200).json({ message: 'Votre message a bien été supprimé !' });
						}
					}
				);
			}
		}));
	}
	else {
		const sql = 'DELETE FROM messages WHERE idMESSAGES=? OR IdPARENT=?';
		const inserts = [req.params.id, req.params.id];
		const request = db.format(sql, inserts);
		db.query(
			request, (error, results, fields) => {
				if (error) {
					return res.status(400).json(error);
				}
				else {
					return res.status(200).json({ message: 'Votre message a bien été supprimé !' });
				}
			}
		);
	}
};

//Modifier un Message ou Commentaire 
exports.updatePost = (req, res, next) => {
	const sql = 'UPDATE messages SET message=? WHERE idMESSAGES=?';
	const inserts = [req.body.updatemessage, req.body.idMESSAGES];
	const request = db.format(sql, inserts);
	db.query(
		request, (error, results, fields) => {
			if (error) {
				return res.status(400).json(error);
			}
			return res.status(200).json({ message: 'Votre message a bien été modifié !' });
		}
	);
};


//Afficher les messages postés
exports.getAllMessages = (req, res, next) => {
	const sql = 'SELECT * FROM messages WHERE idPARENT=? ORDER BY created_at DESC';
	const inserts = ['0'];
	const request = db.format(sql, inserts);
	db.query(
		request, (error, result, field) => {
			if (error) {
				return res.status(400).json({ error });
			}
			return res.status(200).json(result);
		});
};

//Afficher les messages postés
exports.getAllMessagesOneUser = (req, res, next) => {
	const sql = 'SELECT * FROM messages WHERE idPARENT=? AND idUSERS=? ORDER BY created_at DESC';
	const inserts = ['0', req.params.id];
	const request = db.format(sql, inserts);
	db.query(
		request, (error, result, field) => {
			if (error) {
				return res.status(400).json({ error });
			}
			return res.status(200).json(result);
		});
};

//Afficher tout les commentaires postés
exports.getCommentaires = (req, res, next) => {
	const sql = 'SELECT * FROM messages WHERE idPARENT=? ORDER BY created_at DESC';
	const inserts = [req.params.id];
	const request = db.format(sql, inserts);
	db.query(
		request, (error, result, field) => {
			if (error) {
				return res.status(400).json({ error });
			}
			return res.status(200).json(result);
		});
};
