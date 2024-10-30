// react
import { batch } from "react-redux";

export const useDragHandlers = (state) => {
  const {
    draggedWord,
    setDraggedWord,
    setUserAnswers,
    setDisabledInputs,
    data,
    setData,
    setIsAnswerCorrect,
    setIsCorrect,
    isAnswerCorrect,
  } = state;

  const handleDrop = (blankId, correctAnswer) => {
    if (draggedWord === correctAnswer) {
      const blank = data.blanks.find((b) => b.id === blankId);
      const blankKey = blank?.position;
      const draggedWordData = data.dragWords.find(
        (word) => word.word === draggedWord
      );
      const draggedColor = draggedWordData ? draggedWordData.color : "default";

      batch(() => {
        setUserAnswers({
          position: blankKey,
          answer: { answer: draggedWord, color: draggedColor },
        });

        // Disable the input if the answer is correct
        setDisabledInputs({
          position: blankKey,
          answer: true,
        });
        setData({
          dragWords: data.dragWords.filter((w) => w.word !== draggedWord),
        });
        setIsAnswerCorrect(true); // Mark answer as correct for onDragEnd
      });
    } else {
      batch(() => {
        setIsAnswerCorrect(false); // Mark answer as incorrect for onDragEnd
      });
    }
    setIsCorrect(null);
  };

  const handleDragStart = (word) => setDraggedWord(word);

  const handleDragEnd = () => {
    // If the answer was correct, remove the item; otherwise, keep it
    if (isAnswerCorrect) {
      batch(() => {
        setData({
          dragWords: data.dragWords.filter((word) => word.word !== draggedWord),
        });
      });
    }
    batch(() => {
      // Reset dragged word and answer correctness for the next drag
      setDraggedWord(null);
      setIsAnswerCorrect(false);
    });
  };

  return {
    handleDrop,
    handleDragStart,
    handleDragEnd,
  };
};
