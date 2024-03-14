import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [copyColor, setCopyColor] = useState("blue");
  const [copy, setCopy] = useState("Copy");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  let [password, setPassword] = useState("");

  const makeItAgain = function () {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        setCopyColor("blue");
        setCopy("Copy");
        resolve();
      }, 3000);
    });
  };

  const copyPassword = () => {
    window.navigator.clipboard.writeText(password);
  };

  const passwordGenerate = () => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "01234567890";
    if (charAllowed) str += "?@#$%^&*></";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  };

  useEffect(() => {
    passwordGenerate();
  }, [length, numberAllowed, charAllowed]);

  return (
    <>
      <div className="main  h-44  w-3/5 rounded-lg flex align-middle justify-center flex-col">
        <div className="search">
          <input type="text" className=" h-10 rounded-lg" value={password} />
          <button
            style={{ backgroundColor: copyColor }}
            onClick={() => {
              setCopyColor("green");
              setCopy("Copied");
              copyPassword();
              makeItAgain();
            }}
          >
            {copy}
          </button>
        </div>
        <div className="condition">
          <input
            type="range"
            min={8}
            max={100}
            onChange={(event) => {
              setLength(event.target.value);
            }}
          />
          <label>Length :{length}</label>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label>Numbers</label>

          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label>Special</label>
        </div>
      </div>
    </>
  );
}

export default App;
