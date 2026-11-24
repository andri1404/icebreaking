import React from "react";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { lines } from "./manifest";

const FPS = 30;
const PAD = 18;
export const TOTAL_FRAMES =
  lines.reduce((a, l) => a + Math.round(l.duration * FPS) + PAD, 0)

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="main"
        component={MyComposition}
        durationInFrames={TOTAL_FRAMES}
        width={1920}
        height={1080}
        fps={FPS}
      />
    </>
  );
};
