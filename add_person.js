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


let firstName = process.argv[2];
let lastName = process.argv[3];
let birthday = process.argv[4];

console.log(firstName, lastName, birthday);

function addPerson(firstName, lastName, birthday) {

  knex('famous_people')
  .insert({'first_name': firstName, 'last_name': lastName, 'birthdate': birthday})
  .then(() => console.log("data inserted"))
  .catch((err) => { console.log(err); throw err;});
}

addPerson(firstName, lastName, birthday);

