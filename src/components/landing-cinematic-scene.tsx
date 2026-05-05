"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const tokenRows = [-3.1, -1.85, -0.6, 0.65, 1.9, 3.15] as const;
const layerColumns = [-7.4, -5.25, -3.1, -0.95, 1.2, 3.35, 5.5, 7.65] as const;
const colorWay = [0x26f0ff, 0xffcf66, 0x62f2a9, 0xff6b6b] as const;

function createLine(points: THREE.Vector3[], material: THREE.LineBasicMaterial) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return { line: new THREE.Line(geometry, material), geometry };
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
      preserveDrawingBuffer: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.setClearColor(0x030405, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 150);
    camera.position.set(0, 1.2, 24);

    const root = new THREE.Group();
    const transformer = new THREE.Group();
    const attention = new THREE.Group();
    const residuals = new THREE.Group();
    const particles = new THREE.Group();
    scene.add(root);
    root.add(transformer, attention, residuals, particles);

    scene.add(new THREE.AmbientLight(0xf4eee4, 0.95));

    const cyanLight = new THREE.PointLight(0x26f0ff, 4.2, 34);
    cyanLight.position.set(-5, 4, 7);
    scene.add(cyanLight);

    const amberLight = new THREE.PointLight(0xffcf66, 3.8, 34);
    amberLight.position.set(5, -3, 6);
    scene.add(amberLight);

    const greenLight = new THREE.PointLight(0x62f2a9, 2.8, 30);
    greenLight.position.set(0, 4, -4);
    scene.add(greenLight);

    const materials: THREE.Material[] = [];
    const geometries: THREE.BufferGeometry[] = [];

    const tokenMaterials = colorWay.map((color) => {
      const material = new THREE.MeshPhysicalMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.46,
        metalness: 0.34,
        roughness: 0.24,
        clearcoat: 0.75,
        clearcoatRoughness: 0.22,
      });
      materials.push(material);
      return material;
    });

    const blockMaterials = colorWay.map((color) => {
      const material = new THREE.MeshPhysicalMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.16,
        metalness: 0.48,
        roughness: 0.38,
        transparent: true,
        opacity: 0.34,
        clearcoat: 0.7,
      });
      materials.push(material);
      return material;
    });

    const tokenGeometry = new THREE.SphereGeometry(0.16, 22, 16);
    const attentionHeadGeometry = new THREE.TorusGeometry(0.5, 0.018, 8, 48);
    const layerShellGeometry = new THREE.BoxGeometry(0.82, 7.4, 0.13);
    const mlpGeometry = new THREE.BoxGeometry(0.3, 0.74, 0.22);
    geometries.push(tokenGeometry, attentionHeadGeometry, layerShellGeometry, mlpGeometry);

    for (const [layerIndex, x] of layerColumns.entries()) {
      const colorIndex = layerIndex % colorWay.length;
      const shell = new THREE.Mesh(layerShellGeometry, blockMaterials[colorIndex]);
      shell.position.set(x, 0, -2.6 + layerIndex * 0.18);
      shell.rotation.set(0, -0.18, 0.02);
      transformer.add(shell);

      for (const [rowIndex, y] of tokenRows.entries()) {
        const token = new THREE.Mesh(tokenGeometry, tokenMaterials[(rowIndex + layerIndex) % tokenMaterials.length]);
        token.position.set(x, y, -0.55 + layerIndex * 0.16);
        token.scale.setScalar(1 + (rowIndex % 2) * 0.18);
        transformer.add(token);

        const mlp = new THREE.Mesh(mlpGeometry, blockMaterials[(rowIndex + 2) % blockMaterials.length]);
        mlp.position.set(x + 0.42, y, -0.72 + layerIndex * 0.16);
        mlp.rotation.set(0.18, -0.34, 0.08);
        transformer.add(mlp);
      }

      for (let head = 0; head < 4; head += 1) {
        const ring = new THREE.Mesh(attentionHeadGeometry, tokenMaterials[(head + layerIndex) % tokenMaterials.length]);
        ring.position.set(x - 0.26, -2.42 + head * 1.62, -0.95 + layerIndex * 0.18);
        ring.rotation.set(Math.PI / 2.35, 0.12, 0.18);
        ring.scale.set(1, 0.46, 1);
        attention.add(ring);
      }
    }

    const cyanLine = new THREE.LineBasicMaterial({ color: 0x26f0ff, transparent: true, opacity: 0.62 });
    const amberLine = new THREE.LineBasicMaterial({ color: 0xffcf66, transparent: true, opacity: 0.58 });
    const greenLine = new THREE.LineBasicMaterial({ color: 0x62f2a9, transparent: true, opacity: 0.46 });
    const redLine = new THREE.LineBasicMaterial({ color: 0xff6b6b, transparent: true, opacity: 0.42 });
    materials.push(cyanLine, amberLine, greenLine, redLine);

    for (const [rowIndex, y] of tokenRows.entries()) {
      const path = new THREE.CatmullRomCurve3(
        layerColumns.map((x, layerIndex) => new THREE.Vector3(x, y + Math.sin(layerIndex * 0.8 + rowIndex) * 0.14, -0.2 + layerIndex * 0.12)),
      );
      const { line, geometry } = createLine(path.getPoints(140), rowIndex % 2 === 0 ? cyanLine : amberLine);
      line.position.z = -0.1;
      residuals.add(line);
      geometries.push(geometry);
    }

    for (let layerIndex = 0; layerIndex < layerColumns.length - 1; layerIndex += 1) {
      const x = layerColumns[layerIndex];
      const nextX = layerColumns[layerIndex + 1];
      const material = layerIndex % 3 === 0 ? greenLine : layerIndex % 3 === 1 ? cyanLine : redLine;

      for (let rowIndex = 0; rowIndex < tokenRows.length; rowIndex += 1) {
        const fromY = tokenRows[rowIndex];
        const targetA = tokenRows[(rowIndex + layerIndex + 1) % tokenRows.length];
        const targetB = tokenRows[(rowIndex + 2) % tokenRows.length];
        const { line: lineA, geometry: geometryA } = createLine(
          [
            new THREE.Vector3(x, fromY, -0.65),
            new THREE.Vector3((x + nextX) / 2, (fromY + targetA) / 2, -1.15),
            new THREE.Vector3(nextX, targetA, -0.55),
          ],
          material,
        );
        const { line: lineB, geometry: geometryB } = createLine(
          [
            new THREE.Vector3(x, fromY, -1.3),
            new THREE.Vector3((x + nextX) / 2, (fromY + targetB) / 2 + 0.4, -2.15),
            new THREE.Vector3(nextX, targetB, -1.1),
          ],
          material,
        );
        lineA.visible = rowIndex % 2 === layerIndex % 2;
        lineB.visible = rowIndex % 3 === layerIndex % 3;
        attention.add(lineA, lineB);
        geometries.push(geometryA, geometryB);
      }
    }

    const embeddingMaterial = new THREE.PointsMaterial({
      color: 0xf4eee4,
      size: 0.035,
      transparent: true,
      opacity: 0.66,
      sizeAttenuation: true,
    });
    materials.push(embeddingMaterial);

    const embeddingPositions = new Float32Array(840);
    for (let i = 0; i < embeddingPositions.length; i += 3) {
      embeddingPositions[i] = (Math.random() - 0.5) * 22;
      embeddingPositions[i + 1] = (Math.random() - 0.5) * 10;
      embeddingPositions[i + 2] = -8 + Math.random() * 10;
    }

    const embeddingGeometry = new THREE.BufferGeometry();
    embeddingGeometry.setAttribute("position", new THREE.BufferAttribute(embeddingPositions, 3));
    particles.add(new THREE.Points(embeddingGeometry, embeddingMaterial));
    geometries.push(embeddingGeometry);

    let frameId = 0;
    let scrollProgress = 0;

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 768 ? 30 : 23;
      root.scale.setScalar(width < 768 ? 0.74 : 1);
      camera.updateProjectionMatrix();
    };

    const updateScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollProgress = window.scrollY / maxScroll;
    };

    const render = (time = 0) => {
      const elapsed = time * 0.001;
      const drift = prefersReducedMotion ? 0 : elapsed;

      root.rotation.x = -0.18 + scrollProgress * 0.34 + Math.sin(drift * 0.16) * 0.025;
      root.rotation.y = -0.34 + scrollProgress * 0.82 + Math.sin(drift * 0.12) * 0.06;
      root.rotation.z = -0.05 + scrollProgress * 0.16;
      root.position.y = 0.8 - scrollProgress * 4.4;
      transformer.rotation.y = Math.sin(drift * 0.2) * 0.05;
      attention.position.x = Math.sin(drift * 0.36) * 0.22;
      residuals.position.z = Math.sin(drift * 0.3) * 0.34;
      particles.rotation.y = drift * 0.02 + scrollProgress * 0.32;
      camera.position.x = Math.sin(scrollProgress * Math.PI) * 1.8;
      camera.position.y = 1.2 - scrollProgress * 0.75;
      camera.lookAt(0, -0.25, -2.4);

      renderer.render(scene, camera);

      if (!prefersReducedMotion) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    resize();
    updateScroll();
    render();

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateScroll);
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

  return <canvas ref={canvasRef} className="landing-cinematic-canvas" data-testid="landing-cinematic-canvas" />;
}
