"use client";

import { useEffect, useRef, useState } from "react";
import { anatomyModels } from "@/lib/anatomy-models";
import { Icon } from "./Icons";
import styles from "./SpecialtyModel.module.css";

type Actions = { rotate: (amount: number) => void; zoom: (amount: number) => void; reset: () => void };
export function SpecialtyModel({ slug, name, icon }: { slug: string; name: string; icon: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const actions = useRef<Actions | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const reference = anatomyModels[slug];

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !reference) return;
    let cancelled = false;
    let cleanup = () => {};
    const abort = new AbortController();
    void (async () => {
      const [THREE, { OrbitControls }, { GLTFLoader }, { RoomEnvironment }] = await Promise.all([
        import("three"), import("three/addons/controls/OrbitControls.js"),
        import("three/addons/loaders/GLTFLoader.js"), import("three/addons/environments/RoomEnvironment.js"),
      ]);
      if (cancelled) return;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      host.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const studio = new RoomEnvironment();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const environment = pmrem.fromScene(studio, .04);
      studio.dispose(); pmrem.dispose();
      scene.environment = environment.texture;
      scene.environmentIntensity = .65;
      const key = new THREE.DirectionalLight("#fff5eb", 3); key.position.set(-3, 4, 5); scene.add(key);
      const fill = new THREE.DirectionalLight("#dbeaff", 1.1); fill.position.set(4, 1, 2); scene.add(fill);
      const rim = new THREE.DirectionalLight("#ffdbc8", 2); rim.position.set(1, 3, -4); scene.add(rim);
      const camera = new THREE.PerspectiveCamera(36, 1, .1, 50);
      const model = new THREE.Group(); scene.add(model);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false; controls.enablePan = false; controls.enableDamping = true;
      controls.dampingFactor = .075; controls.autoRotateSpeed = .45;
      controls.minPolarAngle = .2; controls.maxPolarAngle = Math.PI - .2;
      renderer.domElement.style.touchAction = "pan-y";
      const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
      const updateMotion = () => { controls.autoRotate = !motion.matches; };
      motion.addEventListener("change", updateMotion); updateMotion();
      let cameraDistance = 6.6;
      const reset = () => { model.rotation.set(0, -.2, 0); camera.position.set(0, .08, cameraDistance); controls.target.set(0, 0, 0); controls.update(); };
      const resize = () => {
        const width = host.clientWidth, height = host.clientHeight;
        if (!width || !height) return;
        camera.aspect = width / height; camera.updateProjectionMatrix(); renderer.setSize(width, height);
        // Fit a 3.35-unit anatomical bounding sphere at narrow mobile aspect ratios.
        const fov = Math.min(camera.fov * Math.PI / 180, 2 * Math.atan(Math.tan(camera.fov * Math.PI / 360) * camera.aspect));
        cameraDistance = 1.9 / Math.sin(fov / 2); reset();
      };
      const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(host); resize();
      let visible = true;
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }); observer.observe(host);
      let previous = 0;
      renderer.setAnimationLoop((time) => {
        const delta = previous ? Math.min((time - previous) / 1000, .05) : 0; previous = time;
        if (!visible || document.hidden) return;
        controls.update(delta); renderer.render(scene, camera);
      });
      const disposeModel = (object: InstanceType<typeof THREE.Object3D>) => object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          (Array.isArray(child.material) ? child.material : [child.material]).forEach((material) => material.dispose());
        }
      });
      const contextLost = (event: Event) => { event.preventDefault(); renderer.setAnimationLoop(null); if (!cancelled) setStatus("error"); };
      renderer.domElement.addEventListener("webglcontextlost", contextLost);
      cleanup = () => {
        renderer.setAnimationLoop(null); resizeObserver.disconnect(); observer.disconnect();
        motion.removeEventListener("change", updateMotion); controls.dispose();
        renderer.domElement.removeEventListener("webglcontextlost", contextLost);
        disposeModel(scene); environment.dispose(); renderer.dispose(); renderer.domElement.remove(); actions.current = null;
      };
      const response = await fetch(`/models/anatomy/${reference.file}.glb`, { signal: abort.signal });
      if (!response.ok) throw new Error("Anatomy model could not load");
      const gltf = await new GLTFLoader().parseAsync(await response.arrayBuffer(), "");
      if (cancelled) { disposeModel(gltf.scene); return; }
      gltf.scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          // Subtle clearcoat preserves surface detail without a shiny plastic appearance.
          const source = object.material as InstanceType<typeof THREE.MeshStandardMaterial>;
          const material = new THREE.MeshPhysicalMaterial({ color: source.color, roughness: .55, metalness: 0, clearcoat: .12, clearcoatRoughness: .48, side: THREE.DoubleSide });
          source.dispose(); object.material = material;
        }
      });
      model.add(gltf.scene); reset();
      actions.current = {
        rotate: (amount) => { model.rotation.y += amount; },
        zoom: (factor) => { const distance = camera.position.length(); camera.position.multiplyScalar(Math.max(cameraDistance * .65, Math.min(cameraDistance * 1.45, distance * factor)) / distance); },
        reset,
      };
      setStatus("ready");
    })().catch(() => {
      if (!cancelled) { cleanup(); setStatus("error"); }
    });
    return () => { cancelled = true; abort.abort(); cleanup(); };
  }, [reference, attempt]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.halo} aria-hidden="true" />
      <div className={styles.topline}><span className={styles.tag}><span /> INTERACTIVE ANATOMY</span><span className={styles.modelNumber}>3D / {String(Object.keys(anatomyModels).indexOf(slug) + 1).padStart(2, "0")}</span></div>
      <div className={styles.viewport} ref={hostRef} role="img" aria-label={`Interactive anatomical model for ${name}: ${reference.label}. Use arrow keys to rotate, plus or minus to zoom, Home to reset.`} tabIndex={status === "ready" ? 0 : -1} onKeyDown={(event) => {
        if (["ArrowLeft", "ArrowRight", "+", "=", "-", "Home"].includes(event.key)) event.preventDefault();
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") actions.current?.rotate(event.key === "ArrowLeft" ? -.25 : .25);
        if (event.key === "+" || event.key === "=") actions.current?.zoom(.9);
        if (event.key === "-") actions.current?.zoom(1.1);
        if (event.key === "Home") actions.current?.reset();
      }} />
      {status !== "ready" && <div className={styles.fallback}><Icon name={icon} size={65} strokeWidth={1} /><span role="status">{status === "loading" ? "Preparing your 3D view…" : "3D view unavailable on this device."}</span>{status === "error" && <button type="button" onClick={() => { setStatus("loading"); setAttempt((value) => value + 1); }}>Try again</button>}</div>}
      <div className={styles.base} aria-hidden="true" />
      <div className={styles.bottom}><div className={styles.modelTitle}><strong>{reference.label}</strong><span>{reference.note || "Anatomical reference model"}</span></div>
        {status === "ready" && <><p>Drag horizontally to rotate · Use the controls to explore</p><div className={styles.controls}><button type="button" aria-label="Rotate model left" onClick={() => actions.current?.rotate(-.4)}>←</button><button type="button" aria-label="Zoom out" onClick={() => actions.current?.zoom(1.1)}>−</button><button type="button" onClick={() => actions.current?.reset()}>Reset view</button><button type="button" aria-label="Zoom in" onClick={() => actions.current?.zoom(.9)}>+</button><button type="button" aria-label="Rotate model right" onClick={() => actions.current?.rotate(.4)}>→</button></div></>}
        <details className={styles.credits}><summary>Model source & credits</summary><p>{reference.source === "bodyparts" ? <>BodyParts3D, © The Database Center for Life Science. <a href="https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html" target="_blank" rel="noopener noreferrer">Source & license</a>.</> : <>Human Reference Atlas / HuBMAP, Kristen Browne and Heidi Schlehlein. Visible Human Dataset, National Library of Medicine. <a href="https://humanatlas.io/3d-reference-library" target="_blank" rel="noopener noreferrer">Source library</a>.</>} <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>. Adapted colors, framing and selected structures. <a href="/models/anatomy/NOTICE.md" target="_blank" rel="noopener noreferrer">Full credits</a>.</p></details>
      </div>
    </div>
  );
}
