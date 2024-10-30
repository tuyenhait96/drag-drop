// react
import React from "react";

const ResultMessage = ({ isCorrect }: { isCorrect: boolean | null }) => {
  if (isCorrect === null) return null;

  return (
    <div className={`result ${isCorrect ? "correct" : "incorrect"}`}>
      {isCorrect ? "Correct" : "Incorrect"}
    </div>
  );
};
export default ResultMessage;
