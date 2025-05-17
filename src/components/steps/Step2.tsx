import { useState } from "react";
import { useFormStore } from "../../store/formStore";

export default function Step2() {
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
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "320px",
      }}
    >
      <label>Add a Skill</label>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addSkill()}
        placeholder="Type a skill and press Add"
      />
      <button type="button" onClick={addSkill}>
        Add
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {skills.map((skill, index) => (
          <li
            key={index}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>{skill}</span>
            <button onClick={() => removeSkill(skill)}>❌</button>
          </li>
        ))}
      </ul>

      <button onClick={handleNext}>Next</button>
    </div>
  );
}
