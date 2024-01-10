import React, { FC, MouseEvent } from "react";

interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  active?: boolean;
  text: string;
  color?: string;
}

const Button: FC<ButtonProps> = ({ onClick, active, text }) => {
  return (
    <button
      onClick={onClick}
      className={`btn  btn-secondary ${active ? "btn-active" : "btn-outline"}`}
    >
      {text}
    </button>
  );
};

export default Button;
