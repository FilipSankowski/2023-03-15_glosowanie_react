import { useEffect, useState } from "react";

function SelectCandidateOptions() {
  const [candidatesArray, setCandidatesArray] = useState([]);

  useEffect(() => {
    // Niech wysyła zapytanie tylko kiedy candidatesArray jest pusty
    // Pyta serwer o listę kandydatów do wyborów
    if (candidatesArray.length === 0) {
      fetch('http://127.0.0.1:4000/getCandidates')
      .then(res => res.json())
      .then(json => setCandidatesArray(json));
    }
  }, [candidatesArray.length]);

  // Zapisuje nazwy kandydatów jako opcje pola select (html)
  const optionList = candidatesArray.map((option) => {
    const optionText = `${option.kandydat_id}. ${option.nazwa}`;
    return (
      <option key={option.kandydat_id} value={option.kandydat_id}>
        {optionText}
      </option>
    )
  });

  return optionList;
}

export default function Home() {
  const defaultFormData = {
    imie:'',
    nazwisko:'',
    kandydat_id:''
  };
  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(
      {...formData, [name]:value}
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // Ważne: bez nagłówka nie zadziała !
    const postParams = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    };

    // Wysyła zapytanie na serwer, z danymi głosowania w parametrach post, aby dodać nowy głos do bazy danych
    fetch('http://127.0.0.1:4000/insertVote', postParams);
    alert('Zagłosowano pomyślnie!');
    setFormData(defaultFormData);

  }
  
  // Zwraca na stronie formularz do wypełnienia
  return (
    <>
      <div className='formContainer'>
        
        <div className='formItem'>
          <label> Podaj imię:<br/>
            <input
              type='text'
              name='imie'
              value={formData.imie || ''}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className='formItem'>
          <label> Podaj nazwisko:<br/>
            <input
              type='text'
              name='nazwisko'
              value={formData.nazwisko || ''}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className='formItem'>
          <label> Wybierz kandydata:<br/>
            <select
              name='kandydat_id'
              value={formData.kandydat_id || ''}
              onChange={handleChange}
            >
              <option disabled hidden></option>
              <SelectCandidateOptions />
            </select>
            
          </label>
        </div>

        <div className='formItem'>
          <button onClick={handleSubmit}>Wyślij</button>
        </div>

      </div>
    </>
  );
};