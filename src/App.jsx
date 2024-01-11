import { useState, useEffect } from "react";

export default function App() {
  const [cookies, setCookies] = useState(0);
  const [cps, setCps] = useState(1);
  const [clickValue, setClickValue] = useState(1);

  useEffect(() => {
    const cookieInterval = setInterval(() => {
      setCookies((currentCookies) => currentCookies + 1);
      localStorage.setItem("cookies", cookies);
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

  return (
    <div>
      <h1>COOKIES: {cookies}</h1>
      <h4>cps: {cps}</h4>
      <h4>click value: {clickValue}</h4>
      <button onClick={increaseCookies}>🍪</button>
      <button onClick={increaseCps}>cps+1</button>
      <button onClick={increaseValue}>value+1</button>
    </div>
  );
}
