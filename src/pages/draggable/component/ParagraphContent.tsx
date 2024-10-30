import React from "react";
import { jsonData } from "../constants.ts";
import { BlankInput } from "./BlankInput.tsx";

const ParagraphContent = ({
  userAnswers,
  setUserAnswers,
  setIsCorrect,
  data,
  setData,
  setDisabledInputs,
  disabledInputs,
  handleDrop,
}) => {
  return jsonData.question.paragraph
    .split(/(\[_input\])/)
    .map((part, index) => {
      if (part === "[_input]") {
        const blankKey = index === 1 ? "first" : "second";
        const blank = jsonData.question.blanks.find(
          (b) => b.position === blankKey
        );

        return (
          <BlankInput
            key={index}
            index={index}
            value={userAnswers[blankKey].answer}
            onChange={(value) => {
              const draggedWordData = data.find((word) => word.word === value);
              setIsCorrect(null);
              const draggedColor = draggedWordData
                ? draggedWordData.color
                : "default";

              setUserAnswers((prev) => ({
                ...prev,
                [blankKey]: { answer: value, color: draggedColor },
              }));

              if (value === blank?.correctAnswer) {
                setData((prev) => prev.filter((w) => w.word !== value));
                setDisabledInputs((prev) => ({
                  ...prev,
                  [blankKey]: true,
                }));
              }
            }}
            onDrop={(e) => {
              e.preventDefault();
              handleDrop(index === 1 ? 1 : 2, blank?.correctAnswer);
            }}
            disabled={disabledInputs[blankKey]}
            backgroundColor={userAnswers[blankKey].color || "#fff"}
          />
        );
      }
      return part;
    });
};

export default ParagraphContent;
