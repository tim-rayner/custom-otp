import { useState } from "react";
import "./App.css";
import PasswordInput from "./components/password/PasswordInput";

function App() {
  const [passcode, setPasscode] = useState("");

  const handleChange = (passcode: string) => {
    setPasscode(passcode);
  };

  return (
    <>
      <h1>Custom OTP Input</h1>
      <p>
        We sent an email to tim@timrayner.com with a code to verify your
        identity.
      </p>
      <PasswordInput onChange={handleChange} />
      <p>passcode: {passcode}</p>
    </>
  );
}

export default App;
