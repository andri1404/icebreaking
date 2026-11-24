import React from "react";

export type CharacterSpec = {
  skin: string;
  shirt: string;
  pants: string;
  hair: string;
  hairStyle: "short" | "bun" | "hat";
};

/** Procedural lipsync: mouth openness driven by frame index + word timing. */
export const mouthOpenAt = (frame: number, active: boolean): number => {
  if (!active) return 0;
  const v =
    Math.abs(Math.sin(frame * 0.55)) * 0.6 +
    Math.abs(Math.sin(frame * 1.13 + 1)) * 0.4;
  return Math.min(1, v);
};

export const isBlinking = (frame: number): boolean => {
  const p = frame % 90;
  return p < 3;
};

export const Character: React.FC<{
  spec: CharacterSpec;
  mouthOpen: number;
  blink: boolean;
  wave: boolean;
}> = ({ spec, mouthOpen, blink, wave }) => {
  const waveRot = wave ? -20 + Math.sin(mouthOpen * Math.PI) * 30 : 55;
  return (
    <svg width={230} height={330} viewBox="0 0 220 320">
      {/* legs */}
      <rect x={80} y={252} width={16} height={58} rx={8} fill={spec.pants} />
      <rect x={124} y={252} width={16} height={58} rx={8} fill={spec.pants} />
      <ellipse cx={88} cy={313} rx={14} ry={6} fill="#3f3f46" />
      <ellipse cx={132} cy={313} rx={14} ry={6} fill="#3f3f46" />
      {/* body */}
      <rect x={64} y={150} width={92} height={112} rx={28} fill={spec.shirt} />
      {/* left arm (waves when talking) */}
      <g transform={`translate(70,168) rotate(${waveRot})`}>
        <rect x={-7} y={0} width={14} height={66} rx={7} fill={spec.shirt} />
        <circle cx={0} cy={70} r={11} fill={spec.skin} />
      </g>
      {/* right arm */}
      <g transform="translate(150,168) rotate(25)">
        <rect x={-7} y={0} width={14} height={66} rx={7} fill={spec.shirt} />
        <circle cx={0} cy={70} r={11} fill={spec.skin} />
      </g>
      {/* head */}
      <circle cx={110} cy={88} r={52} fill={spec.skin} />
      <circle cx={58} cy={92} r={9} fill={spec.skin} />
      <circle cx={162} cy={92} r={9} fill={spec.skin} />
      {/* hair */}
      {spec.hairStyle === "short" && (
        <path d="M58 76 Q110 18 162 76 Q150 52 110 50 Q70 52 58 76 Z" fill={spec.hair} />
      )}
      {spec.hairStyle === "bun" && (
        <>
          <path d="M58 80 Q110 24 162 80 Q136 56 110 54 Q84 56 58 80 Z" fill={spec.hair} />
          <circle cx={110} cy={32} r={15} fill={spec.hair} />
        </>
      )}
      {spec.hairStyle === "hat" && (
        <>
          <rect x={40} y={82} width={140} height={12} rx={6} fill="#b45309" />
          <path d="M62 84 Q56 38 110 34 Q164 38 158 84 Z" fill="#d97706" />
        </>
      )}
      {/* eyes */}
      {blink ? (
        <>
          <rect x={81} y={84} width={18} height={4} rx={2} fill="#1c1917" />
          <rect x={121} y={84} width={18} height={4} rx={2} fill="#1c1917" />
        </>
      ) : (
        <>
          <circle cx={90} cy={86} r={7} fill="#fff" />
          <circle cx={130} cy={86} r={7} fill="#fff" />
          <circle cx={91} cy={87} r={4} fill="#1c1917" />
          <circle cx={131} cy={87} r={4} fill="#1c1917" />
        </>
      )}
      {/* cheeks + nose */}
      <circle cx={72} cy={104} r={7} fill="#fb7185" opacity={0.5} />
      <circle cx={148} cy={104} r={7} fill="#fb7185" opacity={0.5} />
      <circle cx={110} cy={100} r={5} fill="#00000015" />
      {/* mouth */}
      <ellipse cx={110} cy={118} rx={10} ry={3 + mouthOpen * 9} fill="#7c2d12" />
      <ellipse
        cx={110}
        cy={120 + mouthOpen * 2}
        rx={6}
        ry={Math.max(1, mouthOpen * 6)}
        fill="#f97316"
      />
    </svg>
  );
};
