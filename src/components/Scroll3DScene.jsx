import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Scroll3DScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- SETUP SCENE, CAMERA & RENDERER ---
    const scene = new THREE.Scene();
    
    // Perspective Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 8;

    // WebGL Renderer with Alpha (for transparent canvas) and Antialias
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // --- CUSTOM `.glb` COFFEE MODEL LOADER ---
    const loader = new GLTFLoader();
    const modelWrapper = new THREE.Group();
    scene.add(modelWrapper);

    loader.load(
      "/coffee_bean.glb",
      (gltf) => {
        const model = gltf.scene;
        
        // Traverse to enable shadow mapping & organic physical gloss
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              child.material.roughness = Math.min(child.material.roughness, 0.4);
              child.material.clearcoat = 1.0;
              child.material.clearcoatRoughness = 0.08;
            }
          }
        });

        // Bounding box logic to center pivot and scale proportionally
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        
        // Normalize max dimension to exactly 2.8 units for beautiful viewport scaling
        const maxDim = Math.max(size.x, size.y, size.z);
        const scaleFactor = 2.8 / maxDim;
        model.scale.setScalar(scaleFactor);
        
        // Shift geometry coordinates by negative bounding center to align pivot exactly at the origin
        model.position.sub(center.multiplyScalar(scaleFactor));
        
        modelWrapper.add(model);
      },
      undefined,
      (error) => {
        console.error("An error occurred loading the GLB model:", error);
      }
    );

    // --- 3D PARTICLE STEAM SYSTEM ---
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleSpeeds = [];

    for (let i = 0; i < particleCount; i++) {
      // Random coordinates in cylindrical volume
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 2.5;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 8;
      const z = Math.sin(angle) * radius;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      particleSpeeds.push({
        y: 0.005 + Math.random() * 0.015,
        speedAngle: 0.01 + Math.random() * 0.02,
        radius: radius,
        angle: angle,
      });
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    // Circular particle texture using procedural canvas
    const createCircularTexture = () => {
      const pCanvas = document.createElement("canvas");
      pCanvas.width = 32;
      pCanvas.height = 32;
      const pCtx = pCanvas.getContext("2d");
      
      const pGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      pGrad.addColorStop(0, "rgba(230, 194, 128, 0.8)"); // Soft glowing gold
      pGrad.addColorStop(0.5, "rgba(230, 194, 128, 0.2)");
      pGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      
      pCtx.fillStyle = pGrad;
      pCtx.fillRect(0, 0, 32, 32);
      
      return new THREE.CanvasTexture(pCanvas);
    };

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.16,
      map: createCircularTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const steamParticles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(steamParticles);

    // --- HIGH-END STUDIO LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    // Main Gold Directional Light
    const dirLight1 = new THREE.DirectionalLight(0xd4a373, 2.5);
    dirLight1.position.set(5, 5, 4);
    scene.add(dirLight1);

    // Secondary Cool Rim Light (gives a gorgeous professional outline)
    const dirLight2 = new THREE.DirectionalLight(0x5ca2a8, 1.8);
    dirLight2.position.set(-5, -3, -2);
    scene.add(dirLight2);

    // Subtle floating point light
    const pointLight = new THREE.PointLight(0xd4a373, 1.5, 10);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // --- ANIMATION TARGET KEYS & LERP INTERPOLATION ---
    const getLayoutConfig = (width) => {
      const isMobile = width < 768;
      
      return {
        // Sections: 0 (Hero), 1 (Story), 2 (Brews), 3 (Locations/Visit), 4 (Footer/End)
        hero: {
          x: isMobile ? 0 : 2.0,
          y: isMobile ? -1.0 : 0.0,
          z: isMobile ? -1.0 : 0.0,
          rx: 0.55, ry: -0.7, rz: 0.15,
          scale: isMobile ? 0.7 : 1.15,
        },
        story: {
          x: isMobile ? 0.0 : -2.2,
          y: isMobile ? -1.4 : -0.2,
          z: 0.0,
          rx: 0.62, ry: 0.8, rz: -0.25,
          scale: isMobile ? 0.6 : 1.0,
        },
        brews: {
          x: isMobile ? 0.0 : 1.8,
          y: isMobile ? -1.4 : -0.4,
          z: isMobile ? -1.2 : -0.8,
          rx: 0.5, ry: 1.4, rz: 0.35,
          scale: isMobile ? 0.6 : 0.9,
        },
        visit: {
          x: 0.0,
          y: isMobile ? 1.8 : 1.4,
          z: isMobile ? -2.2 : -1.8,
          rx: 0.95, ry: 0.0, rz: 1.15,
          scale: isMobile ? 0.5 : 0.75,
        },
        footer: {
          x: isMobile ? 0.0 : 1.6,
          y: isMobile ? -2.2 : -1.8,
          z: -0.4,
          rx: 0.6, ry: -1.0, rz: 0.2,
          scale: isMobile ? 0.55 : 0.75,
        }
      };
    };

    let layout = getLayoutConfig(window.innerWidth);

    // Scroll percentage tracking
    let scrollPercent = 0;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollPercent = maxScroll > 0 ? scrollY / maxScroll : 0;
    };
    window.addEventListener("scroll", handleScroll);

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      layout = getLayoutConfig(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    // Current State for lerping
    const current = {
      x: layout.hero.x,
      y: layout.hero.y,
      z: layout.hero.z,
      rx: layout.hero.rx,
      ry: layout.hero.ry,
      rz: layout.hero.rz,
      scale: layout.hero.scale,
    };

    // --- MAIN TICK RENDER LOOP ---
    let frameId;
    let clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Determine target state based on scroll percentage
      let target;
      if (scrollPercent <= 0.2) {
        // Hero to Story
        const progress = scrollPercent / 0.2;
        target = interpolateState(layout.hero, layout.story, progress);
      } else if (scrollPercent <= 0.48) {
        // Story to Brews
        const progress = (scrollPercent - 0.2) / 0.28;
        target = interpolateState(layout.story, layout.brews, progress);
      } else if (scrollPercent <= 0.72) {
        // Brews to Visit
        const progress = (scrollPercent - 0.48) / 0.24;
        target = interpolateState(layout.brews, layout.visit, progress);
      } else {
        // Visit to Footer
        const progress = Math.min((scrollPercent - 0.72) / 0.28, 1);
        target = interpolateState(layout.visit, layout.footer, progress);
      }

      // Smoothly interpolate (lerp) current to target (momentum effect)
      const lerpFactor = 0.06;
      current.x += (target.x - current.x) * lerpFactor;
      current.y += (target.y - current.y) * lerpFactor;
      current.z += (target.z - current.z) * lerpFactor;
      current.scale += (target.scale - current.scale) * lerpFactor;

      // Special handling for rotation (to avoid rotation glitches)
      current.rx += (target.rx - current.rx) * lerpFactor;
      current.ry += (target.ry - current.ry) * lerpFactor;
      current.rz += (target.rz - current.rz) * lerpFactor;

      // Add elegant automatic floating/rotation sway
      const hoverSwayY = Math.sin(elapsedTime * 1.5) * 0.08;
      const hoverSwayX = Math.cos(elapsedTime * 1.2) * 0.05;

      // Apply transforms to main clay teacup mesh
      modelWrapper.position.set(current.x + hoverSwayX, current.y + hoverSwayY, current.z);
      modelWrapper.rotation.set(
        current.rx + Math.sin(elapsedTime * 0.5) * 0.04,
        current.ry + elapsedTime * 0.08, // Slow idle spinning
        current.rz
      );
      modelWrapper.scale.setScalar(current.scale);

      // --- UPDATE STEAM PARTICLES ---
      const pPositions = steamParticles.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const speed = particleSpeeds[i];
        
        // Spiral motion around the y-axis
        speed.angle += speed.speedAngle;
        
        // Horizontal movement
        const targetX = Math.cos(speed.angle) * speed.radius;
        const targetZ = Math.sin(speed.angle) * speed.radius;
        
        pPositions[i * 3] += (targetX - pPositions[i * 3]) * 0.02;
        pPositions[i * 3 + 2] += (targetZ - pPositions[i * 3 + 2]) * 0.02;
        
        // Rising vertical movement
        pPositions[i * 3 + 1] += speed.y;

        // Reset if it floats out of bounds
        if (pPositions[i * 3 + 1] > 4.5) {
          pPositions[i * 3 + 1] = -4.5;
          pPositions[i * 3] = Math.cos(speed.angle) * speed.radius;
          pPositions[i * 3 + 2] = Math.sin(speed.angle) * speed.radius;
        }
      }
      steamParticles.geometry.attributes.position.needsUpdate = true;
      steamParticles.rotation.y = elapsedTime * 0.02; // Super slow rotation

      // Render
      renderer.render(scene, camera);

      // Loop
      frameId = requestAnimationFrame(tick);
    };

    // Interpolation utility function
    const interpolateState = (start, end, factor) => {
      return {
        x: start.x + (end.x - start.x) * factor,
        y: start.y + (end.y - start.y) * factor,
        z: start.z + (end.z - start.z) * factor,
        rx: start.rx + (end.rx - start.rx) * factor,
        ry: start.ry + (end.ry - start.ry) * factor,
        rz: start.rz + (end.rz - start.rz) * factor,
        scale: start.scale + (end.scale - start.scale) * factor,
      };
    };

    // Kickoff animations
    tick();

    // --- CLEANUP ---
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
      
      // Dispose materials & geometries
      modelWrapper.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat.dispose());
            } else {
              child.material.dispose();
            }
          }
        }
      });
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
