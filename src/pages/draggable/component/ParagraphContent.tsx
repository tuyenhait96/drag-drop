// react
import React from "react";
import { batch } from "react-redux";
// components
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
  return data.paragraph.split(/(\[_input\])/).map((part, index) => {
    if (part === "[_input]") {
      const blankKey = index === 1 ? "first" : "second";
      const blank = data.blanks.find((b) => b.position === blankKey);

      return (
        <BlankInput
          key={index}
          index={index}
          value={userAnswers[blankKey]?.answer}
          onChange={(value) => {
            const draggedWordData = data.dragWords.find(
              (word) => word.word === value
            );

            const draggedColor = draggedWordData
              ? draggedWordData.color
              : "default";

            batch(() => {
              setIsCorrect(null);
              setUserAnswers({
                position: blankKey,
                answer: { answer: value, color: draggedColor },
              });
            });

            if (value === blank?.correctAnswer) {
              batch(() => {
                setData({
                  dragWords: data.dragWords.filter((w) => w.word !== value),
                });
                setDisabledInputs({
                  position: blankKey,
                  answer: true,
                });
              });
            }
          }}
          onDrop={(e) => {
            e.preventDefault();
            handleDrop(index === 1 ? 1 : 2, blank?.correctAnswer);
          }}
          disabled={disabledInputs[blankKey]}
          backgroundColor={userAnswers[blankKey]?.color || "#fff"}
        />
      );
    }
    return part;
  });
};

export default ParagraphContent;
