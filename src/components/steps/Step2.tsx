import { useState } from "react";
import { useFormStore } from "../../store/formStore";
import { Box, Grid, TextField, Button, Chip } from "@mui/material";

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
}

export default function Step2({ onNext, onBack }: Step2Props) {
  const { data, setFormData } = useFormStore();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const skills = data.skills || [];

  const addSkill = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    if (skills.includes(trimmed)) {
      setError("Skill already added");
      return;
    }

    const updated = [...skills, trimmed];
    setFormData({ skills: updated });
    setInput("");
    setError("");
  };

  const removeSkill = (skill: string) => {
    const updated = skills.filter((s) => s !== skill);
    setFormData({ skills: updated });
  };

  const handleNext = () => {
    if (skills.length === 0) {
      setError("Please add at least one skill");
      return;
    }
    onNext();
  };

  return (
    <Box
      sx={{ height: "100%" }}
      component="form"
      noValidate
      onSubmit={(e) => e.preventDefault()}
    >
      <Grid sx={{ height: "100%" }} container spacing={3}>
        <Grid sx={{ height: "100%" }} size={12}>
          <TextField
            label="Add a Skill"
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSkill()}
            error={!!error}
            helperText={error}
          />
        </Grid>

        {skills.length > 0 && (
          <Grid size={12}>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                maxHeight: 150,
                overflowY: "auto",
                p: 1,
                border: "1px solid #ddd",
                borderRadius: 1,
                bgcolor: "#f9f9f9",
              }}
            >
              {skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => removeSkill(skill)}
                  color="primary"
                />
              ))}
            </Box>
          </Grid>
        )}

        <Grid size={12}>
          <Grid container spacing={3}>
            <Grid size={6}>
              <Button
                sx={{ width: "100%", height: "4em" }}
                variant="outlined"
                onClick={onBack}
              >
                Back
              </Button>
            </Grid>
            <Grid size={6}>
              <Button
                sx={{ width: "100%", height: "4em" }}
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
