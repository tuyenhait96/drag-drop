// react
import { useState } from "react";
// constants
import { jsonData } from "../constants.ts";

export const useDraggableState = () => {
  const [userAnswers, setUserAnswers] = useState({
    first: { answer: "", color: "" },
    second: { answer: "", color: "" },
  });
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [draggedWord, setDraggedWord] = useState(null);
  const [disabledInputs, setDisabledInputs] = useState({
    first: false,
    second: false,
  });
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [data, setData] = useState(jsonData.question.dragWords);

  return {
    userAnswers,
    setUserAnswers,
    isCorrect,
    setIsCorrect,
    draggedWord,
    setDraggedWord,
    disabledInputs,
    setDisabledInputs,
    isAnswerCorrect,
    setIsAnswerCorrect,
    data,
    setData,
  };
};
