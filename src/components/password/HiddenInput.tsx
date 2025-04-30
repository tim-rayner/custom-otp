import React, { useEffect, useRef } from "react";

type HiddenInputProps = {
  onChange: (value: string) => void;
  value: string;
  onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
  className?: string;
  style?: React.CSSProperties;
};

const HiddenInput = ({
  onChange,
  value,
  onPaste,
  className,
  style,
}: HiddenInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus handling
  useEffect(() => {
    if (inputRef.current) {
      // Ensure the input is focused
      inputRef.current.focus();
      // Set selection range
      inputRef.current.setSelectionRange(value.length, value.length);
    }
  }, [value]);

  // Initial focus
  useEffect(() => {
    if (inputRef.current) {
      // Small delay to ensure the component is fully mounted
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="absolute inset-0 opacity-0">
      <input
        ref={inputRef}
        type="tel"
        className={`absolute inset-0 opacity ${className}`}
        maxLength={6}
        onChange={(e) => {
          const newValue = e.target.value;
          onChange(newValue);
          if (newValue.length >= 6) {
            setTimeout(() => {
              inputRef.current?.blur();
            }, 100); // Delay to ensure state updates before blurring
          }
        }}
        onPaste={onPaste}
        value={value}
        autoFocus
        onSelect={(e) => {
          // Prevent selection changes
          e.preventDefault();
          if (inputRef.current) {
            inputRef.current.setSelectionRange(value.length, value.length);
          }
        }}
        style={{
          caretColor: "transparent",
          ...style,
        }}
      />
    </div>
  );
};

export default HiddenInput;
