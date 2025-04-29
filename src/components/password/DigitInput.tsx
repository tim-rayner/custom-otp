import { KeyboardEvent } from "react";

type DigitInputProps = {
  onChange: (value: string) => void;
  ref: (el: HTMLInputElement | null) => void;
  index: number;
  focus?: boolean;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
};

const DigitInput = ({
  onChange,
  ref,
  index,
  focus = false,
  onKeyDown,
}: DigitInputProps) => {
  return (
    <input
      onChange={(e) => onChange(e.target.value)}
      ref={ref}
      maxLength={1}
      key={index}
      className={`border-2 border-gray-300 rounded-md p-2 ${
        focus ? "border-blue-500" : ""
      }`}
      autoFocus={focus}
      onKeyDown={onKeyDown}
    />
  );
};

export default DigitInput;
