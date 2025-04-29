import { KeyboardEvent } from "react";

type DigitInputProps = {
  onChange: (value: string) => void;
  ref: (el: HTMLInputElement | null) => void;
  index: number;
  focus?: boolean;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  error?: boolean;
};

const DigitInput = ({
  onChange,
  ref,
  index,
  focus = false,
  onKeyDown,
  error,
}: DigitInputProps) => {
  return (
    <input
      onChange={(e) => onChange(e.target.value)}
      ref={ref}
      maxLength={1}
      key={index}
      className={`border-2 border-gray-300 rounded-md w-12 h-12 mx-2 text-center text-xl ${
        focus ? "border-blue-500" : ""
      } ${error ? "border-red-500" : ""}`}
      autoFocus={focus}
      onKeyDown={onKeyDown}
    />
  );
};

export default DigitInput;
