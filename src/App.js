import React, { useEffect, useState } from 'react';
import Equation from './Equation';
import './App.css';
import Dropdown from './Dropdown';

function App() {
  const [coins, setCoins] = useState([]);
  const [currency1, setCurrency1] = useState('BTC');
  const [currency2, setCurrency2] = useState('ETH');
  const [rate1, setRate1] = useState(1);
  const [rate2, setRate2] = useState(1);

  /**
   * Call one time after component is mounted
   */
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

  /**
   * Call this to do the initial calculation and a fresh calculation on every render.
   */
  useEffect(calculate);

  /**
   * Handler for dropdown changes. Update the currency symbol for the changed dropdown.
   */
  const handleDropdown = (e, id) => {
    if (id === 'curr1') {
      setCurrency1(e.target.value);
    } else {
      setCurrency2(e.target.value);
    }
  };

  /**
   * Click handler for the Swap button.
   */
  const swapCurrencies = () => {
    const one = currency1;
    setCurrency1(currency2);
    setCurrency2(one);
  };

  /**
   * Calculate and display the exchange rate between the selected currencies.
   */
  function calculate() {
    if (coins.length > 0) {
      const curr1 = coins.find((coin) => coin.symbol === currency1);
      const curr2 = coins.find((coin) => coin.symbol === currency2);
      //console.log(currency1, curr1.price, currency2, curr2.price);
      const places = 10000; // Set number of decimal places here
      const exchange1 = curr2.price / curr1.price;
      const exchange2 = curr1.price / curr2.price;
      setRate1(Math.round(exchange1 * places) / places);
      setRate2(Math.round(exchange2 * places) / places);
    }
  }

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
                options={coins}
                value={currency1}
                disabledValue={currency2}
                onChange={handleDropdown}
              />
            </div>

            {/* Swap button */}
            <div className="col">
              <button
                className="btn-swap"
                onClick={() => swapCurrencies()}>{`< Swap >`}</button>
            </div>

            {/* Currency 2 select */}
            <div className="col">
              <Dropdown
                id="curr2"
                label="Currency 2"
                options={coins}
                value={currency2}
                disabledValue={currency1}
                onChange={handleDropdown}
              />
            </div>
          </div>

          {/* Display equations */}
          <div className="display">
            <Equation
              amt1={1}
              curr1={currency1}
              amt2={rate1}
              curr2={currency2}
            />
            <Equation
              amt1={rate2}
              curr1={currency1}
              amt2={1}
              curr2={currency2}
            />
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
                  <span>{currency1}</span>
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
                  <span>{currency2}</span>
                </div>
              </div>
            </div>
            {/* Display calculated equation */}
            <div className="display">
              <Equation
                amt1={1}
                curr1={currency1}
                amt2={1}
                curr2={currency2}
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
