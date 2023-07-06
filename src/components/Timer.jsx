import React from "react";
import "./timer.css";

const Timer = (props) => {
  const { start, min, sec, timerClickHandler } = props;
  return (
    <div className="timer flex">
      <div>
        <button
          className="start-button"
          disabled={start}
          onClick={timerClickHandler}
        >
          Start
        </button>
      </div>
      <div className="flex">
        <span className="mins">{min}</span>
        <span className="colon">:</span>
        <span className="secs">{sec}</span>
      </div>
    </div>
  );
};

export default Timer;
