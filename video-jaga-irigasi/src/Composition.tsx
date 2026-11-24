import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  Character,
  isBlinking,
  mouthOpenAt,
  type CharacterSpec,
} from "./Character";
import { SpeechBubble } from "./SpeechBubble";
import { lines, type Line } from "./manifest";

const SPECS: Record<string, CharacterSpec> = {
  ian: { skin: "#f5c99b", shirt: "#2563eb", pants: "#1e3a8a", hair: "#1c1917", hairStyle: "short" },
  sari: { skin: "#f0b98a", shirt: "#db2777", pants: "#831843", hair: "#4c1d95", hairStyle: "bun" },
  pak: { skin: "#e8a06a", shirt: "#16a34a", pants: "#365314", hair: "#1c1917", hairStyle: "hat" },
};

const PAD_FRAMES = 18;

const Background: React.FC<{ frame: number; trashVisible: boolean }> = ({
  frame,
  trashVisible,
}) => {
  const shine = Math.sin(frame * 0.08) * 8;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(#7dd3fc, #bae6fd)" }} />
      <div
        style={{
          position: "absolute",
          top: 50,
          right: 90,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: "#fde047",
          boxShadow: "0 0 80px #fde04788",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 300,
          left: -200,
          right: -200,
          height: 620,
          borderRadius: "50% 50% 0 0",
          background: "#4d7c0f",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 430,
          left: 0,
          right: 0,
          height: 290,
          background: "#84cc16",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 210,
          background: "linear-gradient(#0369a1,#0284c7)",
          overflow: "hidden",
        }}
      >
        {[80, 260, 440, 620, 800, 980, 1160, 1340, 1520, 1700].map((x, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 30 + i * 18 + shine,
              left: x,
              width: 120,
              height: 10,
              borderRadius: 8,
              background: "#38bdf8",
              opacity: 0.7,
            }}
          />
        ))}
      </div>
      <div style={{ position: "absolute", left: 60, bottom: 260 }}>
        <div style={{ width: 20, height: 120, background: "#78350f", marginLeft: 130 }} />
        <div
          style={{
            width: 280,
            height: 90,
            background: "#fbbf24",
            border: "6px solid #92400e",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#7c2d12",
            fontWeight: 900,
            fontSize: 28,
            textAlign: "center",
            lineHeight: 1.1,
            flexDirection: "column",
          }}
        >
          <span>DILARANG</span>
          <span>BUANG SAMPAH</span>
        </div>
      </div>
      {trashVisible && (
        <div style={{ position: "absolute", right: 220, bottom: 240, fontSize: 70 }}>
          🥫
          <div style={{ position: "absolute", left: 50, top: 10 }}>🛍️</div>
        </div>
      )}
    </AbsoluteFill>
  );
};

const Speaker: React.FC<{
  who: string;
  talking: boolean;
  frame: number;
  index: number;
}> = ({ who, talking, frame, index }) => {
  const bounce = talking ? Math.sin(frame * 0.4) * 6 : 0;
  return (
    <div
      style={{
        position: "absolute",
        bottom: 120,
        left: 110 + index * 560,
        transform: `translateY(${bounce}px)`,
        filter: talking
          ? "brightness(1.05)"
          : "brightness(0.85) saturate(0.7)",
      }}
    >
      <Character
        spec={SPECS[who]}
        mouthOpen={mouthOpenAt(frame, talking)}
        blink={isBlinking(frame + index * 30)}
        wave={talking}
      />
    </div>
  );
};

const LineScene: React.FC<{ line: Line }> = ({ line }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const speechFrames = Math.round(line.duration * fps);
  return (
    <>
      <Audio src={staticFile(line.src)} />
      {frame < speechFrames && (
        <SpeechBubble
          text={line.text}
          flip={line.who === "pak"}
          progress={frame / speechFrames}
        />
      )}
    </>
  );
};

export const MainScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scenes = useMemo(() => {
    let t = 0;
    return lines.map((l) => {
      const from = t;
      const durationInFrames = Math.round(l.duration * fps) + PAD_FRAMES;
      t += durationInFrames;
      return { line: l, from, durationInFrames };
    });
  }, [fps]);

  const total = useMemo(
    () => scenes.reduce((a, s) => a + s.durationInFrames, 0),
    [scenes],
  );

  const trashFrames = useMemo(
    () => ({
      from: scenes[3].from,
      until: scenes[6].from + scenes[6].durationInFrames / 2,
    }),
    [scenes],
  );

  return (
    <AbsoluteFill style={{ background: "#0f172a" }}>
      <Background
        frame={frame}
        trashVisible={frame >= trashFrames.from && frame <= trashFrames.until}
      />
      {["ian", "sari", "pak"].map((who, i) => (
        <Speaker
          key={who}
          who={who}
          index={i}
          frame={frame + i * 37}
          talking={scenes.some(
            (s) =>
              s.line.who === who &&
              frame >= s.from &&
              frame < s.from + Math.round(s.line.duration * fps),
          )}
        />
      ))}
      {scenes.map((s, i) => (
        <Sequence
          key={i}
          from={s.from}
          durationInFrames={s.durationInFrames}
          style={{ position: "absolute" }}
        >
          <LineScene line={s.line} />
        </Sequence>
      ))}
      {frame > total - 75 && (
        <div
          style={{
            position: "absolute",
            top: 90,
            width: "100%",
            textAlign: "center",
            fontSize: 88,
            fontWeight: 900,
            color: "#fff",
            textShadow: "0 6px 30px #000",
            opacity: interpolate(frame, [total - 75, total - 55], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          JAGA BERSIH IRIGASI KITA!
        </div>
      )}
      {frame > total - 55 && (
        <div
          style={{
            position: "absolute",
            bottom: 36,
            width: "100%",
            textAlign: "center",
            fontSize: 30,
            color: "#ffffffdd",
            textShadow: "0 2px 10px #000",
            opacity: interpolate(frame, [total - 55, total - 40], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Irigasi Riam Kanan, Kalimantan Selatan
        </div>
      )}
    </AbsoluteFill>
  );
};

export const MyComposition: React.FC = () => <AbsoluteFill><MainScene /></AbsoluteFill>;
