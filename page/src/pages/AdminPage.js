import { createContext, useContext, useEffect, useState } from "react"

const ResultContext = createContext();

function ResultReview() {
  const voteResult = useContext(ResultContext);
  let voterLists = {};

  // Podzieli wszystkich głosujących na poszczególne partie - zapisze jako obiekt voterLists
  try {
    (voteResult.voters).map((voter) => {
      const text = `${voter.imie} ${voter.nazwisko}`;
      const name = voter.nazwa;

      // voterLists jest obiektem który jako własność o nazwie partii przechowuje array nazwisk które na tę partię głosują
      // Jeżeli wśród kluczy jest nazwa partii, to doda do arraya dane głosującego, jak nie ma to utworzy nową własność.
      if ((Object.keys(voterLists)).includes(name)) {
        voterLists = {...voterLists, [name]:[...voterLists[name], text]};
      } else {
        voterLists = {...voterLists, [name]:[text]};
      }
    })
  }
  catch (err) {
    //console.log(err);
  }

  console.log(voterLists);
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
        <ResultReview />
      </ResultContext.Provider>
    </>
  )
}