const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });


// Authentifie les requetes grâce au token

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const decodedToken = jwt.verify(token, process.env.TOKEN);
		const userId = decodedToken.userId;
		const status = decodedToken.status;
		console.log(decodedToken);
		if (status !== 'admin' && req.body.userId && req.body.userId !== userId) {
			throw 'Invalid user ID';
		} else {
			next();
		}
	} catch {
		res.status(401).json({
			error: 'pas marché'
		});
	}
};