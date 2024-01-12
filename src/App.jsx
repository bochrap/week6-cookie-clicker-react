import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [cookies, setCookies] = useState(parseInt(localStorage.getItem("cookies")) || 0);
  const [cps, setCps] = useState(parseInt(localStorage.getItem("cps")) || 1);
  const [clickValue, setClickValue] = useState(parseInt(localStorage.getItem("clickValue")) || 1);

  const upgrades = [
    { name: "upgrade1", price: "10", type: "cv", bonus: "1" },
    { name: "upgrade2", price: "50", type: "cv", bonus: "5" },
    { name: "upgrade3", price: "500", type: "cv", bonus: "10" },
    { name: "upgrade4", price: "2000", type: "cps", bonus: "5" },
    { name: "upgrade5", price: "5500", type: "cps", bonus: "10" },
    { name: "upgrade6", price: "10000", type: "cps", bonus: "100" },
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
    <div className="main">
      <div className="section-cookie">
        <p id="theCookie" onClick={increaseCookies}>
          🍪
        </p>
        <h1 id="counter">{cookies}</h1>
        <h4>🍪/s: {cps}</h4>
        <h4>🍪/click: {clickValue}</h4>
      </div>
      <div className="section-upgrades">
        {upgrades.map((item) => (
          <button
            onClick={() => validateUpgrade(item.type, parseInt(item.bonus), parseInt(item.price))}
            key={item.name + item.type + item.price}
            className={cookies >= item.price ? "" : "hidden"}
          >{`+${item.bonus}${item.type} for ${item.price}🍪`}</button>
        ))}
      </div>
      <button className="reset" onClick={resetLocalStorage}>
        RESET
      </button>
    </div>
  );
}
