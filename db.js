// Pool allows the configuration and connection of the server and database
const Pool = require('mariadb').createPool;

//create a new instance of pool, how and where to connect the database
const pool = new Pool({
    user: 'root',
    password: '',
    host: 'localhost',
    port: 3306,
    database: 'persevere',//same name as in database.sql
    allowPublicKeyRetrieval: true,
    timezone: 'Etc/GMT0',
});

module.exports = pool;
//using pool inside of routes to manipulate data, CRUD