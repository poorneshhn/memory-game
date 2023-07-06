import React, { useEffect, useRef, useState } from "react";
import CardList from "../components/CardList";
import Timer from "../components/Timer";
import { DATA } from "../utils/constant";
import { shuffle } from "../utils/utils";
import "./home.css";

const calculateMinsAndSecs = (time) => {
  let sec = Math.floor(time % 60);
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = "0" + min.toString();
  }

  if (sec < 10) {
    sec = "0" + sec.toString();
  }
  return { min, sec };
};

const Home = () => {
  const [scoreStack, setScoreStack] = useState([]);
  const timerCount = useRef(0);
  const [minAndSec, setMinAndSec] = useState({ min: "00", sec: "00" });
  const timerFunc = useRef(null);
  const [start, setStart] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [data, setData] = useState(DATA);

  const timerClickHandler = () => {
    setStart(true);
    timerFunc.current = setInterval(() => {
      let { min, sec } = calculateMinsAndSecs(timerCount.current);
      timerCount.current += 1;
      setMinAndSec({ min, sec });
    }, 1000);
  };

  useEffect(() => {
    let d = shuffle(structuredClone(DATA));
    setData(d);
  }, []);

  useEffect(() => {
    if (isGameWon) {
      clearInterval(timerFunc.current);
      setTimeout(() => {
        alert(
          `congratulations! You completed it in ${minAndSec.min} Minutes and ${minAndSec.sec} Seconds`
        );
      }, 1000);
    }
    // eslint-disable-next-line
  }, [isGameWon]);
  useEffect(() => {
    return () => clearInterval(timerFunc.current);
  }, []);
  const resetGame = () => {
    clearInterval(timerFunc.current);
    timerCount.current = 0;
    let { min, sec } = calculateMinsAndSecs(timerCount.current);
    timerCount.current += 1;
    setMinAndSec({ min, sec });
    setStart(false);
    setScoreStack([]);
    setIsGameWon(false);
    setData(shuffle(structuredClone(DATA)));
  };

  return (
    <div className="home-container">
      <h3>Memory Matching Game</h3>
      <div className="game-options">
        <div className="left">
          <Timer
            timerClickHandler={timerClickHandler}
            start={start}
            min={minAndSec.min}
            sec={minAndSec.sec}
          />
        </div>
        <p className="right reset" onClick={resetGame}>
          Reset
        </p>
      </div>
      <div className="cardlist-container">
        <CardList
          start={start}
          data={data}
          scoreStack={scoreStack}
          setIsGameWon={setIsGameWon}
          setScoreStack={setScoreStack}
        />
      </div>
    </div>
  );
};

export default Home;
