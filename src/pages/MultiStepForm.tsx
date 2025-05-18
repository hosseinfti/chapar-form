import { useState } from "react";
import Step1 from "../components/steps/Step1";
import Step2 from "../components/steps/Step2";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Step {step}</h2>

      {step === 1 && <Step1 onNext={next} />}
      {step === 2 && <Step2 onNext={next} onBack={prev} />}
    </div>
  );
}
