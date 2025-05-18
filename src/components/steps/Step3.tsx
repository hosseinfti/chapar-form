import { useState } from "react";
import { useFormStore } from "../../store/formStore";
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
      console.log("✅ Server response:", response.data);
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
      <p style={{ color: "green" }}>
        ✅ Your information has been submitted successfully!
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h3>Review Your Information</h3>

      <div>
        <strong>Full Name:</strong> {data.fullName}
      </div>
      <div>
        <strong>Email:</strong> {data.email || "—"}
      </div>
      <div>
        <strong>Phone:</strong> {data.phone || "—"}
      </div>
      <div>
        <strong>Birthday:</strong> {data.birthday}
      </div>
      <div>
        <strong>Skills:</strong>{" "}
        {data.skills && data.skills.length > 0 ? data.skills.join(", ") : "—"}
      </div>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={onBack} disabled={loading}>
          Back
        </button>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
