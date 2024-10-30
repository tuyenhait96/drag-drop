// react
import React from "react";
import { animated } from "react-spring";
// types
import { DraggableWordProps } from "../types.ts";

const DraggableWord = ({
  index,
  style,
  onDragStart,
  onDragEnd,
  children,
}: DraggableWordProps) => (
  <animated.div
    key={index}
    className="drag-word"
    style={style}
    draggable
    onDragStart={onDragStart}
    onDragEnd={onDragEnd}
  >
    {children}
  </animated.div>
);
export default DraggableWord;
