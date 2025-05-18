import { useState } from "react";
import { useFormStore } from "../../store/formStore";
import {
  Box,
  Button,
  Grid,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

interface Step3Props {
  onBack: () => void;
}

export default function Step3({ onBack }: Step3Props) {
  const { data, clearForm } = useFormStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        birthday: data.birthday,
        skills: data.skills || [],
      };

      const response = await axios.post(
        "https://task.chapar.co/api/volunteers",
        payload
      );
      setSuccess(true);
      clearForm();
    } catch (err: any) {
      const serverErrors = err.response?.data?.errors;
      if (serverErrors) {
        const flatMessage = Object.entries(serverErrors)
          .map(
            ([field, messages]) =>
              `${field}: ${(messages as string[]).join(", ")}`
          )
          .join("\n");
        setError(flatMessage);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Alert severity="success">
        ✅ Your information was submitted successfully!
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Review Your Info
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant="subtitle2">Full Name</Typography>
          <Typography variant="body1" color="text.secondary">
            {data.fullName}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant="subtitle2">Email</Typography>
          <Typography variant="body1" color="text.secondary">
            {data.email || "—"}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant="subtitle2">Phone</Typography>
          <Typography variant="body1" color="text.secondary">
            {data.phone || "—"}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant="subtitle2">Birthday</Typography>
          <Typography variant="body1" color="text.secondary">
            {data.birthday}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography variant="subtitle2">Skills</Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              maxHeight: 45,
              overflowY: "auto",
              p: 1,
              border: "1px solid #ddd",
              borderRadius: 1,
              bgcolor: "#f9f9f9",
            }}
          >
            <Typography variant="body1" color="text.secondary">
              {data.skills && data.skills.length > 0
                ? data.skills.join(", ")
                : "—"}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Button
            variant="outlined"
            sx={{ width: "100%", height: "4em" }}
            onClick={onBack}
            disabled={loading}
          >
            Back
          </Button>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Button
            sx={{ width: "100%", height: "4em" }}
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={loading && <CircularProgress size={16} />}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
