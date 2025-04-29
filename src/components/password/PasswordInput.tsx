import AnimatedCheckmark from "../AnimatedCheckmark";
import DigitInput from "./DigitInput";

import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";

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
        const newPasscode = passcode + value;
        setPasscode(newPasscode);
        blurAndFocusNext(index, newPasscode);
      }
    },
    [passcode, blurAndFocusNext]
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") handleBackspace(event);
  };

  const handleBackspace = (event: KeyboardEvent<HTMLInputElement>) => {
    const isLastInput = focusedIndex === 5 && passcode.length === 6;

    if (event.key === "Backspace" && focusedIndex > 0) {
      // Remove the previous digit
      const newPasscode = passcode.slice(0, -1);
      setPasscode(newPasscode);

      // Clear the value of the previous input
      if (!isLastInput) {
        const prevIndex = focusedIndex - 1;
        const prevElement = inputRefs.current[prevIndex];
        if (prevElement) {
          prevElement.value = "";
        }

        if (prevElement) {
          // Set focus to the previous input
          setFocusedIndex(prevIndex);
          prevElement.focus();
        }
      }
    }
  };

  const handlePaste = useCallback(
    (event: globalThis.ClipboardEvent) => {
      const pasteData = event.clipboardData?.getData("text").slice(0, 6);
      if (!pasteData) return;

      // Distribute the pasted numbers across inputs
      pasteData.split("").forEach((digit, index) => {
        if (index < 6) {
          handleChange(index, digit);
        }
      });

      if (pasteData.length === 6) {
        onChange(pasteData);
      }
    },
    [handleChange, onChange]
  );

  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [handlePaste]);

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
          />
        ))}
      </div>
      {error && <p>Error</p>}
      {isLoading && <p>Loading...</p>}
    </>
  );
};

export default PasswordInput;
