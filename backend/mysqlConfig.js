const mysql = require('mysql');
const dotenv = require("dotenv");

dotenv.config({ path: './.env' }); //masquage des informations sensibles comme les idantifiants et les mots de passes

//Connexion à la base de donnée Mysql

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: 'groupomania'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connecté a mysql')
});


module.exports = db;