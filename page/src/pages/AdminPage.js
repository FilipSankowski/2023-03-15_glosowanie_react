import { createContext, useContext, useEffect, useState } from "react"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
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

      return true;
    })
  }
  catch (err) {

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
  ChartJS.register(ArcElement, Tooltip, Legend);
  const voteResult = useContext(ResultContext);
  const chartData = {
    labels: [],
    datasets: [{
      label: 'Ilość głosów',
      data: [],
      // TODO: Te kolory powinny się dodawać dynamicznie lub losowo, bo dodanie kolejnego kandydata do bazy sprawi, że diagram strzeli
      backgroundColor: [
        '#cc0000',
        '#00cc00',
        '#0000cc'
      ]
    }]
  }

  // Sprawdzi czy dane nie są 'undefined'
  if (voteResult.amount) {

    // Doda dane do chartData tak, aby można je było wyświetlić na wykresie
    for (const amountData of voteResult.amount) {
      (chartData.labels).push(amountData.nazwa);
      (chartData.datasets[0].data).push(amountData.ilosc);
    }

    return (
      <>
        <Doughnut data={chartData} />
      </>
    )
  } else {
    console.log("amount undefined");
  }
}

export default function AdminPage() {
  const [voteResult, setVoteResult] = useState([]);

  // Zebranie wyników wyborów z serwera
  useEffect(() => {
    fetch('http://127.0.0.1:4000/getResult')
      .then(res => res.json())
      .then(json => setVoteResult(json));
  }, []);

  return (
    <>
      <ResultContext.Provider value={voteResult}>
        <div className="voterListContainer">
          <div className="voterHeader">Głosy na poszczególne partie:</div>
          <ResultReview />
        </div>
        <div className="chartContainer">
          <ResultChart />
        </div>
      </ResultContext.Provider>
    </>
  )
}