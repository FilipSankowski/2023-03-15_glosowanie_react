import { useState } from "react";

function SelectCandidateOptions(props) {
  const candidatesArray = props.candidatesArray;

  const optionList = candidatesArray.map((option) => {
    const optionText = `${option.id}. ${option.name} ${option.surname} - ${option.party}`;
    return (
      <option key={option.id} value={option.id}>
        {optionText}
      </option>
    )
  });

  return optionList;
}

export default function Home() {
  const defaultFormData = {
    name:'',
    surname:'',
    candidateId:''
  };
  const [formData, setFormData] = useState(defaultFormData);
  // TODO: ze serwera
  const candidatesArray = [
    {
      id: '1',
      name: 'name',
      surname: 'surname',
      party: 'party'
    }
  ]

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(
      {...formData, [name]:value}
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('formData: ', formData);
  }
  
  return (
    <>
      <div className='formContainer'>
        
        <div className='formItem'>
          <label> Podaj imię:<br/>
            <input
              type='text'
              name='name'
              value={formData.name || ''}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className='formItem'>
          <label> Podaj nazwisko:<br/>
            <input
              type='text'
              name='surname'
              value={formData.surname || ''}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className='formItem'>
          <label> Wybierz kandydata:<br/>
            <select
              name='candidateId'
              value={formData.candidateId || ''}
              onChange={handleChange}
            >
              <option disabled hidden></option>
              <SelectCandidateOptions candidatesArray={candidatesArray}/>
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