const bcrypt = require('bcrypt');//Cryptage du password
const jwt = require('jsonwebtoken');//Créatio
const db = require('../mysqlconfig');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

//Inscription de l'utilisateur
exports.signup = (req, res, next) => {
	bcrypt.hash(req.body.password, 10)
		.then((hash) => {
			req.body.password = hash;
			db.query(`INSERT INTO user (\`email\`, \`username\`, \`password\`, \`isAdmin\`) VALUES ('${req.body.email}', '${req.body.username}', '${req.body.password}', '0')`, (err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(400).json('erreur');
				}
				return res.status(201).json({ message: 'Votre compte a bien été crée !' },);
			});
		});
};

//Connexion de l'utilisateur

exports.login = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	if (email && password) {
		db.query(`SELECT * FROM user WHERE email= '${req.body.email}'`, (error, results, fields) => {
			if (results.length > 0) {
				bcrypt.compare(password, results[0].password).then((valid) => {
					if (!valid) {
						res.status(401).json({ message: 'Utilisateur ou mot de passe inconnu' });
					} else {
						console.log(email, 's\'est connecté');
						let status = '';
						if (results[0].isAdmin === 1) {
							status = 'admin';
						} else {
							status = 'membre';
						}
						res.status(200).json({
							userId: results[0].id,
							username: results[0].username,
							email: results[0].email,
							status: status,
							token: jwt.sign({ userId: results[0].id, status: status }, process.env.TOKEN, { expiresIn: '24h' })
						});
					}
				});
			}
			else {
				res.status(401).json({ message: 'Utilisateur ou mot de passe inconnu' });
			}
		}
		);
	} else {
		res.status(500).json({ message: 'Entrez votre email et votre mot de passe' });
	}
};

//Affichage de tous les utilisateurs

exports.getUsers = (req, res, next) => {
	db.query(
		'SELECT id, username, isAdmin, email FROM user WHERE isAdmin=0',
		function (error, results) {
			if (error) {
				return res.status(400).json(error);
			}
			return res.status(200).json(results);
		}
	);
};

//Affichage de l'utilisateur selectionné

exports.getOneUser = (req, res, next) => {
	db.query(
		`SELECT id, username, email FROM user WHERE id=${req.params.id}`, (error, results) => {
			if (error) {
				return res.status(400).json(error);
			}
			return res.status(200).json(results);
		}
	);
};

//Suppression du compte utilisateur

exports.deleteUser = (req, res, next) => {
	db.query(
		`DELETE FROM user WHERE id=${req.params.id}`, (error, result, field) => {
			if (error) {
				console.log(error);
				return res.status(400).json(error);
			}
			console.log('Le compte a bien été supprimé !');
			return res.status(200).json({ message: 'Votre compte a bien été supprimé !' });
		}
	);
};
