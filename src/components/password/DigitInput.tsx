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
      className={`w-10 h-12 sm:w-12 sm:h-14 mx-1 sm:mx-2 text-center text-xl font-semibold cursor-default!
        bg-white/5 border-2 rounded-lg transition-all duration-200
        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
        ${focus ? "border-blue-500 bg-white/10" : "border-gray-600"}
        ${error ? "border-red-500 bg-red-500/10" : ""}
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        }`}
      autoFocus={focus}
      onKeyDown={onKeyDown}
      type={type}
      disabled={disabled}
      onPaste={onPaste}
    />
  );
};

export default DigitInput;
