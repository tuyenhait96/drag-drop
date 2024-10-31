// types.ts
type Answer = {
  answer: string;
  color: string;
};

export type UserAnswers = {
  first: Answer;
  second: Answer;
};

export type DragWord = {
  id: number;
  word: string;
  color: string;
};

type Blank = {
  position: string;
  correctAnswer: string;
};

export type QuestionData = {
  paragraph: string;
  dragWords: DragWord[];
  blanks: Blank[];
};

export type BlankInputProps = {
  index: number;
  value: string;
  backgroundColor: string;
  disabled: boolean;
  onChange: (value: string) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
};

export type DraggableWordProps = {
  index: number;
  onDragStart: (data: string | null) => void;
  onDragEnd: (e: React.DragEvent | React.TouchEvent) => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

export interface DraggableListProps {
  transitions: any;
  handleDragStart: (item: string) => void;
  handleDragEnd: () => void;
}

export interface Position {
  x: number;
  y: number;
}
