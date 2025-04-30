import AnimatedCheckmark from "../AnimatedCheckmark";
import DigitInput from "./DigitInput";

import { KeyboardEvent, useCallback, useRef, useState } from "react";

type PasswordInputProps = {
  onChange: (passcode: string) => void;
  error?: boolean;
  success?: boolean;
  isLoading?: boolean;
};

const PasswordInput = ({
  onChange,
  error = false,
  success = false,
  isLoading,
}: PasswordInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [passcode, setPasscode] = useState("");
  const [values, setValues] = useState<string[]>(Array(6).fill(""));

  const blurAndFocusNext = useCallback(
    (index: number, newPasscode: string) => {
      const nextElement = inputRefs.current[index + 1];

      if (nextElement) {
        setFocusedIndex(index + 1);
        setTimeout(() => {
          nextElement.focus();
        }, 0);
      }

      if (newPasscode.length === 6) {
        onChange(newPasscode);
      }
    },
    [onChange]
  );

  const handleChange = useCallback(
    (index: number, value: string) => {
      const element = inputRefs.current[index];
      if (element) {
        element.value = value;
        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);
        const newPasscode = newValues.join("");
        setPasscode(newPasscode);
        blurAndFocusNext(index, newPasscode);
      }
    },
    [blurAndFocusNext, values]
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") handleBackspace(event);
  };

  const handleBackspace = (event: KeyboardEvent<HTMLInputElement>) => {
    const isLastInput = focusedIndex === 5 && passcode.length === 6;

    if (event.key === "Backspace" && focusedIndex > 0) {
      const newValues = [...values];
      newValues[focusedIndex] = "";
      setValues(newValues);
      const newPasscode = newValues.join("");
      setPasscode(newPasscode);

      if (!isLastInput) {
        const prevIndex = focusedIndex - 1;
        const prevElement = inputRefs.current[prevIndex];
        if (prevElement) {
          prevElement.value = "";
          newValues[prevIndex] = "";
          setValues(newValues);
        }

        if (prevElement) {
          setFocusedIndex(prevIndex);
          prevElement.focus();
        }
      }
    }
  };

  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      const pasteData = event.clipboardData?.getData("text").match(/\d/g);
      if (!pasteData) return;

      const digits = pasteData.slice(0, 6);
      const newValues = [...values];
      digits.forEach((digit, index) => {
        newValues[index] = digit;
        handleChange(index, digit);
      });
      setValues(newValues);

      if (digits.length === 6) {
        onChange(digits.join(""));
      }
    },
    [handleChange, values, onChange]
  );

  if (success) {
    return (
      <div className="flex items-center justify-center my-6">
        <AnimatedCheckmark />
      </div>
    );
  }

  return (
    <>
      <div
        className={` py-4 flex items-center justify-center max-w-md mx-auto overflow-hidden ${
          error ? "shudder" : ""
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            const firstInput = inputRefs.current[0];
            if (firstInput) {
              setFocusedIndex(0);
              firstInput.focus();
            }
          }
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <DigitInput
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            onChange={(value) => handleChange(index, value)}
            onKeyDown={handleKeyDown}
            index={index}
            focus={focusedIndex === index}
            error={error}
            type="tel"
            disabled={isLoading || focusedIndex !== index}
            onPaste={handlePaste}
          />
        ))}
      </div>
      {error && (
        <p className="text-red-500 text-sm my-4 shudder">
          One time password is incorrect
        </p>
      )}
    </>
  );
};

export default PasswordInput;
