// react
import React from "react";

const ResultMessage = ({ isCorrect }: { isCorrect: boolean | null }) => {
  if (isCorrect === null) return null;

  return (
    <div className={`result ${isCorrect ? "correct" : "incorrect"}`}>
      {isCorrect ? "Chính xác" : "Sai"}
    </div>
  );
};
export default ResultMessage;
