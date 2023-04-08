const mysql = require("mysql");
const cors = require("cors");
const express = require("express");
const port = 4000;

const app = express();
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "glosowanie"
});

app.listen(port, () => {
  console.log("Server works");
});

sqlConnection();
// ==============

function sqlConnection() {
  connection.connect();

  app.get('/getCandidates', (req, res) => {
    const queryText = "SELECT * FROM kandydat;";

    connection.query(queryText, (error, results, fields) => {
  	  if (error) throw error;
      console.log(results);
      res.send(results);
    });

  });

  app.get('/insertVote/:imie/:nazwisko/:kandydat', (req, res) => {
    const imie = req.params.imie;
    const nazwisko = req.params.nazwisko;
    const kandydat = req.params.kandydat;

    const queryText = `INSERT INTO glosujacy (imie, nazwisko, id_kandydat) VALUES ('${imie}', '${nazwisko}', '${kandydat}');`;
    connection.query(queryText, (error, results, fields) => {
  	  if (error) throw error;
    });
  })

  app.get('/selectVotes', (req, res) => {
    const queryText = `SELECT kandydat.nazwa, COUNT(glosujacy.id_kandydat) as oddaneGlosy FROM kandydat LEFT JOIN glosujacy ON glosujacy.id_kandydat = kandydat.kandydat_id GROUP BY kandydat.nazwa;`
  
    connection.query(queryText, (error, results, fields) => {
  	  if (error) throw error;
      res.send(results);
    });
  })
};