// react
import React from "react";
// components
import DraggableWord from "./DraggableWord.tsx";
// types
import { DraggableListProps } from "../types.ts";

const DraggableList = ({
  transitions,
  handleDragStart,
  handleDragEnd,
}: DraggableListProps) => {
  return transitions((style, item) => (
    <DraggableWord
      key={item.id}
      index={item.id}
      style={style}
      onDragStart={() => handleDragStart(item.word)}
      onDragEnd={handleDragEnd}
    >
      {item.word}
    </DraggableWord>
  ));
};
export default DraggableList;
