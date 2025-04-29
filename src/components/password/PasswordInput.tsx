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

  const blurAndFocusNext = useCallback(
    (index: number, newPasscode: string) => {
      const element = inputRefs.current[index];
      const nextElement = inputRefs.current[index + 1];
      if (element && nextElement) {
        element.blur();
      }

      if (nextElement) {
        nextElement.focus();
        setFocusedIndex(index + 1);
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
        const newPasscode = Array.from({ length: 6 }, (_, i) => {
          if (i === index) return value;
          if (i < index) return inputRefs.current[i]?.value || "";
          return "";
        }).join("");
        setPasscode(newPasscode);
        blurAndFocusNext(index, newPasscode);
      }
    },
    [blurAndFocusNext]
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") handleBackspace(event);
  };

  const handleBackspace = (event: KeyboardEvent<HTMLInputElement>) => {
    const isLastInput = focusedIndex === 5 && passcode.length === 6;

    if (event.key === "Backspace" && focusedIndex > 0) {
      const newPasscode = passcode.slice(0, -1);
      setPasscode(newPasscode);

      if (!isLastInput) {
        const prevIndex = focusedIndex - 1;
        const prevElement = inputRefs.current[prevIndex];
        if (prevElement) {
          prevElement.value = "";
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
      digits.forEach((digit, index) => {
        handleChange(index, digit);
      });
    },
    [handleChange]
  );

  if (success) {
    return (
      <div className="flex items-center justify-center my-12">
        <AnimatedCheckmark />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center my-12 max-w-md mx-auto overflow-hidden">
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
            type="number"
            disabled={isLoading}
            onPaste={handlePaste}
          />
        ))}
      </div>
      {error && <p>Error</p>}
      {isLoading && <p>Loading...</p>}
    </>
  );
};

export default PasswordInput;
