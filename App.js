import React, { useState } from 'react';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const handleJsonInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data) {
        throw new Error('Invalid JSON format. Expected a "data" array.');
      }
      setError('');

      const res = await fetch('https://your-backend-url.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      });

      const result = await res.json();
      setResponse(result);
    } catch (err) {
      setError('Invalid JSON or Server Error: ' + err.message);
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    let filteredResponse = {};

    if (selectedOptions.includes('Numbers')) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedOptions.includes('Alphabets')) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return JSON.stringify(filteredResponse, null, 2);
  };

  return (
    <div className="App">
      <h1>21BCT0199</h1>

      <textarea
        rows="10"
        cols="50"
        value={jsonInput}
        onChange={handleJsonInputChange}
        placeholder='Enter JSON, e.g. {"data": ["A","C","z"]}'
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <div>
          <label>Select what to display:</label>
          <select multiple={true} onChange={handleOptionChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>

          <h2>Response</h2>
          <pre>{renderFilteredResponse()}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
