import { ClipboardEvent, KeyboardEvent } from "react";

type DigitInputProps = {
  onChange: (value: string) => void;
  ref: (el: HTMLInputElement | null) => void;
  index: number;
  focus?: boolean;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onPaste?: (event: ClipboardEvent<HTMLInputElement>) => void;

  error?: boolean;
  type?: string;
  disabled?: boolean;
};

const DigitInput = ({
  onChange,
  ref,
  index,
  focus = false,
  onKeyDown,
  onPaste,
  error,
  type = "number",
  disabled = false,
}: DigitInputProps) => {
  return (
    <input
      onChange={(e) => onChange(e.target.value)}
      ref={ref}
      max={9}
      min={0}
      key={index}
      className={`border-2 border-gray-300 rounded-md w-12 h-12 mx-2 text-center text-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
        focus ? "border-blue-500" : ""
      } ${error ? "border-red-500" : ""}`}
      autoFocus={focus}
      onKeyDown={onKeyDown}
      type={type}
      disabled={disabled}
      onPaste={onPaste}
    />
  );
};

export default DigitInput;
