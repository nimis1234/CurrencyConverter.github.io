import "./App.css";
import InputBox from "./Components/InputBox";
import { useState, useEffect } from "react";
import UseCurrencyInfo from "./Hooks/UseCurrencyInfo";

function App() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("CAD");
  const { data: CurrencyApi } = UseCurrencyInfo(from);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (CurrencyApi && typeof CurrencyApi === "object") {
      const countryCodes = Object.keys(CurrencyApi);
      setOptions(countryCodes);
    }
  }, [CurrencyApi]);

  // Callback function to handle currency change
  const handleFromCurrencyChange = (newCurrency) => {
    setFrom(newCurrency);
    console.log(newCurrency);
  };

  const handleToCurrencyChange = (newCurrency) => {
    setTo(newCurrency);
  };

  return (
    <div className="bg-div">
      <InputBox
        currencyOptions={options}
        CurrencyApi={CurrencyApi}
        from={from}
        onFromCurrencyChange={handleFromCurrencyChange} // Pass callback instead of setFrom
        to={to}
        onToCurrencyChange={handleToCurrencyChange}
      />
    </div>
  );
}

export default App;
