"use client";

import Image from "next/image";
import { Component, Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Line,
  PerspectiveCamera,
  RoundedBox,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import {
  type MotionQuality,
  useMotionPreferences,
} from "@/components/motion-preferences";

type LandingCinematicSceneProps = {
  reduced?: boolean;
  quality?: MotionQuality;
  scrollProgress?: number;
  posterSrc?: string;
};

type SceneErrorBoundaryProps = {
  children: ReactNode;
  onError: () => void;
};

type SceneErrorBoundaryState = {
  hasError: boolean;
};

type CinematicRefs = {
  progress: MutableRefObject<number>;
  pointer: MutableRefObject<THREE.Vector2>;
};

const palette = {
  paper: "#030405",
  ink: "#f4eee4",
  teal: "#8fb8c7",
  tealHot: "#4fe5e0",
  amber: "#d0ba96",
  amberHot: "#ffd28b",
  violet: "#8c67ff",
  blue: "#83b8ff",
};

class SceneErrorBoundary extends Component<
  SceneErrorBoundaryProps,
  SceneErrorBoundaryState
> {
  state: SceneErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

function PosterLayer({ posterSrc }: { posterSrc: string }) {
  return (
    <div className="landing-cinematic-media" aria-hidden>
      <div className="landing-cinematic-poster" data-testid="landing-cinematic-poster">
        <Image
          className="landing-cinematic-poster-image"
          src={posterSrc}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
        />
      </div>
    </div>
  );
}

function useCinematicScroll(incomingProgress?: number) {
  const progress = useRef(incomingProgress ?? 0);
  const pointer = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    if (typeof incomingProgress === "number") {
      progress.current = THREE.MathUtils.clamp(incomingProgress, 0, 1);
    }
  }, [incomingProgress]);

  useEffect(() => {
    if (typeof incomingProgress === "number") {
      return;
    }

    const updateProgress = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      progress.current = THREE.MathUtils.clamp(window.scrollY / maxScroll, 0, 1);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.current.set(
        (event.clientX / window.innerWidth - 0.5) * 2,
        (event.clientY / window.innerHeight - 0.5) * 2,
      );
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [incomingProgress]);

  return { progress, pointer };
}

function seededNoise(index: number) {
  const value = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

/**
 * Layout of the GPT-2-style transformer residual stream. The model reads left
 * to right: token embeddings enter at the left, pass through a stack of
 * residual transformer blocks (attention + MLP sublayers), and exit as the
 * output logit distribution on the right.
 */
const LANES = 5; // residual streams (one per token position)
const LANE_GAP = 1.05;
const STREAM_START = -4.4;
const STREAM_END = 4.4;
const TOKEN_X = STREAM_START - 0.95;
const LOGIT_X = STREAM_END + 0.95;
const BLOCK_COUNT = 6; // representative GPT-2 transformer stack
const LOGIT_BARS = 9;

function laneY(index: number) {
  return (index - (LANES - 1) / 2) * LANE_GAP;
}

function blockX(index: number) {
  const t = (index + 0.5) / BLOCK_COUNT;
  return STREAM_START + 0.7 + t * (STREAM_END - STREAM_START - 1.4);
}

/** Horizontal rails carrying each token's residual vector across the stack. */
function ResidualRails() {
  const length = STREAM_END - STREAM_START;
  const midX = (STREAM_START + STREAM_END) / 2;
  return (
    <group>
      {Array.from({ length: LANES }, (_, lane) => (
        <mesh
          key={lane}
          position={[midX, laneY(lane), 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.016, 0.016, length, 6]} />
          <meshBasicMaterial
            color={palette.teal}
            transparent
            opacity={0.38}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Token embeddings entering the stack on the left. */
function TokenInputs({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group || reduced) {
      return;
    }
    const elapsed = clock.getElapsedTime();
    group.children.forEach((child, index) => {
      const pulse = 0.85 + Math.sin(elapsed * 2 + index * 0.9) * 0.18;
      child.scale.setScalar(pulse);
    });
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: LANES }, (_, lane) => (
        <mesh key={lane} position={[TOKEN_X, laneY(lane), 0]}>
          <icosahedronGeometry args={[0.2, 1]} />
          <meshStandardMaterial
            color={palette.tealHot}
            emissive={palette.tealHot}
            emissiveIntensity={1.1}
            roughness={0.3}
            metalness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * One transformer block straddling the residual stream: a translucent slab
 * (attention + MLP sublayers) with curved attention couplings between lanes.
 */
function TransformerBlock({
  index,
  reduced,
}: {
  index: number;
  reduced: boolean;
}) {
  const fillRef = useRef<THREE.MeshStandardMaterial>(null);
  const x = blockX(index);
  const height = (LANES - 1) * LANE_GAP + 0.7;

  // A few attention couplings: curves that mix one lane into another.
  const arcs = useMemo(() => {
    const pairs = 3;
    return Array.from({ length: pairs }, (_, pairIndex) => {
      const from = Math.floor(seededNoise(index * 17 + pairIndex) * LANES);
      let to = Math.floor(seededNoise(index * 31 + pairIndex + 5) * LANES);
      if (to === from) {
        to = (to + 1) % LANES;
      }
      const start = new THREE.Vector3(x - 0.32, laneY(from), 0);
      const end = new THREE.Vector3(x + 0.32, laneY(to), 0);
      const control = new THREE.Vector3(
        x,
        (laneY(from) + laneY(to)) / 2,
        0.6 + seededNoise(index + pairIndex) * 0.5,
      );
      const curve = new THREE.QuadraticBezierCurve3(start, control, end);
      return curve.getPoints(22).map((point) => [point.x, point.y, point.z] as [number, number, number]);
    });
  }, [index, x]);

  useFrame(({ clock }) => {
    if (!fillRef.current) {
      return;
    }
    const elapsed = reduced ? 0 : clock.getElapsedTime();
    // Activation wave travels left to right through the stack.
    const wave = 0.5 + 0.5 * Math.sin(elapsed * 1.4 - index * 0.85);
    fillRef.current.emissiveIntensity = 0.25 + wave * 0.85;
    fillRef.current.opacity = 0.12 + wave * 0.16;
  });

  return (
    <group>
      <RoundedBox
        args={[0.62, height, 1.05]}
        radius={0.08}
        smoothness={3}
        position={[x, 0, 0]}
      >
        <meshStandardMaterial
          ref={fillRef}
          color={palette.violet}
          emissive={palette.violet}
          emissiveIntensity={0.4}
          transparent
          opacity={0.18}
          roughness={0.4}
          metalness={0.2}
          depthWrite={false}
        />
      </RoundedBox>

      {/* Wireframe edges to read the block as a discrete layer. */}
      <RoundedBox args={[0.62, height, 1.05]} radius={0.08} smoothness={3} position={[x, 0, 0]}>
        <meshBasicMaterial color={palette.blue} wireframe transparent opacity={0.22} />
      </RoundedBox>

      {/* Multi-head markers down the block (attention heads). */}
      {Array.from({ length: LANES }, (_, lane) => (
        <mesh key={lane} position={[x, laneY(lane), 0.55]}>
          <boxGeometry args={[0.16, 0.16, 0.16]} />
          <meshStandardMaterial
            color={palette.amber}
            emissive={palette.amberHot}
            emissiveIntensity={0.5}
            roughness={0.35}
          />
        </mesh>
      ))}

      {arcs.map((points, arcIndex) => (
        <Line
          key={arcIndex}
          points={points}
          color={palette.tealHot}
          lineWidth={1.4}
          transparent
          opacity={0.5}
        />
      ))}
    </group>
  );
}

/** Output logit distribution emitted on the right. */
function OutputLogits({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const heights = useMemo(
    () =>
      Array.from(
        { length: LOGIT_BARS },
        (_, index) => 0.18 + seededNoise(index * 3 + 1) * 1.1,
      ),
    [],
  );
  const top = ((LOGIT_BARS - 1) / 2) * 0.34;

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group || reduced) {
      return;
    }
    const elapsed = clock.getElapsedTime();
    group.children.forEach((child, index) => {
      const wobble = 1 + Math.sin(elapsed * 1.6 + index * 0.7) * 0.12;
      child.scale.x = wobble;
    });
  });

  return (
    <group ref={groupRef}>
      {heights.map((height, index) => {
        const isTop = height === Math.max(...heights);
        return (
          <mesh
            key={index}
            position={[LOGIT_X + height / 2, top - index * 0.34, 0]}
          >
            <boxGeometry args={[height, 0.2, 0.2]} />
            <meshStandardMaterial
              color={isTop ? palette.amberHot : palette.amber}
              emissive={isTop ? palette.amberHot : palette.amber}
              emissiveIntensity={isTop ? 1.3 : 0.45}
              roughness={0.3}
              metalness={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/** Activations streaming left to right along the residual rails. */
function ResidualFlow({
  quality,
  reduced,
}: {
  quality: MotionQuality;
  reduced: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = quality === "mobile" ? 90 : 200;

  const flow = useMemo(() => {
    const lanes = new Float32Array(count);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);
    for (let index = 0; index < count; index += 1) {
      lanes[index] = Math.floor(seededNoise(index) * LANES);
      phases[index] = seededNoise(index + 7);
      speeds[index] = 0.04 + seededNoise(index + 19) * 0.1;
    }
    return { lanes, phases, speeds };
  }, [count]);

  const positions = useMemo(() => new Float32Array(count * 3), [count]);

  useFrame(({ clock }) => {
    const points = pointsRef.current;
    if (!points) {
      return;
    }
    const elapsed = reduced ? 0 : clock.getElapsedTime();
    const span = STREAM_END - STREAM_START;
    const attribute = points.geometry.getAttribute("position") as THREE.BufferAttribute;
    const array = attribute.array as Float32Array;
    for (let index = 0; index < count; index += 1) {
      const progress = (flow.phases[index] + elapsed * flow.speeds[index]) % 1;
      const x = STREAM_START + progress * span;
      array[index * 3] = x;
      array[index * 3 + 1] =
        laneY(flow.lanes[index]) + Math.sin((x + elapsed) * 1.6) * 0.04;
      array[index * 3 + 2] = Math.sin(index * 1.3 + elapsed) * 0.05;
    }
    attribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={palette.tealHot}
        size={0.1}
        transparent
        opacity={0.95}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/**
 * The signature object: a GPT-2-style transformer residual stream. Token
 * embeddings flow in from the left, traverse the residual blocks, and resolve
 * into the output logit distribution on the right.
 */
function TransformerResidual({
  quality,
  reduced,
  refs,
}: {
  quality: MotionQuality;
  reduced: boolean;
  refs: CinematicRefs;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef(new THREE.Vector2());
  const mobile = quality === "mobile";

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }
    const progress = refs.progress.current;
    pointer.current.lerp(refs.pointer.current, reduced ? 0.02 : 0.05);

    // Subtle parallax: keep the left-to-right axis legible, no full spin.
    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      pointer.current.x * 0.22 + progress * 0.2,
      2.4,
      delta,
    );
    group.rotation.x = THREE.MathUtils.damp(
      group.rotation.x,
      0.04 + pointer.current.y * -0.14 + progress * 0.12,
      2.4,
      delta,
    );
    group.position.y = THREE.MathUtils.damp(
      group.position.y,
      progress * (mobile ? -0.4 : -0.8),
      2.2,
      delta,
    );
  });

  return (
    <Float
      speed={reduced ? 0 : 0.8}
      rotationIntensity={reduced ? 0 : 0.08}
      floatIntensity={reduced ? 0 : 0.4}
      floatingRange={[-0.12, 0.12]}
    >
      <group ref={groupRef} scale={mobile ? 0.62 : 0.92}>
        <ResidualRails />
        <TokenInputs reduced={reduced} />
        {Array.from({ length: BLOCK_COUNT }, (_, index) => (
          <TransformerBlock key={index} index={index} reduced={reduced} />
        ))}
        <OutputLogits reduced={reduced} />
        <ResidualFlow quality={quality} reduced={reduced} />
      </group>
    </Float>
  );
}

function StageCamera({
  cameraRef,
  quality,
  reduced,
  refs,
}: {
  cameraRef: MutableRefObject<THREE.PerspectiveCamera | null>;
  quality: MotionQuality;
  reduced: boolean;
  refs: CinematicRefs;
}) {
  const currentPointer = useRef(new THREE.Vector2());
  const mobile = quality === "mobile";

  useFrame((_, delta) => {
    const camera = cameraRef.current;
    if (!camera) {
      return;
    }

    currentPointer.current.lerp(refs.pointer.current, reduced ? 0.02 : 0.05);
    const progress = refs.progress.current;

    const targetX = currentPointer.current.x * (mobile ? 0.4 : 0.9);
    const targetY = 0.4 + currentPointer.current.y * (mobile ? -0.2 : -0.5);
    const targetZ = (mobile ? 16 : 12.5) - progress * (mobile ? 0.6 : 1.6);

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2.4, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 2.4, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2.4, delta);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function SceneContents({
  quality,
  reduced,
  refs,
}: {
  quality: MotionQuality;
  reduced: boolean;
  refs: CinematicRefs;
}) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const mobile = quality === "mobile";

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0.4, mobile ? 16 : 12.5]}
        fov={mobile ? 46 : 40}
        near={0.1}
        far={120}
      />
      <StageCamera cameraRef={cameraRef} quality={quality} reduced={reduced} refs={refs} />

      <fogExp2 attach="fog" args={[palette.paper, mobile ? 0.05 : 0.04]} />
      <ambientLight color="#dce4ea" intensity={0.5} />
      <pointLight color={palette.tealHot} intensity={3.2} distance={40} position={[-6, 5, 8]} />
      <pointLight color={palette.amberHot} intensity={2.4} distance={36} position={[7, -3, 6]} />
      <pointLight color={palette.violet} intensity={1.8} distance={30} position={[2, 6, 9]} />
      <pointLight color="#f7eee1" intensity={1} distance={22} position={[0, 0, 7]} />

      <TransformerResidual quality={quality} reduced={reduced} refs={refs} />
      <Sparkles
        count={mobile ? 14 : 36}
        scale={[16, 9, 9]}
        size={mobile ? 1 : 1.4}
        speed={reduced ? 0 : 0.22}
        opacity={0.12}
        color={palette.tealHot}
      />
    </>
  );
}

export function LandingCinematicScene({
  reduced: explicitReduced,
  quality: explicitQuality,
  scrollProgress,
  posterSrc = "/images/transformer-background-poster.png",
}: LandingCinematicSceneProps) {
  const { reduced, quality } = useMotionPreferences(explicitReduced, explicitQuality);
  const refs = useCinematicScroll(scrollProgress);
  const dpr: [number, number] = quality === "mobile" ? [1, 1.2] : [1, 1.55];
  const rendererCleanupRef = useRef<(() => void) | null>(null);
  const [fallbackActive, setFallbackActive] = useState(false);
  const showPoster = reduced || fallbackActive;

  useEffect(() => () => {
    rendererCleanupRef.current?.();
  }, []);

  return (
    <div
      className="landing-transformer-scene"
      data-reduced-motion={reduced ? "true" : "false"}
      data-scene-source={showPoster ? "poster" : "glb"}
    >
      {showPoster ? <PosterLayer posterSrc={posterSrc} /> : null}
      {!showPoster ? (
        <SceneErrorBoundary onError={() => setFallbackActive(true)}>
          <Canvas
            className="landing-cinematic-canvas"
            data-testid="landing-cinematic-canvas"
            dpr={dpr}
            frameloop="always"
            gl={{
              alpha: true,
              antialias: true,
              powerPreference: "high-performance",
              preserveDrawingBuffer: true,
            }}
            onCreated={({ gl }) => {
              const canvas = gl.domElement;
              const handleContextLost = (event: Event) => {
                event.preventDefault();
                setFallbackActive(true);
              };

              rendererCleanupRef.current?.();
              canvas.addEventListener("webglcontextlost", handleContextLost, { once: true });
              rendererCleanupRef.current = () => {
                canvas.removeEventListener("webglcontextlost", handleContextLost);
              };

              gl.setClearColor(palette.paper, 0);
              gl.outputColorSpace = THREE.SRGBColorSpace;
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.05;
            }}
          >
            <SceneErrorBoundary onError={() => setFallbackActive(true)}>
              <Suspense fallback={null}>
                <SceneContents quality={quality} reduced={reduced} refs={refs} />
              </Suspense>
            </SceneErrorBoundary>
          </Canvas>
        </SceneErrorBoundary>
      ) : null}
      <div className="landing-cinema-grade" data-testid="landing-cinema-grade" aria-hidden>
        <span className="landing-cinema-vignette" />
        <span className="landing-cinema-light-sweep" />
        <span className="landing-cinema-letterbox" />
      </div>
    </div>
  );
}
