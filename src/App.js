import React, { useEffect, useState } from 'react';
import Equation from './Equation';
import './App.css';
import Dropdown from './Dropdown';

function App() {
  const [coins, setCoins] = useState({});

  // Call one time after component is mounted
  useEffect(() => {
    // Hit the API. Filter to take only the top 10, then get fields
    fetch('https://api.coinpaprika.com/v1/tickers')
      .then((response) => response.json())
      .then((data) => {
        const tickerTop10 = data
          .filter((obj) => {
            if (obj.rank > 0 && obj.rank <= 10) {
              return true;
            }
            return false;
          })
          .map((obj) => {
            return {
              id: obj.id,
              name: obj.name,
              symbol: obj.symbol,
              rank: obj.rank,
              price: obj.quotes.USD.price
            };
          });
        setCoins(tickerTop10);
      });
  }, []);

  const options = [
    { id: 'usdollar', name: 'US Dollar', symbol: 'USD' },
    { id: 'euro', name: 'Euro', symbol: 'EUR', isDisabled: true },
    { id: 'pound', name: 'Great Britain Pound', symbol: 'GBP' },
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' }
  ];

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
              <Dropdown
                id="curr1"
                label="Currency 1"
                options={options}
                defaultState="USD"
              />
            </div>

            {/* Swap button */}
            <div className="col">
              <button className="btn-swap">{`< Swap >`}</button>
            </div>

            {/* Currency 2 select */}
            <div className="col">
              <Dropdown
                id="curr2"
                label="Currency 2"
                options={options}
                defaultState="EUR"
              />
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
