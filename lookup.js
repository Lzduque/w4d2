const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});


var artistName = process.argv[2];

function artistsName (artistName, callback) {
  client.query("SELECT * from famous_people where first_name = $1 or last_name = $1", [artistName], (err, res) => {
          if (err) {
            callback([]);
          } else {
            callback(res.rows);
          }
  });
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  artistsName(artistName, (rows) => {
    console.log(`Found ${rows.length}person(s) by the name '${artistName}':\n`);
    let count = 1;
    rows.forEach((row) => {
      let date = row.birthdate.getDate() + "-" + (row.birthdate.getMonth() + 1) + "-" + row.birthdate.getFullYear();
      console.log(`- ${count}: ${row.first_name} ${row.last_name}, born '${date}'`);
      count ++;
    });
  });
});
