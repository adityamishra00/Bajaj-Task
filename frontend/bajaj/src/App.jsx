import React, { useState } from 'react';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [title, setTitle] = useState('ABCD123');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedJson = JSON.parse(jsonInput);
      const res = await fetch('https://your-heroku-app.herokuapp.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedJson)
      });
      const data = await res.json();
      setResponse(data);
      setDropdownOptions([]); // Reset dropdown options on new submission
    } catch (error) {
      console.error('Invalid JSON input', error);
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_alphabet } = response;

    const filteredResponse = {};
    if (dropdownOptions.includes('Alphabets')) filteredResponse.alphabets = alphabets;
    if (dropdownOptions.includes('Numbers')) filteredResponse.numbers = numbers;
    if (dropdownOptions.includes('Highest alphabet')) filteredResponse.highest_alphabet = highest_alphabet;

    return (
      <div>
        <h3>Filtered Response</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>{title}</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='Enter JSON here'
            rows='10'
            cols='50'
          />
          <br />
          <button type="submit">Submit</button>
        </form>
        {response && (
          <div>
            <h2>Multi Filter</h2>
            <select
              multiple
              value={dropdownOptions}
              onChange={(e) => setDropdownOptions([...e.target.selectedOptions].map(option => option.value))}
            >
              <option value="Alphabets">Alphabets</option>
              <option value="Numbers">Numbers</option>
              <option value="Highest alphabet">Highest alphabet</option>
            </select>
            {renderResponse()}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;



