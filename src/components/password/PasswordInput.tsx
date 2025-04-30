import AnimatedCheckmark from "../AnimatedCheckmark";
import DigitInput from "./DigitInput";

import { useCallback, useRef, useState } from "react";
import HiddenInput from "./HiddenInput";

type PasswordInputProps = {
  onChange: (passcode: string) => void;
  error?: boolean;
  success?: boolean;
};

const PasswordInput = ({
  onChange,
  error = false,
  success = false,
}: PasswordInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [passcode, setPasscode] = useState("");
  const [values, setValues] = useState<string[]>(Array(6).fill(""));

  const handlePasscodeChange = useCallback(
    (newPasscode: string) => {
      // Extract first 6 numbers in order of appearance
      const numbers = newPasscode.match(/\d/g) || [];
      const firstSixNumbers = numbers.slice(0, 6).join("");
      setPasscode(firstSixNumbers);

      const newValues = Array(6).fill("");
      for (let i = 0; i < firstSixNumbers.length && i < 6; i++) {
        newValues[i] = firstSixNumbers[i];
      }
      setValues(newValues);

      // Update focused index based on input length
      const newFocusedIndex = Math.min(firstSixNumbers.length, 5);
      setFocusedIndex(newFocusedIndex);

      if (firstSixNumbers.length === 6) {
        onChange(firstSixNumbers);
      }
    },
    [onChange]
  );

  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      const pastedText = event.clipboardData.getData("text");
      const numbers = pastedText.match(/\d/g) || [];
      const firstSixNumbers = numbers.slice(0, 6).join("");

      if (firstSixNumbers) {
        setPasscode(firstSixNumbers);
        const newValues = Array(6).fill("");
        for (let i = 0; i < firstSixNumbers.length && i < 6; i++) {
          newValues[i] = firstSixNumbers[i];
        }
        setValues(newValues);

        const newFocusedIndex = Math.min(firstSixNumbers.length, 5);
        setFocusedIndex(newFocusedIndex);

        if (firstSixNumbers.length === 6) {
          onChange(firstSixNumbers);
        }
      }
    },
    [onChange]
  );

  if (success) {
    return (
      <div className="flex items-center justify-center my-6">
        <AnimatedCheckmark />
      </div>
    );
  }

  return (
    <div className="relative ">
      <div
        className={`py-4 flex items-center justify-center max-w-md mx-auto overflow-hidden ${
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
            value={values[index]}
            index={index}
            focus={focusedIndex === index}
            error={error}
            type="tel"
            disabled={true}
          />
        ))}
      </div>
      <HiddenInput
        onChange={handlePasscodeChange}
        onPaste={handlePaste}
        value={passcode}
        style={{
          opacity: 0.01,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        className="w-full h-full absolute inset-0"
      />
      {error && (
        <p className="text-red-500 text-sm my-4 shudder">
          One time password is incorrect
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
