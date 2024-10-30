// react
import React from "react";
//types
import { BlankInputProps } from "../types";

export const BlankInput = ({
  index,
  value,
  backgroundColor,
  disabled,
  onChange,
  onDrop,
  onDragOver
}: BlankInputProps) => (
  <input
    key={index}
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onDrop={(e) => {
      e.preventDefault();
      onDrop(e);
    }}
    disabled={disabled}
    onDragOver={onDragOver}
    className="blank"
    style={{ backgroundColor: backgroundColor }}
  />
);
