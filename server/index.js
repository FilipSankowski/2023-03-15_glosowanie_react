const mysql = require("mysql");
const cors = require("cors");
const express = require("express");
const { query } = require("express");
const port = 4000;

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "glosowanie"
});

app.listen(port, () => {
  console.log("Server works");
});


// ==============

connection.connect();

app.get('/getCandidates', (req, res) => {
  const queryText = "SELECT * FROM kandydat;";

  connection.query(queryText, (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    res.send(results);
  });

});

app.post('/insertVote', (req, res) => {
  //console.log(req.body);
  const imie = req.body.imie;
  const nazwisko = req.body.nazwisko;
  const kandydat_id = req.body.kandydat_id;

  const queryText = `INSERT INTO glosujacy (imie, nazwisko, kandydat_id) VALUES ('${imie}', '${nazwisko}', '${kandydat_id}');`;
  console.log(queryText);
  // connection.query(queryText, (error, results, fields) => {
  //   if (error) throw error;
  // });
})

app.get('/selectVotes', (req, res) => {
  const queryText = `SELECT kandydat.nazwa, COUNT(glosujacy.id_kandydat) as oddaneGlosy FROM kandydat LEFT JOIN glosujacy ON glosujacy.id_kandydat = kandydat.kandydat_id GROUP BY kandydat.nazwa;`

  connection.query(queryText, (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
})