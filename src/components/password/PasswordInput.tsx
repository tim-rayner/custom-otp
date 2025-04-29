import AnimatedCheckmark from "../AnimatedCheckmark";
import DigitInput from "./DigitInput";

import { KeyboardEvent, useRef, useState } from "react";

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

  const handleChange = (index: number, value: string) => {
    const element = inputRefs.current[index];
    if (element) {
      element.value = value;
      const newPasscode = passcode + value;
      setPasscode(newPasscode);
      blurAndFocusNext(index, newPasscode);
    }
  };

  const blurAndFocusNext = (index: number, newPasscode: string) => {
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
  };

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
