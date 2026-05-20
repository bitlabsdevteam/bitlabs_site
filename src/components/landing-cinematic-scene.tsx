"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line, PerspectiveCamera, RoundedBox, Sparkles } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import * as THREE from "three";

const tokenLabels = ["Tokyo", "pretrain", "finetune", "inference", "agents", "deploy"] as const;
const tokenRows = [3.2, 1.95, 0.7, -0.55, -1.8, -3.05] as const;
const blockColumns = [-5.9, -2.65, 0.55, 3.75] as const;
type SceneQuality = "mobile" | "desktop";

type LandingCinematicSceneProps = {
  reduced?: boolean;
  quality?: SceneQuality;
  scrollProgress?: number;
};

declare global {
  interface Window {
    __BITLABS_REDUCED_MOTION__?: boolean;
  }
}

type CinematicRefs = {
  progress: MutableRefObject<number>;
  section: MutableRefObject<number>;
  pointer: MutableRefObject<THREE.Vector2>;
};

const palette = {
  paper: "#030405",
  ink: "#f4eee4",
  muted: "#aaa195",
  teal: "#8fb8c7",
  tealHot: "#4fe5e0",
  amber: "#d0ba96",
  amberHot: "#ffd28b",
  green: "#65e5a9",
  red: "#ff8f86",
  violet: "#8c67ff",
  blue: "#83b8ff",
  graphite: "#0b0d10",
};

function useMediaState(explicitReduced?: boolean, explicitQuality?: SceneQuality) {
  const [state, setState] = useState({ reduced: Boolean(explicitReduced), quality: explicitQuality ?? "desktop" });

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const update = () => {
      const queryForcesReduced = new URLSearchParams(window.location.search).get("reduced-motion") === "1";
      setState({
        reduced: explicitReduced ?? (queryForcesReduced || Boolean(window.__BITLABS_REDUCED_MOTION__) || motionQuery.matches),
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

function useCinematicScroll(reduced: boolean, incomingProgress?: number) {
  const progress = useRef(incomingProgress ?? 0);
  const section = useRef(0);
  const pointer = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    if (typeof incomingProgress === "number") {
      progress.current = THREE.MathUtils.clamp(incomingProgress, 0, 1);
    }
  }, [incomingProgress]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointer.current.set((event.clientX / window.innerWidth - 0.5) * 2, (event.clientY / window.innerHeight - 0.5) * 2);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const updateNativeProgress = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progress.current = THREE.MathUtils.clamp(window.scrollY / maxScroll, 0, 1);
    };

    if (reduced) {
      updateNativeProgress();
      window.addEventListener("scroll", updateNativeProgress, { passive: true });

      return () => {
        window.removeEventListener("scroll", updateNativeProgress);
      };
    }

    const lenis = new Lenis({
      duration: 1.08,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      lerp: 0.09,
      smoothWheel: true,
    });

    const onLenisScroll = () => {
      updateNativeProgress();
      ScrollTrigger.update();
    };

    const tickLenis = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", onLenisScroll);
    gsap.ticker.add(tickLenis);
    gsap.ticker.lagSmoothing(0);

    const triggers = gsap.utils.toArray<HTMLElement>(".cinematic-section, .cinematic-hero").map((element, index) =>
      ScrollTrigger.create({
        trigger: element,
        start: "top 68%",
        end: "bottom 32%",
        onEnter: () => {
          section.current = index;
        },
        onEnterBack: () => {
          section.current = index;
        },
        onUpdate: updateNativeProgress,
      }),
    );

    updateNativeProgress();
    ScrollTrigger.refresh();

    return () => {
      for (const trigger of triggers) {
        trigger.kill();
      }
      lenis.off("scroll", onLenisScroll);
      gsap.ticker.remove(tickLenis);
      lenis.destroy();
    };
  }, [reduced]);

  return { progress, section, pointer };
}

function seededNoise(index: number) {
  const value = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function useParticlePositions(count: number) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (seededNoise(index) - 0.5) * 24;
      positions[index * 3 + 1] = (seededNoise(index + 93) - 0.5) * 10.5;
      positions[index * 3 + 2] = -8.5 + seededNoise(index + 197) * 11;
    }
    return positions;
  }, [count]);
}

function StageCamera({
  cameraRef,
  quality,
  reduced,
  refs,
}: {
  cameraRef: MutableRefObject<THREE.PerspectiveCamera | null>;
  quality: SceneQuality;
  reduced: boolean;
  refs: CinematicRefs;
}) {
  const currentPointer = useRef(new THREE.Vector2());

  useFrame((_, delta) => {
    const camera = cameraRef.current;
    if (!camera) {
      return;
    }

    currentPointer.current.lerp(refs.pointer.current, reduced ? 0.02 : 0.055);
    const progress = refs.progress.current;
    const section = refs.section.current;
    const mobile = quality === "mobile";
    const targetZ = mobile ? 32 : 24;
    const orbit = reduced ? 0 : Math.sin(progress * Math.PI) * (mobile ? 0.55 : 1.35);
    const targetX = orbit + currentPointer.current.x * (mobile ? 0.08 : 0.28);
    const targetY = 0.8 - progress * (mobile ? 0.18 : 0.56) + currentPointer.current.y * (mobile ? -0.06 : -0.18);
    const targetFov = mobile ? 38 : 33 + Math.min(section, 4) * 0.22;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2.8, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 2.8, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2.8, delta);

    camera.fov = THREE.MathUtils.damp(camera.fov, targetFov, 2.6, delta);
    camera.updateProjectionMatrix();

    camera.lookAt(0.2, -0.2, -1.85);
  });

  return null;
}

function TokenColumn({ quality }: { quality: SceneQuality }) {
  const mobile = quality === "mobile";

  return (
    <group>
      {tokenRows.map((y, index) => (
        <group key={y}>
          <mesh position={[-8.85, y, 0.2]} scale={index === 1 ? 1.16 : 1}>
            <sphereGeometry args={[0.14, mobile ? 16 : 24, mobile ? 10 : 16]} />
            <meshPhysicalMaterial
              color={palette.ink}
              emissive={palette.blue}
              emissiveIntensity={0.24}
              metalness={0.18}
              roughness={0.26}
              transparent
              opacity={0.78}
              clearcoat={0.8}
            />
          </mesh>
          <Line
            points={[
              [-8.65, y, -0.05],
              [-7.7, y + Math.sin(index) * 0.18, -0.28],
              [-6.6, tokenRows[(index + 1) % tokenRows.length] * 0.95, -0.35],
            ]}
            color={palette.ink}
            transparent
            opacity={0.2}
            lineWidth={mobile ? 0.9 : 1.4}
          />
        </group>
      ))}
    </group>
  );
}

function TransformerBlocks({ quality }: { quality: SceneQuality }) {
  const mobile = quality === "mobile";

  return (
    <group>
      {blockColumns.map((x, columnIndex) => (
        <group key={x}>
          <RoundedBox args={[1.02, 7.25, 0.16]} radius={0.05} smoothness={3} position={[x, 0, -0.55 + columnIndex * 0.35]} rotation={[0.03, -0.16, 0.01]}>
            <meshPhysicalMaterial
              color={columnIndex < 2 ? "#dceaff" : "#9ebdff"}
              emissive={columnIndex < 2 ? "#304769" : "#5168d8"}
              emissiveIntensity={0.18}
              metalness={0.12}
              roughness={0.32}
              transparent
              opacity={columnIndex < 2 ? 0.22 : 0.38}
              clearcoat={0.76}
            />
          </RoundedBox>

          {tokenRows.map((y, rowIndex) => (
            <group key={`${x}-${y}`}>
              <mesh position={[x, y, 0.1 + columnIndex * 0.15]} scale={0.92 + ((rowIndex + columnIndex) % 3) * 0.1}>
                <sphereGeometry args={[0.105, mobile ? 14 : 18, mobile ? 8 : 12]} />
                <meshPhysicalMaterial color={palette.ink} emissive={palette.blue} emissiveIntensity={0.24} roughness={0.28} transparent opacity={0.78} />
              </mesh>
              {columnIndex < 2 ? (
                <group position={[x + 0.43, y, 0.28 + columnIndex * 0.12]} scale={0.36}>
                  {[
                    [0.22, palette.blue],
                    [0, palette.red],
                    [-0.22, palette.green],
                  ].map(([offsetY, color]) => (
                    <RoundedBox key={`${color}-${offsetY}`} args={[0.08, 0.22, 0.08]} radius={0.01} smoothness={2} position={[0, Number(offsetY), 0]}>
                      <meshBasicMaterial color={String(color)} transparent opacity={0.58} blending={THREE.AdditiveBlending} depthWrite={false} />
                    </RoundedBox>
                  ))}
                </group>
              ) : null}
            </group>
          ))}

          {columnIndex < 2
            ? [0, 1, 2, 3].map((head) => (
                <mesh key={head} position={[x + 1.35, -2.45 + head * 1.62, -0.08 + columnIndex * 0.18]} rotation={[Math.PI / 2.45, 0.08, 0.12]} scale={[1.1, 0.5, 1]}>
                  <torusGeometry args={[0.45, 0.014, mobile ? 6 : 8, mobile ? 32 : 48]} />
                  <meshBasicMaterial color={head % 2 === 0 ? palette.blue : palette.green} transparent opacity={0.44} blending={THREE.AdditiveBlending} depthWrite={false} />
                </mesh>
              ))
            : null}
        </group>
      ))}
    </group>
  );
}

function FlowLayer({ quality, reduced }: { quality: SceneQuality; reduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const mobile = quality === "mobile";

  useFrame(({ clock }) => {
    if (!groupRef.current || reduced) {
      return;
    }
    const elapsed = clock.getElapsedTime();
    groupRef.current.position.z = Math.sin(elapsed * 0.27) * 0.24;
  });

  const connectionLines = useMemo(() => {
    const lines: { points: [number, number, number][]; color: string; opacity: number; width: number }[] = [];
    for (let columnIndex = 0; columnIndex < blockColumns.length - 1; columnIndex += 1) {
      const fromX = blockColumns[columnIndex] + 0.45;
      const toX = blockColumns[columnIndex + 1] - 0.45;

      tokenRows.forEach((y, rowIndex) => {
        const targetY = tokenRows[(rowIndex + columnIndex + 1) % tokenRows.length];
        const alternateY = tokenRows[(rowIndex + 3) % tokenRows.length];
        const color = rowIndex % 3 === 0 ? palette.blue : rowIndex % 3 === 1 ? palette.red : palette.green;

        lines.push({
          points: [
            [fromX, y, 0.05 + columnIndex * 0.12],
            [(fromX + toX) / 2, (y + targetY) / 2 + 0.25, -1.1 - columnIndex * 0.12],
            [toX, targetY, 0.08 + columnIndex * 0.12],
          ],
          color,
          opacity: 0.42,
          width: mobile ? 0.7 : 1.15,
        });

        if ((rowIndex + columnIndex) % 2 === 0 && !mobile) {
          lines.push({
            points: [
              [fromX, y, -0.75],
              [(fromX + toX) / 2, (y + alternateY) / 2 - 0.32, -1.9],
              [toX, alternateY, -0.65],
            ],
            color: palette.ink,
            opacity: 0.18,
            width: 0.7,
          });
        }
      });
    }
    return lines;
  }, [mobile]);

  return (
    <group ref={groupRef}>
      {connectionLines.map((line, index) => (
        <Line key={index} points={line.points} color={line.color} transparent opacity={line.opacity} lineWidth={line.width} />
      ))}
      {tokenRows.map((y, rowIndex) => (
        <Line
          key={y}
          points={[
            [-8.5, y + 0.08, -0.9],
            [-4.2, y + Math.sin(rowIndex * 1.4) * 0.34, -2.65],
            [1.45, y + Math.cos(rowIndex) * 0.28, -2.35],
            [6.45, y * 0.52, -1.18],
          ]}
          color={palette.ink}
          transparent
          opacity={rowIndex === 1 ? 0.28 : 0.18}
          lineWidth={rowIndex === 1 ? (mobile ? 1.25 : 2.2) : mobile ? 0.9 : 1.45}
        />
      ))}
      <Line
        points={[
          [0.25, -0.15, 0.84],
          [1.55, -0.02, 0.52],
          [2.75, 0.05, 0.34],
        ]}
        color={palette.violet}
        transparent
        opacity={0.58}
        lineWidth={mobile ? 2.2 : 3.8}
      />
      {[0, 1, 2, 3, 4].map((index) => (
        <Line
          key={index}
          points={[
            [4.25, -1.35 + index * 0.64, 0.12],
            [5.25, -1.35 + index * 0.64 + Math.sin(index) * 0.22, -0.1],
            [6.5, (-1.35 + index * 0.64) * 0.62, -0.02],
          ]}
          color={palette.violet}
          transparent
          opacity={0.5}
          lineWidth={mobile ? 0.9 : 1.25}
        />
      ))}
    </group>
  );
}

function EvaluationGate({ quality }: { quality: SceneQuality }) {
  const mobile = quality === "mobile";
  const values = mobile ? [0.58, 0.32, 0.24, 0.15] : [0.58, 0.32, 0.24, 0.15, 0.1, 0.07, 0.04];

  return (
    <group>
      {values.map((value, index) => {
        const y = 2.25 - index * 0.62;
        const isRelease = index === 3;
        return (
          <group key={value}>
            <RoundedBox args={[value * 2.8, 0.075, 0.075]} radius={0.01} smoothness={2} position={[7.15 + value * 1.35, y, 0.38]} rotation={[0.02, -0.18, 0]}>
              <meshBasicMaterial color={isRelease ? palette.amberHot : palette.ink} transparent opacity={isRelease ? 0.48 : 0.22} blending={THREE.AdditiveBlending} depthWrite={false} />
            </RoundedBox>
            <mesh position={[7.02, y, 0.42]} scale={isRelease ? 0.8 : 0.5}>
              <sphereGeometry args={[0.105, mobile ? 14 : 18, mobile ? 8 : 12]} />
              <meshBasicMaterial color={isRelease ? palette.amberHot : palette.ink} transparent opacity={0.72} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function ResearchCues({ quality }: { quality: SceneQuality }) {
  const mobile = quality === "mobile";

  return (
    <group>
      <RoundedBox args={[2.35, 2.35, 0.06]} radius={0.04} smoothness={3} position={[-0.95, -0.15, 0.9]} rotation={[0.04, -0.2, 0.04]}>
        <meshBasicMaterial color="#eadfff" transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} />
      </RoundedBox>
      {Array.from({ length: mobile ? 16 : 36 }, (_, index) => {
        const xIndex = index % (mobile ? 4 : 6);
        const yIndex = Math.floor(index / (mobile ? 4 : 6));
        return (
          <mesh key={index} position={[-1.92 + xIndex * 0.36, -1.15 + yIndex * 0.36, 1.12]} scale={0.58 + ((xIndex + yIndex) % 4) * 0.08}>
            <sphereGeometry args={[0.105, mobile ? 12 : 18, mobile ? 8 : 12]} />
            <meshBasicMaterial color={(xIndex + yIndex) % 3 === 0 ? palette.violet : palette.ink} transparent opacity={0.62} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        );
      })}
    </group>
  );
}

function DeploymentRails({ quality, reduced }: { quality: SceneQuality; reduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const mobile = quality === "mobile";

  useFrame(({ clock }) => {
    if (!groupRef.current || reduced) {
      return;
    }
    groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.22) * 0.035;
  });

  return (
    <group ref={groupRef} position={[0.45, -0.08, -2.8]}>
      {[-2.6, -1.3, 0, 1.3, 2.6].map((offset, index) => (
        <Line
          key={offset}
          points={[
            [-8.8, offset, -0.6 - index * 0.08],
            [-2.8, offset * 0.74, -1.35],
            [3.4, offset * 0.52, -1.05],
            [8.6, offset * 0.32, -0.55],
          ]}
          color={index === 3 ? palette.amberHot : palette.tealHot}
          transparent
          opacity={index === 3 ? 0.34 : 0.16}
          lineWidth={mobile ? 0.8 : 1.2}
        />
      ))}
      {!mobile ? (
        <gridHelper args={[17, 24, "#355861", "#203137"]} position={[0, -3.2, -0.4]} rotation={[0.03, 0, 0.01]}>
          <meshBasicMaterial transparent opacity={0.12} />
        </gridHelper>
      ) : null}
    </group>
  );
}

function Particles({ quality, reduced }: { quality: SceneQuality; reduced: boolean }) {
  const groupRef = useRef<THREE.Points>(null);
  const count = quality === "mobile" ? 210 : 420;
  const positions = useParticlePositions(count);

  useFrame(({ clock }) => {
    if (!groupRef.current || reduced) {
      return;
    }
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.018;
  });

  return (
    <points ref={groupRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={palette.ink} size={0.024} transparent opacity={0.46} sizeAttenuation />
    </points>
  );
}

function CinematicStage({ quality, reduced, refs }: { quality: SceneQuality; reduced: boolean; refs: CinematicRefs }) {
  const rootRef = useRef<THREE.Group>(null);
  const foregroundRef = useRef<THREE.Group>(null);
  const pointer = useRef(new THREE.Vector2());
  const mobile = quality === "mobile";

  useFrame(({ clock }, delta) => {
    if (!rootRef.current || !foregroundRef.current) {
      return;
    }

    const elapsed = reduced ? 0 : clock.getElapsedTime();
    const progress = refs.progress.current;
    pointer.current.lerp(refs.pointer.current, reduced ? 0.018 : 0.05);

    const rootScale = mobile ? 0.66 : 1;
    rootRef.current.scale.setScalar(THREE.MathUtils.damp(rootRef.current.scale.x, rootScale, 3, delta));
    rootRef.current.position.x = THREE.MathUtils.damp(rootRef.current.position.x, mobile ? 0.9 : 1.1, 3, delta);
    rootRef.current.position.y = THREE.MathUtils.damp(rootRef.current.position.y, 0.28 - progress * (mobile ? 1.7 : 3.65) + pointer.current.y * -0.12, 2.8, delta);
    rootRef.current.rotation.x = THREE.MathUtils.damp(rootRef.current.rotation.x, -0.08 + progress * (mobile ? 0.1 : 0.22) + pointer.current.y * 0.03, 2.8, delta);
    rootRef.current.rotation.y = THREE.MathUtils.damp(rootRef.current.rotation.y, -0.29 + progress * (mobile ? 0.38 : 0.76) + pointer.current.x * 0.07, 2.8, delta);
    rootRef.current.rotation.z = THREE.MathUtils.damp(rootRef.current.rotation.z, -0.015 + pointer.current.x * 0.014, 2.8, delta);

    foregroundRef.current.position.x = Math.sin(elapsed * 0.34) * (mobile ? 0.04 : 0.12) + pointer.current.x * (mobile ? 0.06 : 0.18);
    foregroundRef.current.position.y = Math.cos(elapsed * 0.28) * (mobile ? 0.03 : 0.08) + pointer.current.y * (mobile ? -0.05 : -0.14);
  });

  return (
    <group ref={rootRef}>
      <DeploymentRails quality={quality} reduced={reduced} />
      <TokenColumn quality={quality} />
      <TransformerBlocks quality={quality} />
      <FlowLayer quality={quality} reduced={reduced} />
      <group ref={foregroundRef}>
        <ResearchCues quality={quality} />
        <EvaluationGate quality={quality} />
      </group>
      <Particles quality={quality} reduced={reduced} />
      <Sparkles count={mobile ? 20 : 44} scale={[18, 7, 5]} size={mobile ? 1.1 : 1.6} speed={reduced ? 0 : 0.22} opacity={0.22} color={palette.amberHot} />
    </group>
  );
}

function SceneLabels() {
  return (
    <Html fullscreen zIndexRange={[2, 0]} prepend>
      <div className="landing-transformer-labels" aria-hidden>
        <span className="scene-label scene-label-embedding">Data curation</span>
        <span className="scene-label scene-label-block">Model program</span>
        <span className="scene-label scene-label-attention">Context and control</span>
        <span className="scene-label scene-label-mlp">Inference path</span>
        <span className="scene-label scene-label-probabilities">Release gates</span>
        <span className="scene-label scene-label-residual">Evaluation loop</span>
        <span className="scene-chip scene-chip-q">Q</span>
        <span className="scene-chip scene-chip-k">K</span>
        <span className="scene-chip scene-chip-v">V</span>
        <div className="scene-token-list">
          {tokenLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <div className="scene-probability-list">
          <span>serve 54.67%</span>
          <span>adapt 20.87%</span>
          <span>audit 12.09%</span>
          <strong>ship 6.26%</strong>
        </div>
      </div>
    </Html>
  );
}

function SceneContents({ quality, reduced, refs }: { quality: SceneQuality; reduced: boolean; refs: CinematicRefs }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0.8, quality === "mobile" ? 32 : 24]} fov={quality === "mobile" ? 38 : 33} near={0.1} far={160} />
      <StageCamera cameraRef={cameraRef} quality={quality} reduced={reduced} refs={refs} />
      <fogExp2 attach="fog" args={[palette.paper, 0.032]} />
      <ambientLight color="#f4eee4" intensity={0.78} />
      <pointLight color={palette.blue} intensity={4.6} distance={36} position={[-4.5, 5.2, 8]} />
      <pointLight color={palette.amberHot} intensity={3.2} distance={34} position={[5.2, -3.4, 7]} />
      <pointLight color={palette.violet} intensity={3.6} distance={32} position={[1.2, 2, 9]} />
      <mesh position={[1.85, 0.15, -1.2]} rotation={[0.16, -0.32, 0.05]}>
        <torusGeometry args={[1.45, 0.018, 10, 96]} />
        <meshBasicMaterial color={palette.tealHot} transparent opacity={0.46} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh position={[2.05, 0.15, -1.22]} rotation={[0.16, -0.32, 0.05]}>
        <planeGeometry args={[2.8, 2.8]} />
        <meshBasicMaterial color={palette.teal} transparent opacity={0.055} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <CinematicStage quality={quality} reduced={reduced} refs={refs} />
      <SceneLabels />
      {quality === "desktop" && !reduced ? (
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom luminanceThreshold={0.24} luminanceSmoothing={0.72} intensity={0.42} mipmapBlur />
          <Vignette eskil={false} offset={0.2} darkness={0.72} />
        </EffectComposer>
      ) : null}
    </>
  );
}

export function LandingCinematicScene({ reduced: explicitReduced, quality: explicitQuality, scrollProgress }: LandingCinematicSceneProps) {
  const { reduced, quality } = useMediaState(explicitReduced, explicitQuality);
  const refs = useCinematicScroll(reduced, scrollProgress);
  const dpr: [number, number] = quality === "mobile" ? [1, 1.25] : [1, 1.65];

  return (
    <div className="landing-transformer-scene" data-reduced-motion={reduced ? "true" : "false"}>
      <Canvas
        className="landing-cinematic-canvas"
        data-testid="landing-cinematic-canvas"
        dpr={dpr}
        gl={{
          alpha: true,
          antialias: quality === "desktop",
          powerPreference: "high-performance",
          preserveDrawingBuffer: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(palette.paper, 0);
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <SceneContents quality={quality} reduced={reduced} refs={refs} />
      </Canvas>
    </div>
  );
}
