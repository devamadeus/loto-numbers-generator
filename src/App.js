import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [numbers1, setNumbers1] = useState([]);
  const [numbers2, setNumbers2] = useState([]);

  function getRandomNumber(min, max, usedNumbers) {
    let number = Math.floor(Math.random() * (max - min + 1)) + min;
    while (usedNumbers.includes(number)) {
      number = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return number;
  }

  function generateNumbers() {
    let usedNumbers1 = [...numbers1];
    let usedNumbers2 = [...numbers2];
    let newNumbers1 = [];
    for (let i = 0; i < 5; i++) {
      let number = getRandomNumber(1, 50, usedNumbers1);
      usedNumbers1.push(number);
      newNumbers1.push(number);
    }
    setNumbers1(newNumbers1);

    let newNumbers2 = [];
    for (let i = 0; i < 2; i++) {
      let number = getRandomNumber(1, 12, usedNumbers2);
      usedNumbers2.push(number);
      newNumbers2.push(number);
    }
    setNumbers2(newNumbers2);
  }

  // Use the useState hook to manage state for the myMillion value
  const [myMillion, setMyMillion] = useState('');
  // Use the useState hook to manage state for the saved inputs
  const [savedInputs, setSavedInputs] = useState([]);

  // Use the useEffect hook to retrieve the saved inputs from the local storage when the component mounts
  useEffect(() => {
    // Initialize an empty array for the saved inputs
    const inputs = [];
    // Iterate over the items in the local storage
    for (let i = 0; i < localStorage.length; i++) {
      // Get the key for the current item in the local storage
      const key = localStorage.key(i);
      // Get the value for the current item in the local storage
      const value = localStorage.getItem(key);
      // Parse the value as a JSON object
      const inputObject = JSON.parse(value);
      // Add the input object to the inputs array
      inputs.push(inputObject);
    }
    // Set the saved inputs state to the inputs array
    setSavedInputs(inputs);
  }, []);

  // Create a function to handle changes to the myMillion text field
  const handleMyMillionChange = (event) => {
    setMyMillion(event.target.value);
  };

  // Create a function to handle clicks on the Save button
  const handleSaveClick = () => {
    // Save the myMillion value in the local storage
    saveInput(myMillion);
    // Clear the myMillion value
    setMyMillion('');
  };

  // Create a function to save an input in the local storage
  const saveInput = (input) => {
    // Get the current date and time
    const date = new Date();
    // Format the date in the dd/mm/yyyy format
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    // Format the time in the hh:mm:ss format
    const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    // Create a JSON object to store the input, date and time, numbers and stars
    const inputObject = {
      input: input,
      date: `${formattedDate} ${formattedTime}`,
      numbers: numbers1.join(', '),
      stars: numbers2.join(', '),
    };

    // Save the input object in the local storage
    localStorage.setItem(date.getTime(), JSON.stringify(inputObject));

    // Retrieve the saved input from the local storage
    const savedInput = JSON.parse(localStorage.getItem(date.getTime()));
    // Add the saved input to the saved inputs array
    setSavedInputs([...savedInputs, savedInput]);
  };

  // Create a function to handle clicks on the Delete button
  const handleDeleteClick = (index) => {
    // Remove the input object from the saved inputs array at the specified index
    const updatedSavedInputs = [...savedInputs];
    updatedSavedInputs.splice(index, 1);
    // Update the saved inputs state with the updated array
    setSavedInputs(updatedSavedInputs);
    // Iterate over the items in the local storage
    for (let i = 0; i < localStorage.length; i++) {
      // Get the key for the current item in the local storage
      const key = localStorage.key(i);
      // Get the value for the current item in the local storage
      const value = localStorage.getItem(key);
      // Parse the value as a JSON object
      const inputObject = JSON.parse(value);
      // Check if the input object matches the input object at the specified index in the saved inputs array
      if (
        inputObject.input === savedInputs[index].input &&
        inputObject.date === savedInputs[index].date
      ) {
        // Remove the item from the local storage
        localStorage.removeItem(key);
        break;
      }
    }
  };

  return (
    <div className="App">
      <nav>
        <p className="title">Randomly Generate 5 Euromillions numbers and 2 stars!</p>
      </nav>
      <div className="results-etoiles-container">
        <div className="results">
          <div className="numbers">
            <p>Numbers</p>
            <div className="lottery-balls">
              {numbers1.map((number) => (
                <div className="lottery-ball" key={number}>
                  <span>{number}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="stars">
            <p>Stars</p>
            <div className="lottery-balls">
              {numbers2.map((number) => (
                <div className="lottery-ball" key={number}>
                  <span>{number}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="my-million">
        <label>My Million:</label>
        <input type="text" value={myMillion} onChange={handleMyMillionChange} />
      </div>
      <div className="button-container">
        <button onClick={generateNumbers} className="button">
          Generate Numbers
        </button>
        <button className="button save-button" onClick={handleSaveClick}>
          Save
        </button>
      </div>
      <div className="saved-inputs-container">
        {savedInputs.map((inputObject, index) => (
          <div className="saved-input-card card-element" key={index}>
            <h3 className="date-and-time">Played on: {inputObject.date}</h3>
            <h3 className="numbers-and-stars">Numbers: {inputObject.numbers}</h3>
            <h3 className="numbers-and-stars">Stars: {inputObject.stars}</h3>
            <h3>
              <span>Code My Million: </span>
              {inputObject.input}
            </h3>
            <button className="delete-button" onClick={() => handleDeleteClick(index)}>
              Delete <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
      <footer>
        <span>Made by </span>4m4deus
      </footer>
    </div>
  );
}

export default App;
