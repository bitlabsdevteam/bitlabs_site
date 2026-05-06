"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const tokenLabels = ["Data", "visualization", "em", "powers", "users", "to"] as const;
const tokenRows = [3.2, 1.95, 0.7, -0.55, -1.8, -3.05] as const;
const blockColumns = [-5.9, -2.65, 0.55, 3.75] as const;
const channelColors = {
  query: 0x83b8ff,
  key: 0xff8f86,
  value: 0x65e5a9,
  residual: 0xe9efff,
  violet: 0x8c67ff,
  amber: 0xffd28b,
} as const;

function trackGeometry<T extends THREE.BufferGeometry>(geometry: T, geometries: THREE.BufferGeometry[]) {
  geometries.push(geometry);
  return geometry;
}

function trackMaterial<T extends THREE.Material>(material: T, materials: THREE.Material[]) {
  materials.push(material);
  return material;
}

function addTube(
  parent: THREE.Group,
  points: THREE.Vector3[],
  radius: number,
  material: THREE.Material,
  geometries: THREE.BufferGeometry[],
) {
  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = trackGeometry(new THREE.TubeGeometry(curve, 72, radius, 8, false), geometries);
  const tube = new THREE.Mesh(geometry, material);
  parent.add(tube);
  return tube;
}

function addPanel(
  parent: THREE.Group,
  width: number,
  height: number,
  depth: number,
  position: THREE.Vector3,
  material: THREE.Material,
  geometries: THREE.BufferGeometry[],
) {
  const geometry = trackGeometry(new THREE.BoxGeometry(width, height, depth), geometries);
  const panel = new THREE.Mesh(geometry, material);
  panel.position.copy(position);
  parent.add(panel);
  return panel;
}

export function LandingCinematicScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65));
    renderer.setClearColor(0x030405, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030405, 0.032);

    const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 160);
    camera.position.set(0, 0.8, 25);

    const root = new THREE.Group();
    const diagram = new THREE.Group();
    const flowLayer = new THREE.Group();
    const foregroundLayer = new THREE.Group();
    const particleLayer = new THREE.Group();
    scene.add(root);
    root.add(diagram, flowLayer, foregroundLayer, particleLayer);

    const materials: THREE.Material[] = [];
    const geometries: THREE.BufferGeometry[] = [];

    scene.add(new THREE.AmbientLight(0xf4eee4, 0.78));

    const keyLight = new THREE.PointLight(0x8fb8ff, 4.6, 36);
    keyLight.position.set(-4.5, 5.2, 8);
    scene.add(keyLight);

    const warmLight = new THREE.PointLight(0xffcf88, 3.2, 34);
    warmLight.position.set(5.2, -3.4, 7);
    scene.add(warmLight);

    const violetLight = new THREE.PointLight(0x8c67ff, 3.6, 32);
    violetLight.position.set(1.2, 2, 9);
    scene.add(violetLight);

    const glass = trackMaterial(
      new THREE.MeshPhysicalMaterial({
        color: 0xdceaff,
        emissive: 0x304769,
        emissiveIntensity: 0.16,
        metalness: 0.08,
        roughness: 0.32,
        transmission: 0.12,
        transparent: true,
        opacity: 0.22,
        clearcoat: 0.8,
      }),
      materials,
    );
    const tokenMat = trackMaterial(
      new THREE.MeshPhysicalMaterial({
        color: 0xe9f3ff,
        emissive: 0x8fb8ff,
        emissiveIntensity: 0.24,
        metalness: 0.18,
        roughness: 0.26,
        transparent: true,
        opacity: 0.78,
        clearcoat: 0.8,
      }),
      materials,
    );
    const mlpMat = trackMaterial(
      new THREE.MeshPhysicalMaterial({
        color: 0x9ebdff,
        emissive: 0x5168d8,
        emissiveIntensity: 0.22,
        metalness: 0.16,
        roughness: 0.35,
        transparent: true,
        opacity: 0.38,
        clearcoat: 0.74,
      }),
      materials,
    );
    const qMat = trackMaterial(
      new THREE.MeshBasicMaterial({
        color: channelColors.query,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      materials,
    );
    const kMat = trackMaterial(
      new THREE.MeshBasicMaterial({
        color: channelColors.key,
        transparent: true,
        opacity: 0.42,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      materials,
    );
    const vMat = trackMaterial(
      new THREE.MeshBasicMaterial({
        color: channelColors.value,
        transparent: true,
        opacity: 0.42,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      materials,
    );
    const residualMat = trackMaterial(
      new THREE.MeshBasicMaterial({
        color: channelColors.residual,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      materials,
    );
    const violetMat = trackMaterial(
      new THREE.MeshBasicMaterial({
        color: channelColors.violet,
        transparent: true,
        opacity: 0.56,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      materials,
    );
    const amberMat = trackMaterial(
      new THREE.MeshBasicMaterial({
        color: channelColors.amber,
        transparent: true,
        opacity: 0.48,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      materials,
    );

    const tokenGeometry = trackGeometry(new THREE.SphereGeometry(0.14, 24, 16), geometries);
    const nodeGeometry = trackGeometry(new THREE.SphereGeometry(0.105, 18, 12), geometries);
    const headGeometry = trackGeometry(new THREE.TorusGeometry(0.45, 0.014, 8, 48), geometries);

    for (const [index, y] of tokenRows.entries()) {
      const token = new THREE.Mesh(tokenGeometry, tokenMat);
      token.position.set(-8.85, y, 0.2);
      token.scale.setScalar(index === 1 ? 1.16 : 1);
      foregroundLayer.add(token);

      addTube(
        flowLayer,
        [
          new THREE.Vector3(-8.65, y, -0.05),
          new THREE.Vector3(-7.7, y + Math.sin(index) * 0.18, -0.28),
          new THREE.Vector3(-6.6, tokenRows[(index + 1) % tokenRows.length] * 0.95, -0.35),
        ],
        0.035,
        residualMat,
        geometries,
      );
    }

    const blockDepths = [-0.55, -0.2, 0.18, 0.55];
    for (const [columnIndex, x] of blockColumns.entries()) {
      const panel = addPanel(
        diagram,
        1.02,
        7.25,
        0.16,
        new THREE.Vector3(x, 0, blockDepths[columnIndex]),
        columnIndex < 2 ? glass : mlpMat,
        geometries,
      );
      panel.rotation.set(0.03, -0.16, 0.01);

      for (const [rowIndex, y] of tokenRows.entries()) {
        const node = new THREE.Mesh(nodeGeometry, tokenMat);
        node.position.set(x, y, 0.1 + columnIndex * 0.15);
        node.scale.setScalar(0.92 + ((rowIndex + columnIndex) % 3) * 0.1);
        foregroundLayer.add(node);

        if (columnIndex < 2) {
          const qkvX = x + 0.43;
          const qkvScale = 0.36;
          addPanel(
            foregroundLayer,
            0.08,
            0.22,
            0.08,
            new THREE.Vector3(qkvX, y + 0.22, 0.28 + columnIndex * 0.12),
            qMat,
            geometries,
          ).scale.setScalar(qkvScale);
          addPanel(
            foregroundLayer,
            0.08,
            0.22,
            0.08,
            new THREE.Vector3(qkvX, y, 0.28 + columnIndex * 0.12),
            kMat,
            geometries,
          ).scale.setScalar(qkvScale);
          addPanel(
            foregroundLayer,
            0.08,
            0.22,
            0.08,
            new THREE.Vector3(qkvX, y - 0.22, 0.28 + columnIndex * 0.12),
            vMat,
            geometries,
          ).scale.setScalar(qkvScale);
        }
      }

      if (columnIndex < 2) {
        for (let head = 0; head < 4; head += 1) {
          const ring = new THREE.Mesh(headGeometry, head % 2 === 0 ? qMat : vMat);
          ring.position.set(x + 1.35, -2.45 + head * 1.62, -0.08 + columnIndex * 0.18);
          ring.rotation.set(Math.PI / 2.45, 0.08, 0.12);
          ring.scale.set(1.1, 0.5, 1);
          diagram.add(ring);
        }
      }
    }

    for (let columnIndex = 0; columnIndex < blockColumns.length - 1; columnIndex += 1) {
      const fromX = blockColumns[columnIndex] + 0.45;
      const toX = blockColumns[columnIndex + 1] - 0.45;

      for (const [rowIndex, y] of tokenRows.entries()) {
        const targetY = tokenRows[(rowIndex + columnIndex + 1) % tokenRows.length];
        const alternateY = tokenRows[(rowIndex + 3) % tokenRows.length];
        const mat = rowIndex % 3 === 0 ? qMat : rowIndex % 3 === 1 ? kMat : vMat;

        addTube(
          flowLayer,
          [
            new THREE.Vector3(fromX, y, 0.05 + columnIndex * 0.12),
            new THREE.Vector3((fromX + toX) / 2, (y + targetY) / 2 + 0.25, -1.1 - columnIndex * 0.12),
            new THREE.Vector3(toX, targetY, 0.08 + columnIndex * 0.12),
          ],
          0.018,
          mat,
          geometries,
        );

        if ((rowIndex + columnIndex) % 2 === 0) {
          addTube(
            flowLayer,
            [
              new THREE.Vector3(fromX, y, -0.75),
              new THREE.Vector3((fromX + toX) / 2, (y + alternateY) / 2 - 0.32, -1.9),
              new THREE.Vector3(toX, alternateY, -0.65),
            ],
            0.014,
            residualMat,
            geometries,
          );
        }
      }
    }

    for (const [rowIndex, y] of tokenRows.entries()) {
      addTube(
        flowLayer,
        [
          new THREE.Vector3(-8.5, y + 0.08, -0.9),
          new THREE.Vector3(-4.2, y + Math.sin(rowIndex * 1.4) * 0.34, -2.65),
          new THREE.Vector3(1.45, y + Math.cos(rowIndex) * 0.28, -2.35),
          new THREE.Vector3(6.45, y * 0.52, -1.18),
        ],
        rowIndex === 1 ? 0.065 : 0.042,
        residualMat,
        geometries,
      );
    }

    const attentionPanel = addPanel(
      diagram,
      2.35,
      2.35,
      0.06,
      new THREE.Vector3(-0.95, -0.15, 0.9),
      trackMaterial(
        new THREE.MeshBasicMaterial({
          color: 0xeadfff,
          transparent: true,
          opacity: 0.12,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
        materials,
      ),
      geometries,
    );
    attentionPanel.rotation.set(0.04, -0.2, 0.04);

    for (let xIndex = 0; xIndex < 6; xIndex += 1) {
      for (let yIndex = 0; yIndex < 6; yIndex += 1) {
        const node = new THREE.Mesh(nodeGeometry, (xIndex + yIndex) % 3 === 0 ? violetMat : tokenMat);
        node.position.set(-1.92 + xIndex * 0.36, -1.15 + yIndex * 0.36, 1.12);
        node.scale.setScalar(0.58 + ((xIndex + yIndex) % 4) * 0.08);
        foregroundLayer.add(node);
      }
    }

    addTube(
      flowLayer,
      [
        new THREE.Vector3(0.25, -0.15, 0.84),
        new THREE.Vector3(1.55, -0.02, 0.52),
        new THREE.Vector3(2.75, 0.05, 0.34),
      ],
      0.16,
      violetMat,
      geometries,
    );

    for (let index = 0; index < 5; index += 1) {
      const y = -1.35 + index * 0.64;
      addTube(
        flowLayer,
        [
          new THREE.Vector3(4.25, y, 0.12),
          new THREE.Vector3(5.25, y + Math.sin(index) * 0.22, -0.1),
          new THREE.Vector3(6.5, y * 0.62, -0.02),
        ],
        0.026,
        violetMat,
        geometries,
      );
    }

    const probabilityValues = [0.58, 0.32, 0.24, 0.15, 0.1, 0.07, 0.04];
    for (const [index, value] of probabilityValues.entries()) {
      const y = 2.25 - index * 0.62;
      const bar = addPanel(
        foregroundLayer,
        value * 2.8,
        0.075,
        0.075,
        new THREE.Vector3(7.15 + value * 1.35, y, 0.38),
        index === 3 ? amberMat : residualMat,
        geometries,
      );
      bar.rotation.set(0.02, -0.18, 0);

      const dot = new THREE.Mesh(nodeGeometry, index === 3 ? amberMat : tokenMat);
      dot.position.set(7.02, y, 0.42);
      dot.scale.setScalar(index === 3 ? 0.8 : 0.5);
      foregroundLayer.add(dot);
    }

    const particleMaterial = trackMaterial(
      new THREE.PointsMaterial({
        color: 0xf4eee4,
        size: 0.024,
        transparent: true,
        opacity: 0.46,
        sizeAttenuation: true,
      }),
      materials,
    );
    const particlePositions = new Float32Array(1260);
    for (let i = 0; i < particlePositions.length; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 24;
      particlePositions[i + 1] = (Math.random() - 0.5) * 10.5;
      particlePositions[i + 2] = -8.5 + Math.random() * 11;
    }
    const particleGeometry = trackGeometry(new THREE.BufferGeometry(), geometries);
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleLayer.add(new THREE.Points(particleGeometry, particleMaterial));

    let frameId = 0;
    let scrollProgress = 0;
    const pointer = new THREE.Vector2(0, 0);
    const pointerTarget = new THREE.Vector2(0, 0);
    const flowMaterials = [qMat, kMat, vMat, residualMat, violetMat, amberMat];

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 768 ? 32 : 24;
      root.scale.setScalar(width < 768 ? 0.66 : width < 1180 ? 0.86 : 1);
      root.position.x = width < 768 ? 0.9 : 1.1;
      camera.updateProjectionMatrix();
      if (prefersReducedMotion) {
        render();
      }
    };

    const updateScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollProgress = window.scrollY / maxScroll;
      if (prefersReducedMotion) {
        render();
      }
    };

    const updatePointer = (event: PointerEvent) => {
      pointerTarget.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerTarget.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const render = (time = 0) => {
      const elapsed = time * 0.001;
      const drift = prefersReducedMotion ? 0 : elapsed;
      pointer.lerp(pointerTarget, 0.045);

      for (const [index, material] of flowMaterials.entries()) {
        material.opacity = (material.userData.baseOpacity as number | undefined) ?? material.opacity;
        material.opacity *= 0.86 + Math.sin(drift * 1.25 + index * 0.9) * 0.14;
      }

      root.rotation.x = -0.08 + scrollProgress * 0.22 + pointer.y * 0.035;
      root.rotation.y = -0.29 + scrollProgress * 0.76 + pointer.x * 0.08;
      root.rotation.z = -0.015 + pointer.x * 0.018;
      root.position.y = 0.28 - scrollProgress * 3.65 + pointer.y * -0.16;

      diagram.rotation.y = Math.sin(drift * 0.17) * 0.025;
      foregroundLayer.position.x = Math.sin(drift * 0.34) * 0.12 + pointer.x * 0.18;
      foregroundLayer.position.y = Math.cos(drift * 0.28) * 0.08 + pointer.y * -0.14;
      flowLayer.position.z = Math.sin(drift * 0.27) * 0.24;
      particleLayer.rotation.y = drift * 0.018 + scrollProgress * 0.26;
      particleLayer.position.x = pointer.x * -0.22;
      camera.position.x = Math.sin(scrollProgress * Math.PI) * 1.45 + pointer.x * 0.32;
      camera.position.y = 0.8 - scrollProgress * 0.58 + pointer.y * -0.22;
      camera.lookAt(0.2, -0.2, -1.85);

      renderer.render(scene, camera);

      if (!prefersReducedMotion) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    for (const material of flowMaterials) {
      material.userData.baseOpacity = material.opacity;
    }

    resize();
    updateScroll();
    render();

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("pointermove", updatePointer);
      window.cancelAnimationFrame(frameId);
      for (const geometry of geometries) {
        geometry.dispose();
      }
      for (const material of materials) {
        material.dispose();
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="landing-transformer-scene">
      <canvas ref={canvasRef} className="landing-cinematic-canvas" data-testid="landing-cinematic-canvas" />
      <div className="landing-transformer-labels" aria-hidden>
        <span className="scene-label scene-label-embedding">Embedding</span>
        <span className="scene-label scene-label-block">Transformer Block 1</span>
        <span className="scene-label scene-label-attention">Multi-head Self Attention</span>
        <span className="scene-label scene-label-mlp">MLP</span>
        <span className="scene-label scene-label-probabilities">Probabilities</span>
        <span className="scene-label scene-label-residual">Residual stream</span>
        <span className="scene-chip scene-chip-q">Q</span>
        <span className="scene-chip scene-chip-k">K</span>
        <span className="scene-chip scene-chip-v">V</span>
        <div className="scene-token-list">
          {tokenLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <div className="scene-probability-list">
          <span>visualize 54.67%</span>
          <span>create 20.87%</span>
          <span>see 12.09%</span>
          <strong>make 6.26%</strong>
        </div>
      </div>
    </div>
  );
}
