import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
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
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      <Card className="w-[90%] max-w-md mx-auto flex flex-col items-center justify-center gap-6">
        <h1 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">
          Verify Your Identity
        </h1>
        {!success && (
          <p className="text-gray-300 text-sm sm:text-base text-center px-4">
            We sent an email to tim.rayner2020@gmail.com with a code to verify
            your identity.
          </p>
        )}
        <PasswordInput
          onChange={handleChange}
          error={error}
          success={success}
        />

        {!success && (
          <LoadingButton isLoading={isLoading} onClick={handleManualSubmit} />
        )}
      </Card>
    </div>
  );
}

export default App;
