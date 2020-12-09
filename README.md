Projet 7 OpenClassRoom DW

Cloner le projet : Le projet utilise une partie frontend d'un autre dépot en sous-module Pour cloner ce projet, utilisez :

git clone --recursive https://github.com/gjoigneaux/projet7.git

Procédure.

Cloner le projet.

Exécuté groupomania.sql dans MySQLWorkbench afin de crée le schéma et les tables liées a l'application

Exécuter npm install pour le FrontEnd et le BackEnd.

Vous devez crée un .env dans le BackEnd pour votre token et les informations de connexion à votre base donnée.

Ex :

USER = xxx

PASS = xxx

HOST = localhost

TOKEN = xxx

Exécuter nodemon server sur le BackEnd

Exécuter npm start sur le FrontEnd => Dans le cas ou le port est identique au BackEnd confirmer la demande pour utilisé un autre port

Le site web s'ouvre automatiquement sinon aller dans localhost:xxxx (xxxx correspond au port utlisé pour le FrontEnd)
