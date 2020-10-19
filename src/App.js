import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Currency Converter</h1>
      </header>

      <main className="main">
        <section>
          <h2>Currencies</h2>

          <div className="cols controls">
            {/* Currency 1 select */}
            <div className="col">
              <label htmlFor="curr1">Currency 1</label>
              <select>
                <option>Select...</option>
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>

            {/* Swap button */}
            <div className="col">
              <button>{`< Swap >`}</button>
            </div>

            {/* Currency 2 select */}
            <div className="col">
              <label htmlFor="curr2">Currency 1</label>
              <select>
                <option>Select...</option>
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>
          </div>

          {/* Display equations */}
          <div className="display">
            <p className="equation">1 USD = 1.25 EUR</p>
            <p className="equation">1 EUR = 0.75 USD</p>
          </div>
        </section>

        <section>
          <h2>Amounts</h2>

          <div className="cols controls">
            {/* Amount 1 */}
            <div className="col">
              <label htmlFor="amount1">Amount</label>
              <input type="text" id="amt1" placeholder="Enter an amount" />
            </div>

            {/* Amount 2 */}
            <div className="col">
              <label htmlFor="amount2">Amount</label>
              <input type="text" id="amt2" placeholder="Enter an amount" />
            </div>
            {/* Display equations */}
            <div className="display">
              <p className="equation">5 USD = 11.25 EUR</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
