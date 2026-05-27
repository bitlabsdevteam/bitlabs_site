"use client";

import { useEffect, useState } from "react";

export type MotionQuality = "mobile" | "desktop";

declare global {
  interface Window {
    __BITLABS_REDUCED_MOTION__?: boolean;
  }
}

type MotionPreferenceState = {
  reduced: boolean;
  quality: MotionQuality;
};

export function useMotionPreferences(
  explicitReduced?: boolean,
  explicitQuality?: MotionQuality,
) {
  const [state, setState] = useState<MotionPreferenceState>({
    reduced: Boolean(explicitReduced),
    quality: explicitQuality ?? "desktop",
  });

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const update = () => {
      const queryForcesReduced =
        new URLSearchParams(window.location.search).get("reduced-motion") === "1";

      setState({
        reduced:
          explicitReduced ??
          (queryForcesReduced ||
            Boolean(window.__BITLABS_REDUCED_MOTION__) ||
            motionQuery.matches),
        quality: explicitQuality ?? (mobileQuery.matches ? "mobile" : "desktop"),
      });
    };

    update();
    motionQuery.addEventListener("change", update);
    mobileQuery.addEventListener("change", update);

    return () => {
      motionQuery.removeEventListener("change", update);
      mobileQuery.removeEventListener("change", update);
    };
  }, [explicitQuality, explicitReduced]);

  return state;
}
