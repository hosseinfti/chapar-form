import { useState } from "react";
import Step1 from "../components/steps/Step1";
import Step2 from "../components/steps/Step2";
import Step3 from "../components/steps/Step3";

import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Paper,
  Typography,
  Container,
} from "@mui/material";

const steps = ["Personal Info", "Skills", "Review & Submit"];

export default function MultiStepForm() {
  const [step, setStep] = useState(0);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, height: "30em" }}>
        <Stepper activeStep={step} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ height: "100%" }}>
          {step === 0 && <Step1 onNext={next} />}
          {step === 1 && <Step2 onNext={next} onBack={prev} />}
          {step === 2 && <Step3 onBack={prev} />}
        </Box>
      </Paper>
    </Container>
  );
}
