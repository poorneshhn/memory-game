import React from "react";
import { algorithm, checkForWin, checkIfPresent } from "../logic/gameLogic";
import { CARDS_COUNT } from "../utils/constant";
import "./card.css";

const Card = ({
  start,
  setScoreStack,
  stack,
  item,
  isFlipped,
  setIsGameWon,
}) => {
  const clickHandler = () => {
    if (!start) {
      alert("Please start the timer first!");
      return;
    }
    if (checkIfPresent(stack, item.id)) {
      return;
    }
    let { scoreStack, isPop } = algorithm(stack, item);
    setScoreStack(scoreStack);
    var arr = structuredClone(scoreStack);

    if (isPop) {
      arr.pop();
      arr.pop();
      setTimeout(() => {
        setScoreStack(arr);
      }, 1000);
    }

    if (!isPop) {
      if (checkForWin(arr, CARDS_COUNT)) {
        setIsGameWon(true);
      }
    }
  };
  return (
    <div className="flip-card" onClick={clickHandler}>
      <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        <div className="flip-card-front">Flip Me</div>
        <div className="flip-card-back">
          <h1>{item.value}</h1>
        </div>
      </div>
    </div>
  );
};

export default Card;
