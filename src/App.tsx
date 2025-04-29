import { useState } from "react";
import "./App.css";
import PasswordInput from "./components/password/PasswordInput";

function App() {
  const [passcode, setPasscode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (passcode: string) => {
    setPasscode(passcode);
    handleSubmit();
  };

  const mockSubmitSuccess = () => {
    console.log("submitting passcode", passcode);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  };

  const handleSubmit = () => {
    setIsLoading(true);
    mockSubmitSuccess()
      .then(() => {
        setSuccess(true);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setError(true);
      });
  };

  return (
    <>
      <h1>Custom OTP Input</h1>
      {!success && (
        <p>
          We sent an email to tim@timrayner.com with a code to verify your
          identity.
        </p>
      )}
      <PasswordInput
        onChange={handleChange}
        error={error}
        isLoading={isLoading}
        success={success}
      />
    </>
  );
}

export default App;
