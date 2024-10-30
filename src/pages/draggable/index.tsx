// react
import React from "react";
import { useTransition } from "react-spring";
// component
import DraggableList from "./component/DraggableList.tsx";
import ParagraphContent from "./component/ParagraphContent.tsx";
import ResultMessage from "./component/ResultMessage.tsx";
// hooks
import { useDraggableReducer } from "./hooks/useDraggableReducer.ts";
import { useDragHandlers } from "./hooks/useDragHandlers.ts";
// style
import "./style.css";

const Draggable = () => {
  const state = useDraggableReducer();
  const { handleDrop, handleDragStart, handleDragEnd } = useDragHandlers(state);

  const transitions = useTransition(state.data.dragWords, {
    from: { opacity: 0, transform: "translateY(20px)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(-20px)" },
    keys: state.data.dragWords?.map((item) => item.id),
  });

  const handleSubmit = () => {
    const correctAnswers = state.data.blanks.map((b) => b.correctAnswer);
    const userInputs = state.data.blanks.map((b) => state.userAnswers[b.position]?.answer);

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
