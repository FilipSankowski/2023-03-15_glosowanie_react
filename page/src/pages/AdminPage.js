import { createContext, useContext, useEffect, useState } from "react"

const ResultContext = createContext();

function ResultReview() {
  const voteResult = useContext(ResultContext);
  let voterData = {};

  // Podzieli wszystkich głosujących na poszczególne partie - zapisze jako obiekt voterData
  try {
    (voteResult.voters).map((voter) => {
      const text = `${voter.imie} ${voter.nazwisko}`;
      const name = voter.nazwa;

      // voterData jest obiektem który jako własność o nazwie partii przechowuje array nazwisk które na tę partię głosują
      // Jeżeli wśród kluczy jest nazwa partii, to doda do arraya dane głosującego, jak nie ma to utworzy nową własność.
      if ((Object.keys(voterData)).includes(name)) {
        voterData = {...voterData, [name]:[...voterData[name], text]};
      } else {
        voterData = {...voterData, [name]:[text]};
      }
    })
    //console.log(voterData);
  }
  catch (err) {
    //console.log(err);
  }

  // Dane z voterData zapisze jako numerowane listy, które następnie zapisze do voterLists
  const voterLists = [];
  for (const partia of Object.keys(voterData)) {
    // Wypunktowani wyborcy
    const list = voterData[partia].map((name, index) => {
      return (<li key={index}>{name}</li>)
    });
    // Dodanie nagłówka i zapisanie do voterLists
    voterLists.push(
      <div key={partia} className="voterListItem">
        <span className="voterListHeader">{partia}</span>
        <ol>
          {list}
        </ol>
      </div>
    )
  }

  return voterLists
}

function ResultChart() {
  const voteResult = useContext(ResultContext);

}

export default function AdminPage() {
  const [voteResult, setVoteResult] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:4000/getResult')
      .then(res => res.json())
      .then(json => setVoteResult(json));
  }, []);

  return (
    <>
      <ResultContext.Provider value={voteResult}>
        <div className="voterListContainer">
          <ResultReview />
        </div>
      </ResultContext.Provider>
    </>
  )
}