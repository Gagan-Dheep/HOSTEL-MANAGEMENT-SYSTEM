
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'internship'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Connected to database');
});
module.exports = connection;