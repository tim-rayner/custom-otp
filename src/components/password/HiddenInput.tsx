import React, { useEffect, useRef } from "react";

type HiddenInputProps = {
  onChange: (value: string) => void;
  value: string;
  onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
};

const HiddenInput = ({ onChange, value, onPaste }: HiddenInputProps) => {
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
    <div className="absolute inset-0 z-10 opacity-0">
      <input
        ref={inputRef}
        type="tel"
        className="absolute inset-0 opacity"
        maxLength={6}
        onChange={(e) => onChange(e.target.value)}
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
      />
    </div>
  );
};

export default HiddenInput;
