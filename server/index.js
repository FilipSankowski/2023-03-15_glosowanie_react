const mysql = require("mysql");
const cors = require("cors");
const express = require("express");
const port = 3000;

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

  app.get('/selectCandidates', (req, res) => {
    const queryText = "SELECT * FROM kandydaci;"

    connection.query(queryText, (error, results, fields) => {
  	  if (error) throw error;
      res.send(results);
    });

  });

  app.get('/insertVote/:imie/:nazwisko/:kandydat', (req, res) => {
    const imie = req.params.imie;
    const nazwisko = req.params.nazwisko;
    const kandydat = req.params.kandydat;

    const queryText = `INSERT INTO glosujacy (imie, nazwisko, id_kandydata) VALUES ('${imie}', '${nazwisko}', '${kandydat}');`;
    connection.query(queryText, (error, results, fields) => {
  	  if (error) throw error;
    });
  })

  app.get('/selectVotes', (req, res) => {
    const queryText = `SELECT kandydaci.partia, COUNT(glosujacy.id_kandydata) as oddaneGlosy FROM kandydaci LEFT JOIN glosujacy ON glosujacy.id_kandydata = kandydaci.id GROUP BY kandydaci.partia;`
  
    connection.query(queryText, (error, results, fields) => {
  	  if (error) throw error;
      res.send(results);
    });
  })
};