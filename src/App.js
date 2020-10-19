import React from 'react';
import Equation from './Equation';
import './App.css';
import './select-css.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Currency Converter</h1>
      </header>

      <main className="App-main">
        <section className="App-section">
          <h2 className="visually-hidden">Choose currencies</h2>

          <div className="cols controls">
            {/* Currency 1 select */}
            <div className="col">
              <div className="control">
                <label htmlFor="curr1">Currency 1</label>
                <select className="select-css">
                  <option>Select...</option>
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </select>
              </div>
            </div>

            {/* Swap button */}
            <div className="col">
              <button className="btn-swap">{`< Swap >`}</button>
            </div>

            {/* Currency 2 select */}
            <div className="col">
              <div className="control">
                <label htmlFor="curr2">Currency 2</label>
                <select className="select-css">
                  <option>Select...</option>
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </select>
              </div>
            </div>
          </div>

          {/* Display equations */}
          <div className="display">
            <Equation amt1={1} curr1={`USD`} amt2={1.25} curr2={`EUR`} />
            <Equation amt1={0.75} curr1={`USD`} amt2={1} curr2={`EUR`} />
          </div>
        </section>

        <section className="App-section">
          <h2 className="visually-hidden">Enter amounts</h2>

          <div className="cols controls">
            {/* Amount 1 */}
            <div className="col">
              <div className="control">
                <label htmlFor="amount1">Amount of currency 1</label>
                <div className="input-wrap">
                  <input
                    type="text"
                    id="amt1"
                    name="amt1"
                    className="input-amt"
                    placeholder="Enter an amount"
                  />
                  <span>{`USD`}</span>
                </div>
              </div>
            </div>

            {/* Amount 2 */}
            <div className="col">
              <div className="control">
                <label htmlFor="amount2">Amount of currency 2</label>
                <div className="input-wrap">
                  <input
                    type="text"
                    id="amt2"
                    name="amt2"
                    className="input-amt"
                    placeholder="Enter an amount"
                  />
                  <span>{`EUR`}</span>
                </div>
              </div>
            </div>
            {/* Display calculated equation */}
            <div className="display">
              <Equation
                amt1={5}
                curr1={`USD`}
                amt2={11.25}
                curr2={`EUR`}
                isCalc={true}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
