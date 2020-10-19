import React, { useEffect, useState } from 'react';
import Equation from './Equation';
import Dropdown from './Dropdown';
import InputField from './InputField';
import './App.css';

function App() {
  const [coins, setCoins] = useState([]);
  const [currency1, setCurrency1] = useState('BTC');
  const [currency2, setCurrency2] = useState('ETH');
  const [rate1, setRate1] = useState(1);
  const [rate2, setRate2] = useState(1);
  const [amount1, setAmount1] = useState('');
  const [amount2, setAmount2] = useState('');
  const [changedField, setChangedField] = useState('amount1');
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      });
  }, []);

  /**
   * Call this to do the initial calculation and also a fresh calculation on
   * every render.
   */
  useEffect(calculate);

  /**
   * Calculate and display the exchange rate between the selected currencies.
   */
  function calculate() {
    if (coins.length > 0) {
      const curr1 = coins.find((coin) => coin.symbol === currency1);
      const curr2 = coins.find((coin) => coin.symbol === currency2);
      const exchange1 = curr2.price / curr1.price;
      const exchange2 = curr1.price / curr2.price;
      setRate1(exchange1);
      setRate2(exchange2);
      if (changedField === 'amount1') {
        setAmount2(amount1 * rate1);
      } else {
        setAmount1(amount2 * rate2);
      }
    }
  }

  /**
   * Round a value for displaying. Start with 3 places. If less than 100, do 4
   * places, and if really small do more places.
   */
  function roundIt(value) {
    let places = 100;
    if (value < 100) {
      places = 10000;
    } else if (value < 0.001) {
      places = 1000000;
    }
    return Math.round((value + Number.EPSILON) * places) / places;
  }

  /**
   * Handler for dropdown changes. Update the currency symbol for the changed
   * dropdown.
   */
  const handleDropdown = (e, id) => {
    if (id === 'curr1') {
      setCurrency1(e.target.value);
    } else {
      setCurrency2(e.target.value);
    }
  };

  /**
   * Handle user typing in Amount fields
   */
  function handleAmountChange(e) {
    if (e.target.id === 'amount1') {
      setAmount1(Number(e.target.value));
    } else {
      setAmount2(Number(e.target.value));
    }
    // Set the changedField so calculate() knows who to update
    setChangedField(e.target.id);
  }

  /**
   * Handle click on Swap button. Swaps the selected currencies, and also the
   * values of the Amount fields
   */
  const swapCurrencies = () => {
    const one = currency1;
    setCurrency1(currency2);
    setCurrency2(one);
    const fieldone = amount1;
    setAmount1(amount2);
    setAmount2(fieldone);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Currency Converter</h1>
      </header>

      <main className="App-main">
        <section className="App-section">
          <h2 className="visually-hidden">Choose currencies</h2>

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

          <div className="col">
            <button className="btn-swap" onClick={() => swapCurrencies()}>
              Swap
            </button>
          </div>

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

          <div className="display">
            <Equation
              amt1={1}
              curr1={currency1}
              amt2={roundIt(rate1)}
              curr2={currency2}
            />
            <Equation
              amt1={roundIt(rate2)}
              curr1={currency1}
              amt2={1}
              curr2={currency2}
            />
          </div>
        </section>

        <section className="App-section">
          <h2 className="visually-hidden">Enter amounts</h2>

          <div className="col">
            <InputField
              id="amount1"
              label="Amount of currency 1"
              amount={amount1}
              currency={currency1}
              onChange={handleAmountChange}
            />
          </div>

          <div className="col">
            <InputField
              id="amount2"
              label="Amount of currency 2"
              amount={amount2}
              currency={currency2}
              onChange={handleAmountChange}
            />
          </div>

          <div className="display">
            <Equation
              amt1={amount1 ? roundIt(amount1) : ''}
              curr1={currency1}
              amt2={amount2 ? roundIt(amount2) : ''}
              curr2={currency2}
              isCalc={true}
            />
          </div>
        </section>

        {loading ? (
          <div className="loading">
            <div className="curtain"></div>
            <div className="loading-text">Loading...</div>
          </div>
        ) : (
          ''
        )}
      </main>
    </div>
  );
}

export default App;
