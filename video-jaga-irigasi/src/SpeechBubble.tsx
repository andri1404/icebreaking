import React, { useMemo } from "react";

export const SpeechBubble: React.FC<{
  text: string;
  progress: number; // 0..1 through the spoken audio
  flip?: boolean;
}> = ({ text, progress, flip }) => {
  const words = useMemo(() => text.split(" "), [text]);
  const active = Math.min(
    words.length - 1,
    Math.floor(progress * words.length),
  );
  return (
    <div
      style={{
        position: "absolute",
        ...(flip ? { right: 40 } : { left: 40 }),
        bottom: 420,
        background: "#fff",
        borderRadius: 24,
        padding: "22px 30px",
        maxWidth: 720,
        boxShadow: "0 8px 30px #0003",
      }}
    >
      <div
        style={{
          position: "absolute",
          ...(flip ? { right: 60 } : { left: 60 }),
          bottom: -16,
          width: 0,
          height: 0,
          borderLeft: "14px solid transparent",
          borderRight: "14px solid transparent",
          borderTop: "18px solid #fff",
        }}
      />
      <div style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.25 }}>
        {words.map((w, i) => (
          <span
            key={i}
            style={{
              color: i === active ? "#dc2626" : i < active ? "#166534" : "#334155",
              marginRight: 12,
            }}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
};
