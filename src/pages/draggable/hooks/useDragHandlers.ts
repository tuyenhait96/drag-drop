export const useDragHandlers = ({
  draggedWord,
  setDraggedWord,
  setUserAnswers,
  setDisabledInputs,
  data,
  setData,
  setIsAnswerCorrect,
  setIsCorrect,
  isAnswerCorrect,
}) => {
  const handleDrop = (blankId, correctAnswer) => {
    if (draggedWord === correctAnswer) {
      const blankKey = blankId === 1 ? "first" : "second";
      const draggedWordData = data.find((word) => word.word === draggedWord); // Find the color of the dragged word from dragWords
      const draggedColor = draggedWordData ? draggedWordData.color : "default";

      setUserAnswers((prev) => ({
        ...prev,
        [blankKey]: { answer: draggedWord, color: draggedColor },
      }));

      // Disable the input if the answer is correct
      setDisabledInputs((prev) => ({
        ...prev,
        [blankKey]: true,
      }));

      setData((prev) => prev.filter((w) => w.word !== draggedWord));
      setIsAnswerCorrect(true); // Mark answer as correct for onDragEnd
    } else {
      setIsAnswerCorrect(false); // Mark answer as incorrect for onDragEnd
    }
    setIsCorrect(null);
  };

  const handleDragStart = (word) => setDraggedWord(word);

  const handleDragEnd = () => {
    // If the answer was correct, remove the item; otherwise, keep it
    if (isAnswerCorrect) {
      setData((prev) => prev.filter((word) => word.word !== draggedWord));
    }
    // Reset dragged word and answer correctness for the next drag
    setDraggedWord(null);
    setIsAnswerCorrect(false);
  };

  return {
    handleDrop,
    handleDragStart,
    handleDragEnd,
  };
};