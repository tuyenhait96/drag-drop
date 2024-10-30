// react
import React from "react";
import { batch } from "react-redux";
// components
import { BlankInput } from "./BlankInput.tsx";

const ParagraphContent = (state) => {
  const {
    userAnswers,
    setUserAnswers,
    setIsCorrect,
    data,
    setData,
    setDisabledInputs,
    disabledInputs,
    handleDrop,
  } = state || {};
  let blankIndex = 0;

  return data.paragraph.split(/(\[_input\])/).map((part, index) => {
    if (part === "[_input]") {
      const blank = data.blanks[blankIndex++];
      const blankKey = blank?.position;
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
            // Only allow drop if the blank type is 'drag'
            if (blank?.type === "drag") {
              handleDrop(blank.id, blank?.correctAnswer);
            }
          }}
          onDragOver={(e => {
            if (blank?.type === "drag") {
              e.preventDefault()
            }
          })}
          disabled={disabledInputs[blankKey]}
          backgroundColor={userAnswers[blankKey]?.color}
        />
      );
    }
    return part;
  });
};

export default ParagraphContent;
