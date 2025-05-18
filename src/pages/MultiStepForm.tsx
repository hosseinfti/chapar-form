import { useState } from "react";
import Step1 from "../components/steps/Step1";
import Step2 from "../components/steps/Step2";
import Step3 from "../components/steps/Step3";
import {
  Box,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Paper,
} from "@mui/material";

const steps = ["Personal Info", "Skills", "Review & Submit"];

export default function MultiStepForm() {
  const [step, setStep] = useState(0);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 6, px: 3 }}>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          {steps[step]}
        </Typography>

        {step === 0 && <Step1 onNext={next} />}
        {step === 1 && <Step2 onNext={next} onBack={prev} />}
        {step === 2 && <Step3 onBack={prev} />}
      </Paper>
    </Box>
  );
}
