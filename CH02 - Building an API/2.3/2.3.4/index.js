'use strict';

const Hapi = require('hapi');
const Sqlite3 = require('sqlite3');

const db = new Sqlite3.Database('../../dindin.sqlite');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.route([{
    method: 'GET',
    path: '/api/recipes',
    handler: function (request, reply) {

        let sql = 'SELECT * FROM recipes';
        const params = [];

        if (request.query.cuisine) {
            sql += ' WHERE cuisine = ?';
            params.push(request.query.cuisine);
        }

        db.all(sql, params, (err, results) => {

            if (err) {
                throw err;
            }

            reply(results);
        });
    }
}]);

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
