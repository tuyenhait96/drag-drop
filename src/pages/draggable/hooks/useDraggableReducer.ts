// react
import { useReducer } from "react";
// json
import jsonData from "../data.json";
// constants
import { ActionTypes } from "../constants.ts";
const {
  SET_USER_ANSWERS,
  SET_IS_CORRECT,
  SET_DRAGGED_WORD,
  SET_DISABLED_INPUTS,
  SET_IS_ANSWER_CORRECT,
  SET_DATA,
} = ActionTypes;

const initialState = {
  userAnswers: {},
  isCorrect: null,
  draggedWord: null,
  disabledInputs: {},
  isAnswerCorrect: false,
  data: {
    paragraph: jsonData.question.paragraph || "",
    blanks: jsonData.question.blanks || [],
    dragWords: jsonData.question.dragWords || [],
  },
};

// Initialize disabledInputs dynamically based on blanks
jsonData.question.blanks.forEach((blank) => {
  if (blank.type === "drag") {
    initialState.disabledInputs[blank?.position] = true;
  } else {
    initialState.disabledInputs[blank?.position] = false;
  }
});

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER_ANSWERS: {
      return {
        ...state,
        userAnswers: {
          ...state.userAnswers,
          [action.payload.position]: action.payload.answer,
        },
      };
    }
    case SET_IS_CORRECT: {
      return {
        ...state,
        isCorrect: action.payload,
      };
    }
    case SET_DRAGGED_WORD: {
      return {
        ...state,
        draggedWord: action.payload,
      };
    }
    case SET_DISABLED_INPUTS: {
      return {
        ...state,
        disabledInputs: {
          ...state.disabledInputs,
          [action.payload.position]: action.payload.answer,
        },
      };
    }
    case SET_IS_ANSWER_CORRECT: {
      return {
        ...state,
        isAnswerCorrect: action.payload,
      };
    }
    case SET_DATA: {
      return {
        ...state,
        data: {
          ...state.data,
          dragWords: action.payload.dragWords,
        },
      };
    }
    default:
      return state;
  }
};

export const useDraggableReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function setUserAnswers(value) {
    dispatch({ type: ActionTypes.SET_USER_ANSWERS, payload: value });
  }

  function setIsCorrect(value) {
    dispatch({ type: ActionTypes.SET_IS_CORRECT, payload: value });
  }

  function setDraggedWord(value) {
    dispatch({ type: ActionTypes.SET_DRAGGED_WORD, payload: value });
  }

  function setDisabledInputs(value) {
    dispatch({ type: ActionTypes.SET_DISABLED_INPUTS, payload: value });
  }

  function setIsAnswerCorrect(value) {
    dispatch({ type: ActionTypes.SET_IS_ANSWER_CORRECT, payload: value });
  }

  function setData(data) {
    dispatch({ type: ActionTypes.SET_DATA, payload: data });
  }

  return {
    ...state,
    setUserAnswers,
    setIsCorrect,
    setDraggedWord,
    setDisabledInputs,
    setIsAnswerCorrect,
    setData,
  };
};
