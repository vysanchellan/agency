"use client";

import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  MeshDistortMaterial,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useRef } from "react";
import * as THREE from "three";

type SceneProps = {
  /** When true the blob stops morphing and floating; it just sits and shines. */
  reducedMotion?: boolean;
};

/**
 * The Kassora signature object: an organic, endlessly morphing form that
 * stands in for the studio's fluid identity. MeshDistortMaterial handles the
 * morph, Lightformers provide reflections without fetching an HDR at runtime,
 * and ContactShadows ground it.
 */
function Blob({ reducedMotion }: SceneProps) {
  const group = useRef<THREE.Group>(null);

  // Ease the whole group toward the pointer so the object feels aware of you.
  useFrame((state, delta) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      state.pointer.x * 0.35,
      2.2,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      state.pointer.y * -0.2,
      2.2,
      delta,
    );
  });

  return (
    <group ref={group}>
      <Float
        speed={reducedMotion ? 0 : 1.6}
        rotationIntensity={reducedMotion ? 0 : 0.5}
        floatIntensity={reducedMotion ? 0 : 1.1}
        floatingRange={[-0.12, 0.12]}
      >
        <mesh position={[0, 0.15, 0]}>
          <icosahedronGeometry args={[1.35, 48]} />
          <MeshDistortMaterial
            color="#0d9488"
            roughness={0.08}
            metalness={0.92}
            distort={reducedMotion ? 0 : 0.46}
            speed={reducedMotion ? 0 : 1.9}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene({ reducedMotion = false }: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.35, 4.4], fov: 40 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      className="!pointer-events-none"
      eventSource={
        typeof document !== "undefined" ? document.body : undefined
      }
      eventPrefix="client"
    >
      <ambientLight intensity={0.35} />

      {/* Studio-built environment: emerald / cyan / violet area lights give
          the metal its color without any external HDR download. */}
      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={4}
          color="#34d399"
          position={[3, 2, 2]}
          scale={[4, 4, 1]}
        />
        <Lightformer
          form="rect"
          intensity={3}
          color="#22d3ee"
          position={[-4, 1, -1]}
          rotation-y={Math.PI / 2}
          scale={[5, 3, 1]}
        />
        <Lightformer
          form="rect"
          intensity={2.2}
          color="#a78bfa"
          position={[0, 4, -3]}
          rotation-x={Math.PI / 2}
          scale={[6, 6, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1}
          color="#fbbf24"
          position={[0, -3, 3]}
          scale={[3, 2, 1]}
        />
      </Environment>

      <Blob reducedMotion={reducedMotion} />

      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={0.55}
        scale={9}
        blur={2.6}
        far={2.4}
        resolution={256}
        color="#000000"
      />

      {!reducedMotion && (
        <EffectComposer>
          <Bloom
            intensity={0.35}
            luminanceThreshold={0.85}
            luminanceSmoothing={0.3}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
