import React from "react";
import { checkIfPresent } from "../logic/gameLogic";
import Card from "./Card";
import "./card-list.css";

const CardList = (props) => {
  return (
    <div className="card-list">
      {props.data.map((item) => {
        return (
          <Card
            key={item.id}
            item={item}
            stack={props.scoreStack}
            isFlipped={checkIfPresent(props.scoreStack, item.id)}
            setScoreStack={props.setScoreStack}
            setIsGameWon={props.setIsGameWon}
            start={props.start}
          />
        );
      })}
    </div>
  );
};

export default CardList;
