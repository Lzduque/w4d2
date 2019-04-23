const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

var artistName = process.argv[2];
console.log('artistName',artistName);

function findArtistsName (artistName) {
  knex.select('first_name', 'last_name', 'birthdate')
    .from('famous_people')
    // .where('first_name = $1', [artistName])
    .where({first_name: artistName})
    .orWhere({last_name: artistName})
    .asCallback((err, res) => {
      if (err) {
        callback([]);
      } else {
        console.log('res: ',res);
        console.log(`Found ${res.length}person(s) by the name '${artistName}':\n`);
        let count = 1;
          res.forEach((res) => {
          let date = res.birthdate.getDate() + "-" + (res.birthdate.getMonth() + 1) + "-" + res.birthdate.getFullYear();
          console.log(`- ${count}: ${res.first_name} ${res.last_name}, born '${date}'`);
          count ++;
        });
      }
    });
}

findArtistsName(artistName);