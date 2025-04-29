import { useState } from "react";
import "./App.css";
import LoadingButton from "./components/LoadingButton";
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

  const handleManualSubmit = () => {
    if (passcode.length !== 6) {
      setError(true);
      setIsLoading(false);
      return;
    }
    handleSubmit();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-white text-2xl font-bold">Custom OTP Input</h1>
      {!success && (
        <p className="text-white text-sm">
          We sent an email to tim.rayner2020@gmail.com with a code to verify
          your identity.
        </p>
      )}
      <PasswordInput
        onChange={handleChange}
        error={error}
        isLoading={isLoading}
        success={success}
      />

      {!success && (
        <LoadingButton isLoading={isLoading} onClick={handleManualSubmit} />
      )}
    </div>
  );
}

export default App;
