import "./InputBox.css";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

/**
 * InputBox Component
 *
 * This component allows users to input an amount in a selected currency
 * and convert it to another currency using exchange rates provided by an API.
 * It also allows the user to swap the "from" and "to" currencies.
 */
function InputBox({
  currencyOptions, // available currency options
  CurrencyApi, //  api info
  from, //  "from" currency
  onFromCurrencyChange, // Function to handle change of "from" currency
  to, // "to" currency
  onToCurrencyChange, // Function to handle change of "to" currency
}) {
  const [fromCurrencyAmount, setFromCurrencyAmount] = useState(0);
  const [toCurrencyAmount, setToCurrencyAmount] = useState(0);

  // "from" currency type
  const handleFromCurrencyChange = (event) => {
    onFromCurrencyChange(event.target.value);
  };

  //  "to" currency type
  const handleToCurrencyChange = (event) => {
    onToCurrencyChange(event.target.value);
  };

  // changes in "from" currency amount
  const handleFromCurrencyAmountChange = (event) => {
    const inputValue = event.target.value;

    // Allow only numeric values greater than or equal to 0
    if (inputValue >= 0 && !isNaN(inputValue)) {
      setFromCurrencyAmount(inputValue);
    }
  };

  // changes in "to" currency amount
  const convertToCurrency = (amount) => {
    if (CurrencyApi && CurrencyApi[to]) {
      setToCurrencyAmount(amount * CurrencyApi[to]);
    }
  };

  useEffect(() => {
    if (fromCurrencyAmount > 0 && from && CurrencyApi) {
      convertToCurrency(fromCurrencyAmount);
    } else {
      setToCurrencyAmount(0);
    }
  }, [fromCurrencyAmount, from, CurrencyApi, to]);

  // Swap the "from" and "to" currency types
  const swapCurrencyTypes = () => {
    onFromCurrencyChange(to);
    onToCurrencyChange(from);
  };

  return (
    <div className="wrapper">
      <div className="main-container">
        {/* "From" Currency Section */}
        <div className="form-box">
          <div className="sub-div">
            <label>From</label>
            <label className="currency-label">Currency Type</label>
          </div>

          <div className="inp-div">
            <div>
              <input
                type="number"
                placeholder="Amount"
                className="input-field"
                value={fromCurrencyAmount}
                onChange={handleFromCurrencyAmountChange}
              />
            </div>

            <div className="select-div">
              <select
                className="select-field"
                value={from}
                onChange={handleFromCurrencyChange}
              >
                {currencyOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Currency Swap Button */}
        <div className="button-div">
          <div className="button-container">
            <button className="primary-btn" onClick={swapCurrencyTypes}>
              Swap Currency Type
            </button>
          </div>
        </div>

        {/* "To" Currency Section */}
        <div className="form-box">
          <div className="sub-div">
            <label>To</label>
            <label className="currency-label">Currency Type</label>
          </div>

          <div className="inp-div">
            <div>
              <input
                type="number"
                placeholder="Amount"
                className="input-field"
                value={toCurrencyAmount}
                readOnly // "To" amount is automatically calculated, so it's read-only
                onChange={(e) => setToCurrencyAmount(e.target.value)} // Prevent editing
              />
            </div>

            <div className="select-div">
              <select
                className="select-field"
                value={to}
                onChange={handleToCurrencyChange}
              >
                {currencyOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Prop Types validation
InputBox.propTypes = {
  currencyOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  CurrencyApi: PropTypes.object,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  onFromCurrencyChange: PropTypes.func.isRequired,
  onToCurrencyChange: PropTypes.func.isRequired,
};

export default InputBox;
