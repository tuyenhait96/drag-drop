// react
import React from "react";
import { useTransition } from "react-spring";
// component
import ParagraphContent from "./component/ParagraphContent.tsx";
import DraggableList from "./component/DraggableList.tsx";
import ResultMessage from "./component/ResultMessage.tsx";
// hooks
import { useDraggableState } from "./hooks/useDraggableState.ts";
import { useDragHandlers } from "./hooks/useDragHandlers.ts";
// constants
import { jsonData } from "./constants.ts";
// style
import "./style.css";

const Draggable = () => {
  const state = useDraggableState();
  const { handleDrop, handleDragStart, handleDragEnd } = useDragHandlers(state);

  const transitions = useTransition(state.data, {
    from: { opacity: 0, transform: "translateY(20px)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(-20px)" },
    keys: state.data.map((item) => item.id),
  });

  const handleSubmit = () => {
    const correctAnswers = jsonData.question.blanks.map((b) => b.correctAnswer);
    const userInputs = [
      state.userAnswers.first.answer,
      state.userAnswers.second.answer,
    ];
    state.setIsCorrect(
      JSON.stringify(correctAnswers) === JSON.stringify(userInputs)
    );
  };

  return (
    <div className="draggable-container">
      <h1>Drag and Drop</h1>
      <div className="paragraph">
        <ParagraphContent {...state} handleDrop={handleDrop} />
      </div>

      <div className="drag-words">
        <DraggableList
          transitions={transitions}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
        />
      </div>
      <button onClick={handleSubmit} className="button-submit">
        Submit
      </button>
      <ResultMessage isCorrect={state.isCorrect} />
    </div>
  );
};

export default Draggable;
