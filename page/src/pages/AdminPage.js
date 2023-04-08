import { useEffect, useState } from "react"

function ResultReview() {
  const [voteResult, setVoteResult] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:4000/getResult')
      .then(res => res.json())
      .then(json => setVoteResult(json));
  }, []);

  console.log(voteResult);
}

export default function AdminPage() {
  return (
    <>
      <ResultReview />
    </>
  )
}