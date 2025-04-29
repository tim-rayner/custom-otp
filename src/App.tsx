import { useState } from "react";
import "./App.css";
import PasswordInput from "./components/password/PasswordInput";

function App() {
  const [passcode, setPasscode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
        setSuccessMessage("Success");
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
      <p>
        We sent an email to tim@timrayner.com with a code to verify your
        identity.
      </p>
      <PasswordInput
        onChange={handleChange}
        error={error}
        successMessage={successMessage}
        isLoading={isLoading}
      />
    </>
  );
}

export default App;
