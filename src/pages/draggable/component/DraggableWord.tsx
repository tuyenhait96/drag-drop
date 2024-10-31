// react
import React, { useState, useCallback, useRef } from "react";
import { animated, useSpring } from "react-spring";
// types
import { DraggableWordProps, Position } from "../types";

const DraggableWord: React.FC<DraggableWordProps> = ({
  index,
  style = {},
  className = "",
  onDragStart,
  onDragEnd,
  children,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [touchOffset, setTouchOffset] = useState<Position>({ x: 0, y: 0 });
  const initialPosition = useRef<Position>({ x: 0, y: 0 });

  // Animation spring for the dragging state
  const [{ xy }, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 1, tension: 500, friction: 25 },
  }));

  // Handle drag start
  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      if (isTouch) return;

      setIsDragging(true);
      const rect = e.currentTarget.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      if (e.dataTransfer.setDragImage) {
        e.dataTransfer.setDragImage(e.currentTarget, offsetX, offsetY);
      }

      e.dataTransfer.setData("text/plain", String(index));
      onDragStart(e.currentTarget.textContent);
    },
    [index, onDragStart, isTouch]
  );

  // Handle drag end
  const handleDragEnd = useCallback(
    (e: React.DragEvent) => {
      if (isTouch) return;

      setIsDragging(false);
      set({ xy: [0, 0] });
      onDragEnd(e);
    },
    [onDragEnd, set, isTouch]
  );

  // Handle touch start
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsTouch(true);
      const touch = e.touches[0];
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();

      // Store the initial touch position and element position
      initialPosition.current = {
        x: rect.left,
        y: rect.top,
      };

      // Calculate offset from touch point to element origin
      setTouchOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });

      setIsDragging(true);
      onDragStart(target.textContent);
    },
    [onDragStart]
  );

  // Handle touch move
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;

      const touch = e.touches[0];
      const target = e.currentTarget;
      onDragStart(target.textContent);

      // Calculate the new position relative to the initial element position
      const newX = touch.clientX - touchOffset.x;
      const newY = touch.clientY - touchOffset.y;

      // Calculate the movement relative to the initial position
      const deltaX = newX - initialPosition.current.x;
      const deltaY = newY - initialPosition.current.y;

      requestAnimationFrame(() => {
        set({
          xy: [deltaX, deltaY],
        });
      });

      // Prevent scrolling while dragging
      e.preventDefault();
    },
    [isDragging, touchOffset, set, onDragStart]
  );

  // Handle touch end
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(false);
      setIsTouch(false);
      set({ xy: [0, 0] });
      onDragEnd(e);
    },
    [onDragEnd, set]
  );

  // Transform spring values into CSS transform
  const transform = xy.to((x, y) => `translate3d(${x}px, ${y}px, 0)`);

  return (
    <animated.div
      className={`drag-word ${isDragging ? "dragging" : ""} ${className}`}
      style={{
        ...style,
        transform,
        touchAction: "none",
        userSelect: "none",
        cursor: isDragging ? "grabbing" : "grab",
        position: "relative",
        zIndex: isDragging ? 1000 : 1,
      }}
      draggable={!isTouch}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </animated.div>
  );
};

export default DraggableWord;
