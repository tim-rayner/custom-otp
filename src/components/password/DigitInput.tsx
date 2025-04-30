import { ClipboardEvent, KeyboardEvent, forwardRef } from "react";

type DigitInputProps = {
  index: number;
  focus?: boolean;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onPaste?: (event: ClipboardEvent<HTMLInputElement>) => void;
  error?: boolean;
  type?: string;
  disabled?: boolean;
  value?: string;
};

const DigitInput = forwardRef<HTMLInputElement, DigitInputProps>(
  (
    {
      index,
      focus = false,
      onKeyDown,
      onPaste,
      error,
      type = "number",
      disabled = false,
      value = "",
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        max={9}
        min={0}
        key={index}
        value={value}
        className={`w-10 h-12 sm:w-12 sm:h-14 mx-1 sm:mx-2 text-center text-xl font-semibold cursor-default
        bg-white/5 rounded-lg transition-colors duration-200
        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
        border-2 ${
          error
            ? "border-red-500"
            : focus
            ? "border-blue-500"
            : "border-transparent"
        }
        ${
          disabled
            ? ""
            : "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
        }`}
        autoFocus={focus}
        onKeyDown={onKeyDown}
        type={type}
        disabled={disabled}
        onPaste={onPaste}
        aria-label={`Digit ${index + 1} of 6`}
        inputMode="numeric"
      />
    );
  }
);

DigitInput.displayName = "DigitInput";

export default DigitInput;
