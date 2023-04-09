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
  const queryText = 'SELECT * FROM kandydat;';
  connection.query(queryText, (error, results, fields) => {
    if (error) throw error;
    //console.log(results);
    res.send(results);
  });

});

app.post('/insertVote', (req, res) => {
  const imie = req.body.imie;
  const nazwisko = req.body.nazwisko;
  const kandydat_id = req.body.kandydat_id;

  const queryText = `INSERT INTO glosujacy (imie, nazwisko, kandydat_id) VALUES ('${imie}', '${nazwisko}', '${kandydat_id}');`;
  connection.query(queryText, (error, results, fields) => {
    if (error) throw error;
    res.send('done');
  });
})

app.get('/getResult', (req, res) => {
  const resultData = {
    voters:[], // nazwa (partii), imie, nazwisko
    amount:[] // nazwa, ilosc
  };

  const queryVoters = 'SELECT kandydat.nazwa, glosujacy.imie, glosujacy.nazwisko FROM glosujacy JOIN kandydat ON kandydat.kandydat_id = glosujacy.kandydat_id;';
  connection.query(queryVoters, (error, results, fields) => {
    if (error) throw error;
    resultData.voters = results;
  });

  const queryAmount = 'SELECT kandydat.nazwa, COUNT(glosujacy.glosujacy_id) as ilosc FROM kandydat LEFT JOIN glosujacy ON kandydat.kandydat_id = glosujacy.kandydat_id GROUP BY kandydat.nazwa; ';
  connection.query(queryAmount, (error, results, fields) => {
    if (error) throw error;
    resultData.amount = results;

    res.send(resultData); // TODO: Zrozumieć czemu poza scopem tego bloku resultData nadal jest puste
  });
  
})