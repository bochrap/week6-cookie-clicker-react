import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [cookies, setCookies] = useState(parseInt(localStorage.getItem("cookies")) || 0);
  const [cps, setCps] = useState(parseInt(localStorage.getItem("cps")) || 1);
  const [clickValue, setClickValue] = useState(parseInt(localStorage.getItem("clickValue")) || 1);

  const upgrades = [
    { name: "upgrade1", price: "10", type: "cv", bonus: "1" },
    { name: "upgrade2", price: "100", type: "cps", bonus: "1" },
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

  function increaseCps(value) {
    setCps(cps + value);
  }

  function increaseValue(value) {
    setClickValue(clickValue + value);
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

  function validateUpgrade(upgradeType, upgradeValue, itemPrice) {
    if (cookies < itemPrice) {
      null;
    } else {
      setCookies((currentCookies) => currentCookies - itemPrice);
      if (upgradeType === "cps") {
        increaseCps(upgradeValue);
      } else {
        increaseValue(upgradeValue);
      }
    }
  }

  return (
    <div>
      <h1>COOKIES: {cookies}</h1>
      <h4>cps: {cps}</h4>
      <h4>click value: {clickValue}</h4>
      <button onClick={increaseCookies}>🍪</button>
      <button onClick={() => increaseCps(1)}>cps+1</button>
      <button onClick={() => increaseValue(1)}>value+1</button>
      <button onClick={resetLocalStorage}>RESET</button>
      <div className="upgrades">
        {upgrades.map((item) => (
          <button
            onClick={() => validateUpgrade(item.type, parseInt(item.bonus), parseInt(item.price))}
            key={item.type + item.price}
            className={cookies >= item.price ? "" : "hidden"}
          >{`+${item.bonus}${item.type} for ${item.price}🍪`}</button>
        ))}
      </div>
    </div>
  );
}
