import { useRef } from "react";

export default function OtpInput({ length = 6, value, onChange }) {
  const refs = useRef([]);

  const handleChange = (i, ch) => {
    const digits = value.split("");
    digits[i] = (ch || "").replace(/\D/g, "").slice(-1) || "";
    const next = digits.join("");
    onChange(next);
    if (digits[i] && i < length - 1) refs.current[i + 1]?.focus();
  };

  const onKeyDown = (i, e) => {
    if (e.key === "Backspace" && !value[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const onPaste = (e) => {
    e.preventDefault();
    const text = (e.clipboardData.getData("text") || "").replace(/\D/g, "");
    const next = (text + " ".repeat(length)).slice(0, length);
    onChange(next);
    refs.current[next.trim().length]?.focus();
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${length}, 1fr)`, gap: 12 }}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
          onPaste={onPaste}
          placeholder="○"
          style={{
            textAlign: "center", fontWeight: 700, height: 40,
            borderRadius: 6, border: "1px solid #0ff", background: "transparent",
            color: "#e5e5e5"
          }}
          aria-label={`Dígito ${i + 1}`}
        />
      ))}
    </div>
  );
}
