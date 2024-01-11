import { useState, useEffect } from "react";

export default function App() {
  // const [cookies, setCookies] = useState(0);
  const [cookies, setCookies] = useState(parseInt(localStorage.getItem("cookies")) || 0);
  const [cps, setCps] = useState(parseInt(localStorage.getItem("cps")) || 1);
  const [clickValue, setClickValue] = useState(parseInt(localStorage.getItem("clickValue")) || 1);

  const upgrades = [
    { name: "upgrade1", price: "10", type: "cv" },
    { name: "upgrade2", price: "50", type: "cps" },
  ];

  useEffect(() => {
    const cookieInterval = setInterval(() => {
      setCookies((currentCookies) => currentCookies + 1);
      localStorage.setItem("cookies", cookies.toString());
      localStorage.setItem("cps", cps.toString());
      localStorage.setItem("clickValue", clickValue.toString());
    }, 1000 / cps);

    return () => {
      clearInterval(cookieInterval);
    };
  }, [cps, clickValue, cookies]);

  function increaseCps() {
    setCps(cps + 1);
  }

  function increaseValue() {
    setClickValue(clickValue + 1);
  }

  function increaseCookies() {
    setCookies(cookies + clickValue);
  }

  function resetLocalStorage() {
    localStorage.clear();
    setCps(1);
    setClickValue(1);
    setCookies(0);
  }

  return (
    <div>
      <h1>COOKIES: {cookies}</h1>
      <h4>cps: {cps}</h4>
      <h4>click value: {clickValue}</h4>
      <button onClick={increaseCookies}>🍪</button>
      <button onClick={increaseCps}>cps+1</button>
      <button onClick={increaseValue}>value+1</button>
      <button onClick={resetLocalStorage}>RESET</button>
    </div>
  );
}
