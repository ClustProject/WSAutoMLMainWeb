import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    fetch("hello")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setMessage(data);
      });
  });

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {message}
        </p>
      </header>
    </div>
  );
}

export default App;
