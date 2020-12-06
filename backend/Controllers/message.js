const db = require('../mysqlconfig');//Configuration information de connections mysql
const fs = require('fs');

//Poster un message sans image
exports.postmessage = (req, res, next) => {
	db.query(
		`INSERT INTO messages (\`idPARENT\`, \`idUSERS\`, \`message\`, \`username\`) VALUES ('0', '${req.body.idUSERS}', '${req.body.message}', '${req.body.username}')`, (error, result, field) => {
			if (error) {
				return res.status(400).json({ error });
			}
			return res.status(201).json({ message: 'Votre message a été posté !' });
		});
};


//Poster un message avec image
exports.postmessagewithimage = (req, res, next) => {
	db.query(
		`INSERT INTO messages (\`idPARENT\`, \`idUSERS\`, \`message\`, \`username\`,  \`multimedia\`) VALUES ('0', '${req.body.idUSERS}', '${req.body.message}', '${req.body.username}', '${req.protocol}://${req.get('host')}/images/${req.file.filename}')`, (error, result, field) => {
			if (error) {
				return res.status(400).json({ error });
			}
			return res.status(201).json({ message: 'Votre message a été posté !' });
		});
};


//Poster un Commentaire 
exports.postCommentaire = (req, res, next) => {
	db.query(
		`INSERT INTO messages (\`idPARENT\`, \`idUSERS\`, \`message\`, \`username\`) VALUES ('${req.body.idPARENT}', '${req.body.idUSERS}', '${req.body.message}', '${req.body.username}')`, (error, result, field) => {
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
				db.query(
					`DELETE FROM messages WHERE idMESSAGES='${req.params.id}' OR IdPARENT='${req.params.id}'`, (error, results, fields) => {
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
		db.query(
			`DELETE FROM messages WHERE idMESSAGES='${req.params.id}' OR IdPARENT='${req.params.id}'`, (error, results, fields) => {
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
	db.query(
		`UPDATE messages SET message="${req.body.updatemessage}" WHERE idMESSAGES=${req.body.idMESSAGES}`, (error, results, fields) => {
			if (error) {
				return res.status(400).json(error);
			}
			return res.status(200).json({ message: 'Votre message a bien été modifié !' });
		}
	);
};


//Afficher les messages postés
exports.getAllMessages = (req, res, next) => {
	db.query(
		'SELECT * FROM messages WHERE idPARENT=0 ORDER BY created_at DESC', (error, result, field) => {
			if (error) {
				return res.status(400).json({ error });
			}
			return res.status(200).json(result);
		});
};

//Afficher les messages postés
exports.getAllMessagesOneUser = (req, res, next) => {
	db.query(
		`SELECT * FROM messages WHERE idPARENT='0' AND idUSERS='${req.params.id}' ORDER BY created_at DESC`, (error, result, field) => {
			if (error) {
				return res.status(400).json({ error });
			}
			return res.status(200).json(result);
		});
};

//Afficher tout les commentaires postés
exports.getCommentaires = (req, res, next) => {
	db.query(
		`SELECT * FROM messages WHERE idPARENT='${req.params.id}' ORDER BY created_at DESC`, (error, result, field) => {
			if (error) {
				return res.status(400).json({ error });
			}
			return res.status(200).json(result);
		});
};
