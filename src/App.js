// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useState, useEffect } from "react";

// 1.check both curency r eaqul then |dont fetch no need to send https reqst
// 2.check input value is crrt r not in number type?
// 3.display mssg when fetching

export default function App() {
  const [inp, setInp] = useState("");
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchMoney() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${inp}&from=${from}&to=${to}`
          );

          const data = await res.json();
          setIsLoading(false);
          if (!data.message) {
            const obj = data.rates;
            setResult(obj[to] + " " + to);
          } else throw new Error(data.message);
        } catch (err) {
          if (err.message === "invalid amount") {
            setResult("Please Enter Amount 💶");
          }
          // if (err.message === "bad currency pair") {
          //    setResult(`${inp} ${from}`);
          // return;
          // }
          // else {setResult(err.message);}
        }
      }
      // here not calling/fetching data from api when both r eaqul simpley return set inpvalue to output
      if (from === to) return setResult(`${inp} ${from}`);
      fetchMoney();
      return function () {
        if (inp === 0) {
          setFrom("EUR");
          setTo("USD");
        }
      };
    },
    [inp, from, to]
  );

  return (
    <div>
      <input
        type="text"
        value={inp}
        placeholder="Enter Money"
        onChange={(e) =>
          setInp(
            Number.isNaN(Number(e.target.value)) ? "" : Number(e.target.value)
          )
        }
        //this is alltym doing when loading something we set user not to select anything in ui for disabelling the input feilds
        //disabled={isLoading}
      />
      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={to} onChange={(e) => setTo(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{isLoading ? "Loading..." : result}</p>
    </div>
  );
}
