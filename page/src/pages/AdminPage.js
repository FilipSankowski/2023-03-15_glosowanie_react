import { createContext, useContext, useEffect, useState } from "react"

const ResultContext = createContext();

function ResultReview() {
  const voteResult = useContext(ResultContext);

  console.log(voteResult);
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