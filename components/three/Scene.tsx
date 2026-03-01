'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

function AlienPlanet() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const atmosRef = useRef<THREE.Mesh>(null!)
  const groupRef = useRef<THREE.Group>(null!)

  const planetMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      sunDir: { value: new THREE.Vector3(1, 0.4, 0.8).normalize() }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewPos;
      varying vec3 vWorldPos;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPos = -mvPosition.xyz;
        vWorldPos = position;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 sunDir;
      
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewPos;
      varying vec3 vWorldPos;

      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float hash3(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
      
      float noise(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i), hash(i + vec2(1,0)), f.x),
          mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
          f.y
        );
      }

      float noise3(vec3 p) {
        vec3 i = floor(p); vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float n000 = hash3(i);
        float n100 = hash3(i + vec3(1,0,0));
        float n010 = hash3(i + vec3(0,1,0));
        float n110 = hash3(i + vec3(1,1,0));
        float n001 = hash3(i + vec3(0,0,1));
        float n101 = hash3(i + vec3(1,0,1));
        float n011 = hash3(i + vec3(0,1,1));
        float n111 = hash3(i + vec3(1,1,1));
        return mix(mix(mix(n000,n100,f.x),mix(n010,n110,f.x),f.y),
                   mix(mix(n001,n101,f.x),mix(n011,n111,f.x),f.y),f.z);
      }

      // 3D FBM to avoid UV seams
      float fbm3(vec3 p) {
        float v = 0.0; float a = 0.5;
        for (int i = 0; i < 6; i++) {
          v += a * noise3(p);
          p *= 2.1;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        // Use 3D world position for seamless noise (no UV seams)
        vec3 p = vWorldPos * 1.8;
        
        // Domain warping for cloudy, organic swirling look
        vec3 q = vec3(
          fbm3(p + vec3(0.0, 0.0, 0.0)),
          fbm3(p + vec3(1.7, 9.2, 3.4)),
          fbm3(p + vec3(8.3, 2.8, 5.1))
        );

        vec3 r = vec3(
          fbm3(p + 2.5 * q + vec3(time * 0.018, time * 0.012, 0.0)),
          fbm3(p + 2.5 * q + vec3(4.1, 6.7, time * 0.01)),
          fbm3(p + 2.5 * q + vec3(time * 0.008, 3.2, 7.4))
        );

        float n = fbm3(p + 3.0 * r);
        float n2 = fbm3(p * 0.5 + vec3(time * 0.006, 0.0, time * 0.009));

        // ── Vibrant Light Purple Palette ──
        // Layer 1: soft lavender base
        vec3 lavender    = vec3(0.78, 0.62, 0.98);  // #c79efa - bright lavender
        // Layer 2: light purple-pink cloud bands
        vec3 lilac       = vec3(0.88, 0.72, 1.00);  // #e0b8ff - lilac
        // Layer 3: deeper violet for depth contrast
        vec3 violet      = vec3(0.55, 0.28, 0.90);  // #8c47e6 - medium violet
        // Layer 4: pale periwinkle-white for bright cloud tops
        vec3 cloudWhite  = vec3(0.93, 0.87, 1.00);  // #eddeff - near white
        // Layer 5: warm pink-purple for band variety
        vec3 rosePurple  = vec3(0.80, 0.50, 0.95);  // #cc80f2 - rose purple

        // Build up color in layers like a gas giant
        vec3 col = lavender;
        col = mix(col, violet,     smoothstep(0.25, 0.45, n));
        col = mix(col, rosePurple, smoothstep(0.40, 0.60, n2));
        col = mix(col, lilac,      smoothstep(0.50, 0.72, n));
        col = mix(col, cloudWhite, smoothstep(0.72, 0.90, n));
        // Extra punch of bright lilac on peaks
        col = mix(col, vec3(0.96, 0.88, 1.00), smoothstep(0.88, 1.00, n) * 0.7);

        // ── Lighting ──
        vec3 normal   = normalize(vNormal);
        vec3 viewDir  = normalize(vViewPos);
        float NdotL   = max(dot(normal, sunDir), 0.0);

        // High ambient so dark side still shows beautiful color
        float ambient  = 0.55;
        float diffuse  = 0.45 * NdotL;
        float lighting = ambient + diffuse;

        vec3 finalColor = col * lighting;

        // Subtle specular shimmer on cloud tops
        vec3 halfVec = normalize(sunDir + viewDir);
        float spec = pow(max(dot(normal, halfVec), 0.0), 18.0) * 0.12 * NdotL;
        finalColor += vec3(0.9, 0.8, 1.0) * spec;

        // Fresnel rim: glowing purple edge
        float rim = 1.0 - max(dot(viewDir, normal), 0.0);
        float rimPow = pow(rim, 3.5);
        finalColor += vec3(0.65, 0.30, 1.00) * rimPow * 0.5;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `
  }), [])

  // Outer atmosphere glow — brighter, more saturated purple
  const atmosMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color('#b06aff') },
      sunDir: { value: new THREE.Vector3(1, 0.4, 0.8).normalize() }
    },
    transparent: true,
    side: THREE.BackSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main(){
        vNormal = normalize(normalMatrix * normal);
        vViewDir = normalize(cameraPosition - (modelMatrix * vec4(position, 1.0)).xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform vec3 sunDir;
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main(){
        float rim = 1.0 - abs(dot(vNormal, vViewDir));
        float intensity = pow(rim, 2.2) * 1.8;
        float sunMask = dot(vNormal, sunDir) * 0.4 + 0.6;
        // Two-tone halo: inner bright violet, outer pink-purple
        vec3 innerCol = vec3(0.72, 0.35, 1.00);
        vec3 outerCol = vec3(0.95, 0.60, 1.00);
        vec3 col = mix(innerCol, outerCol, pow(rim, 0.5));
        gl_FragColor = vec4(col, intensity * sunMask * 0.9);
      }
    `
  }), [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) groupRef.current.rotation.y = t * 0.05
    planetMaterial.uniforms.time.value = t
  })

  return (
    <group ref={groupRef}>
      {/* Planet surface */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.8, 128, 128]} />
        <primitive object={planetMaterial} attach="material" />
      </mesh>
      {/* Atmosphere halo */}
      <mesh ref={atmosRef} scale={1.18}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <primitive object={atmosMaterial} attach="material" />
      </mesh>
    </group>
  )
}

// ─── Moon ─────────────────────────────────────────────────────────────────────
function Moon() {
  const orbitRef = useRef<THREE.Group>(null!)
  const moonRef = useRef<THREE.Mesh>(null!)

  const moonMat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 } },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      varying vec3 vPos;
      void main() {
        vPos     = position;
        vNormal  = normalize(normalMatrix * normal);
        vViewDir = normalize(cameraPosition - (modelMatrix * vec4(position,1.0)).xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec3 vNormal;
      varying vec3 vViewDir;
      varying vec3 vPos;

      float hash3(vec3 p){
        p = fract(p * vec3(443.897, 397.297, 491.187));
        p += dot(p.zxy, p.yxz + 19.19);
        return fract(p.x * p.y * p.z);
      }
      float noise3(vec3 p){
        vec3 i = floor(p), f = fract(p);
        f = f*f*(3.0-2.0*f);
        return mix(
          mix(mix(hash3(i),             hash3(i+vec3(1,0,0)),f.x),
              mix(hash3(i+vec3(0,1,0)), hash3(i+vec3(1,1,0)),f.x),f.y),
          mix(mix(hash3(i+vec3(0,0,1)), hash3(i+vec3(1,0,1)),f.x),
              mix(hash3(i+vec3(0,1,1)), hash3(i+vec3(1,1,1)),f.x),f.y),f.z);
      }
      float fbm(vec3 p, int oct){
        float v=0.0, a=0.5;
        for(int i=0;i<8;i++){
          if(i>=oct) break;
          v+=a*noise3(p); p*=2.1; a*=0.5;
        }
        return v;
      }

      void main(){
        vec3 n = normalize(vPos);

        // Domain warping for organic swirling clouds
        vec3 q = vec3(
          fbm(n * 2.0 + vec3(0.0, 0.0, 0.0), 4),
          fbm(n * 2.0 + vec3(1.7, 9.2, 3.4), 4),
          fbm(n * 2.0 + vec3(8.3, 2.8, 5.1), 4)
        );
        vec3 r = vec3(
          fbm(n * 2.0 + 2.0*q + vec3(time*0.012, time*0.008, 0.0), 5),
          fbm(n * 2.0 + 2.0*q + vec3(3.1, 5.7, time*0.007), 5),
          fbm(n * 2.0 + 2.0*q + vec3(time*0.006, 2.4, 6.1), 5)
        );

        float cloud1 = fbm(n * 2.5 + 3.0*r + vec3(time*0.010, 0.0, time*0.007), 6);
        float cloud2 = fbm(n * 1.2 + vec3(time*0.005, time*0.004, 0.0), 4);
        float cloud3 = fbm(n * 4.5 + vec3(time*0.018, time*0.012, 1.1), 4);

        // ── Dark blue + light blue palette ──
        vec3 deepNavy    = vec3(0.02, 0.05, 0.18);  // very dark navy
        vec3 darkBlue    = vec3(0.05, 0.12, 0.38);  // dark ocean blue
        vec3 midBlue     = vec3(0.12, 0.30, 0.65);  // medium blue
        vec3 brightBlue  = vec3(0.30, 0.60, 0.95);  // bright light blue
        vec3 paleBlue    = vec3(0.60, 0.82, 1.00);  // pale sky blue (highlights)

        // Layer cloud colors — dark base rising to light peaks
        vec3 col = deepNavy;
        col = mix(col, darkBlue,   smoothstep(0.22, 0.40, cloud2));
        col = mix(col, midBlue,    smoothstep(0.36, 0.54, cloud1));
        col = mix(col, brightBlue, smoothstep(0.52, 0.70, cloud1));
        col = mix(col, paleBlue,   smoothstep(0.68, 0.86, cloud3));
        // Bright light blue peaks
        col = mix(col, vec3(0.75, 0.92, 1.00), smoothstep(0.82, 1.00, cloud1) * 0.80);

        // ── Lighting ──
        vec3 sunDir = normalize(vec3(1.0, 0.4, 0.8));
        float NdotL = max(dot(vNormal, sunDir), 0.0);
        float ambient = 0.35;
        float diffuse = 0.65 * NdotL;
        col *= (ambient + diffuse);

        // Soft specular on bright cloud tops
        vec3 halfVec = normalize(sunDir + vViewDir);
        float spec = pow(max(dot(vNormal, halfVec), 0.0), 28.0) * NdotL * 0.20;
        col += vec3(0.65, 0.85, 1.0) * spec;

        // Fresnel rim — subtle dark blue edge
        float rim = 1.0 - max(dot(vViewDir, vNormal), 0.0);
        col += vec3(0.08, 0.20, 0.55) * pow(rim, 4.0) * 0.45;

        gl_FragColor = vec4(col, 1.0);
      }
    `,
  }), [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    orbitRef.current.rotation.y = t * 0.18
    moonRef.current.rotation.y  = t * 0.05
    moonMat.uniforms.time.value  = t
  })

  return (
    <group ref={orbitRef}>
      <group position={[4.5, 0.4, 0]}>
        {/* Moon surface — no atmosphere */}
        <mesh ref={moonRef}>
          <sphereGeometry args={[0.42, 128, 128]} />
          <primitive object={moonMat} attach="material" />
        </mesh>
      </group>
    </group>
  )
}




// ─── Asteroid Belt ────────────────────────────────────────────────────────────
function AsteroidBelt() {
  const groupRef = useRef<THREE.Group>(null!)
  const count = 320

  const asteroids = useMemo(() =>
    Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4
      const r = 3.0 + (Math.random() - 0.5) * 1.0
      const y = (Math.random() - 0.5) * 0.35
      // Varied detail levels for LOD-like effect
      const detail = Math.random() > 0.6 ? 2 : 1
      return {
        x: Math.cos(angle) * r,
        y,
        z: Math.sin(angle) * r,
        scale: 0.010 + Math.random() * 0.038,
        rotSpeed: (Math.random() - 0.5) * 1.5,
        rotAxis: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize(),
        // Unique seed per asteroid for color/texture variation
        seed: Math.random(),
        typeIndex: Math.floor(Math.random() * 3), // 0=C-type, 1=S-type, 2=M-type
        detail,
      }
    }), []
  )

  const meshRefs = useRef<THREE.Mesh[]>([])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.022
    meshRefs.current.forEach((mesh, i) => {
      if (mesh) mesh.rotateOnAxis(asteroids[i].rotAxis, 0.008 * asteroids[i].rotSpeed)
    })
  })

  // Three geometry variants for shape diversity
  const geos = useMemo(() => [
    new THREE.IcosahedronGeometry(1, 1),
    new THREE.IcosahedronGeometry(1, 0),
    new THREE.DodecahedronGeometry(1, 0),
  ], [])

  // Shared asteroid shader — all variation done via uniforms
  const mat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      sunDir:    { value: new THREE.Vector3(22, 4, -18).normalize() },
      seed:      { value: 0.0 },
      typeIndex: { value: 0.0 },
    },
    vertexShader: `
      uniform float seed;
      varying vec3 vNormal;
      varying vec3 vPos;
      varying vec3 vViewDir;

      // Cheap vertex displacement for irregular shape
      float hash3v(vec3 p){
        p = fract(p * vec3(127.1, 311.7, 74.7));
        p += dot(p.zxy, p.yxz + 19.19);
        return fract(p.x * p.y * p.z);
      }
      float vnoise(vec3 p){
        vec3 i = floor(p); vec3 f = fract(p);
        f = f*f*(3.0-2.0*f);
        float n000 = hash3v(i);
        float n100 = hash3v(i+vec3(1,0,0));
        float n010 = hash3v(i+vec3(0,1,0));
        float n110 = hash3v(i+vec3(1,1,0));
        float n001 = hash3v(i+vec3(0,0,1));
        float n101 = hash3v(i+vec3(1,0,1));
        float n011 = hash3v(i+vec3(0,1,1));
        float n111 = hash3v(i+vec3(1,1,1));
        return mix(mix(mix(n000,n100,f.x),mix(n010,n110,f.x),f.y),
                   mix(mix(n001,n101,f.x),mix(n011,n111,f.x),f.y),f.z);
      }

      void main(){
        vPos    = position;
        vNormal = normal;

        // Displace vertices to make irregular lumpy shape
        vec3 noisePos = position * 2.8 + vec3(seed * 17.3, seed * 9.1, seed * 23.7);
        float disp  = vnoise(noisePos) * 0.38;
        float disp2 = vnoise(noisePos * 2.1 + 3.7) * 0.18;
        float disp3 = vnoise(noisePos * 4.5 + 7.3) * 0.08;
        float totalDisp = disp + disp2 + disp3;

        vec3 displaced = position + normal * (totalDisp - 0.28);

        // Recompute approximate normal after displacement
        // (finite difference on noise)
        float eps = 0.05;
        float dx = vnoise(noisePos + vec3(eps,0,0)) - vnoise(noisePos - vec3(eps,0,0));
        float dy = vnoise(noisePos + vec3(0,eps,0)) - vnoise(noisePos - vec3(0,eps,0));
        float dz = vnoise(noisePos + vec3(0,0,eps)) - vnoise(noisePos - vec3(0,0,eps));
        vec3 perturbedNormal = normalize(normal - vec3(dx,dy,dz)*0.35);

        vNormal  = normalize(normalMatrix * perturbedNormal);
        vViewDir = normalize(cameraPosition - (modelMatrix * vec4(displaced, 1.0)).xyz);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3  sunDir;
      uniform float seed;
      uniform float typeIndex;

      varying vec3 vNormal;
      varying vec3 vPos;
      varying vec3 vViewDir;

      float hash3f(vec3 p){
        p = fract(p * vec3(443.897, 397.297, 491.187));
        p += dot(p.zxy, p.yxz + 19.19);
        return fract(p.x * p.y * p.z);
      }
      float noise3f(vec3 p){
        vec3 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
        return mix(
          mix(mix(hash3f(i),          hash3f(i+vec3(1,0,0)),f.x),
              mix(hash3f(i+vec3(0,1,0)),hash3f(i+vec3(1,1,0)),f.x),f.y),
          mix(mix(hash3f(i+vec3(0,0,1)),hash3f(i+vec3(1,0,1)),f.x),
              mix(hash3f(i+vec3(0,1,1)),hash3f(i+vec3(1,1,1)),f.x),f.y),f.z);
      }
      float fbm(vec3 p, int oct){
        float v=0.0, a=0.5;
        for(int i=0;i<6;i++){
          if(i>=oct) break;
          v += a*noise3f(p); p *= 2.1; a *= 0.5;
        }
        return v;
      }

      void main(){
        vec3 n    = normalize(vNormal);
        vec3 view = normalize(vViewDir);

        // Surface noise — unique per asteroid via seed offset
        vec3 sp   = vPos * 3.5 + vec3(seed * 31.7, seed * 13.3, seed * 27.9);
        float n1  = fbm(sp, 5);
        float n2  = fbm(sp * 2.3 + 4.1, 4);
        float n3  = fbm(sp * 6.0 + 8.7, 3);  // fine detail / micro-texture

        // Crater-like darkening: local depressions
        float craterA = smoothstep(0.62, 0.55, n1) * smoothstep(0.40, 0.50, n2);
        float craterB = smoothstep(0.70, 0.60, fbm(sp*1.7+2.3, 4));
        float craterMask = max(craterA, craterB);

        // ── Asteroid type palettes ──
        // C-type: dark carbonaceous (most common, very dark grey-brown)
        vec3 cBase   = vec3(0.10, 0.09, 0.08);
        vec3 cMid    = vec3(0.18, 0.16, 0.13);
        vec3 cLight  = vec3(0.26, 0.23, 0.19);

        // S-type: stony silicate (medium grey with warm olive tint)
        vec3 sBase   = vec3(0.22, 0.19, 0.14);
        vec3 sMid    = vec3(0.38, 0.33, 0.24);
        vec3 sLight  = vec3(0.52, 0.46, 0.34);

        // M-type: metallic (cool grey, slight blue sheen, more specular)
        vec3 mBase   = vec3(0.20, 0.21, 0.23);
        vec3 mMid    = vec3(0.35, 0.36, 0.40);
        vec3 mLight  = vec3(0.55, 0.57, 0.62);

        // Pick palette by typeIndex
        vec3 baseCol, midCol, lightCol;
        float metallic, roughness;

        if(typeIndex < 0.5){
          // C-type
          baseCol  = cBase;  midCol  = cMid;  lightCol  = cLight;
          metallic = 0.02;   roughness = 0.95;
        } else if(typeIndex < 1.5){
          // S-type
          baseCol  = sBase;  midCol  = sMid;  lightCol  = sLight;
          metallic = 0.08;   roughness = 0.88;
        } else {
          // M-type
          baseCol  = mBase;  midCol  = mMid;  lightCol  = mLight;
          metallic = 0.55;   roughness = 0.55;
        }

        // Build surface albedo
        vec3 col = baseCol;
        col = mix(col, midCol,   smoothstep(0.35, 0.58, n1));
        col = mix(col, lightCol, smoothstep(0.58, 0.80, n1));
        // Fine texture overlay
        col = mix(col, col*0.80, n3 * 0.4);
        // Crater darkening
        col = mix(col, baseCol * 0.45, craterMask * 0.75);
        // Subtle colour streak / mineral vein
        float vein = smoothstep(0.72, 0.76, n2) * (1.0 - craterMask);
        col = mix(col, lightCol * 1.3, vein * 0.35);

        // ── Lighting ──
        float NdotL = max(dot(n, sunDir), 0.0);

        // Strong ambient scatter (space has no atmosphere but secondary light from belt)
        float ambient = 0.12 + seed * 0.04;
        float diffuse = NdotL * (1.0 - ambient);

        vec3 lit = col * (ambient + diffuse);

        // Specular — Blinn-Phong, stronger for M-type
        vec3  h    = normalize(sunDir + view);
        float NdotH = max(dot(n, h), 0.0);
        float shininess = mix(8.0, 80.0, metallic);
        float spec = pow(NdotH, shininess) * NdotL * mix(0.04, 0.55, metallic);
        vec3 specCol = mix(vec3(0.9, 0.85, 0.75), vec3(0.85, 0.87, 0.92), metallic);
        lit += specCol * spec;

        // Terminator — sharpen the day/night boundary slightly
        float terminator = smoothstep(0.0, 0.15, NdotL);
        lit *= mix(0.55, 1.0, terminator);

        // Very subtle rim from scattered belt light
        float rim = pow(1.0 - max(dot(view, n), 0.0), 4.0);
        lit += col * rim * 0.06;

        gl_FragColor = vec4(lit, 1.0);
      }
    `,
  }), [])

  return (
    <group ref={groupRef}>
      {asteroids.map((a, i) => {
        // Clone material and set per-instance uniforms
        const instanceMat = mat.clone()
        instanceMat.uniforms.seed.value      = a.seed
        instanceMat.uniforms.typeIndex.value = a.typeIndex
        return (
          <mesh
            key={i}
            ref={el => { if (el) meshRefs.current[i] = el }}
            position={[a.x, a.y, a.z]}
            scale={a.scale}
            geometry={geos[i % geos.length]}
            material={instanceMat}
          />
        )
      })}
    </group>
  )
}



// ─── Sun ──────────────────────────────────────────────────────────────────────
export function Sun() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const atmosphereRef = useRef<THREE.Mesh>(null!)

  // ─── 1. Surface Shader (Bright Yellow Star) ──────────────────────────
  const sunMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          // Bright Yellow Palette
          uColorLow: { value: new THREE.Color('#ff9900') },  // Edge: Deep Orange/Gold
          uColorMid: { value: new THREE.Color('#ffdd00') },  // Main: Bright Yellow
          uColorHigh: { value: new THREE.Color('#ffffff') }, // Core: Pure White
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vPosition;
          
          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 uColorLow;
          uniform vec3 uColorMid;
          uniform vec3 uColorHigh;

          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vPosition;

          // ─ Noise Functions ─
          vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
          vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

          float snoise(vec3 v) {
            const vec2  C = vec2(1.0/6.0, 1.0/3.0);
            const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i  = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod289(i);
            vec4 p = permute(permute(permute( 
                     i.z + vec4(0.0, i1.z, i2.z, 1.0))
                   + i.y + vec4(0.0, i1.y, i2.y, 1.0)) 
                   + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            float n_ = 1.0/7.0;
            vec3  ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);
            vec4 x = x_ * ns.x + ns.yyyy;
            vec4 y = y_ * ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
            p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            return 42.0 * dot(m*m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
          }

          void main() {
            // Animation speed
            float t = time * 0.15;
            
            // Generate two layers of noise for turbulent surface
            float noise1 = snoise(vPosition * 1.5 + vec3(t));
            float noise2 = snoise(vPosition * 3.5 - vec3(t * 1.5));
            
            // Combine noise (approx range -1.0 to 1.0)
            float n = noise1 * 0.6 + noise2 * 0.4;
            
            // Map [-1, 1] to [0, 1] for mixing
            float intensity = n * 0.5 + 0.5;
            
            // 1. Base mix: Orange -> Yellow
            vec3 color = mix(uColorLow, uColorMid, smoothstep(0.0, 0.5, intensity));
            
            // 2. Highlights: Yellow -> White hotspots
            color = mix(color, uColorHigh, smoothstep(0.55, 1.0, intensity));
            
            // 3. Fresnel Limb Darkening
            // Makes the center brighter and the edges darker/oranger
            vec3 viewDir = normalize(cameraPosition - vPosition); // Simplified viewDir
            float fresnel = dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)); // Assume mostly Z-facing for basic Fresnel
            // Better 3D fresnel:
            // float fresnel = dot(normalize(vNormal), normalize(cameraPosition - (modelMatrix * vec4(vPosition,1.0)).xyz));
            
            // Subtle edge darkening
            color *= mix(1.0, 0.85, pow(1.0 - abs(dot(vNormal, vec3(0,0,1))), 2.0));

            gl_FragColor = vec4(color, 1.0);
          }
        `,
      }),
    []
  )

  // ─── 2. Atmosphere Shader (Bright Golden Halo) ───────────────────────
  const atmosphereMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color('#ffdd00') }, // Golden Yellow
          uIntensity: { value: 0.7 },
        },
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform vec3 uColor;
          uniform float uIntensity;

          void main() {
            // Glow calc based on view angle from behind
            float glow = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
            gl_FragColor = vec4(uColor, glow * uIntensity);
          }
        `,
      }),
    []
  )

  useFrame(({ clock }) => {
    sunMaterial.uniforms.time.value = clock.getElapsedTime()
    // Optional: Slow rotation for realism
    if (meshRef.current) meshRef.current.rotation.y = clock.getElapsedTime() * 0.02
  })

  // Size and Position settings
  const radius = 7 // Significantly bigger
  const position: [number, number, number] = [28, 4, -20] // Far right, slightly up

  return (
    <group position={position}>
      {/* Core Sun */}
      <mesh ref={meshRef} material={sunMaterial}>
        <sphereGeometry args={[radius, 64, 64]} />
      </mesh>
      
      {/* Outer Glow (Atmosphere) */}
      <mesh ref={atmosphereRef} material={atmosphereMaterial} scale={[1.25, 1.25, 1.25]}>
        <sphereGeometry args={[radius, 64, 64]} />
      </mesh>

      {/* Lights - Very bright to match the visual */}
      <pointLight color="#ffffff" intensity={5.0} distance={200} decay={1.5} />
      <pointLight color="#ffcc00" intensity={2.0} distance={100} decay={2} />
    </group>
  )
}


// ─── Star Field ───────────────────────────────────────────────────────────────
function Stars() {
  const ref = useRef<THREE.Points>(null!)
  const count = 6000

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 60 + Math.random() * 80
      pos[i * 3] = Math.sin(phi) * Math.cos(theta) * r
      pos[i * 3 + 1] = Math.cos(phi) * r
      pos[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * r
      sz[i] = Math.random()
    }
    return { positions: pos, sizes: sz }
  }, [])

  const starsMat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 } },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      attribute float size;
      uniform float time;
      varying float vSize;
      void main() {
        vSize = size;
        float twinkle = 0.7 + 0.3 * sin(time * 2.0 + size * 100.0);
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * 3.5 * twinkle * (300.0 / -mvPos.z);
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      varying float vSize;
      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv);
        if (d > 0.5) discard;
        float alpha = 1.0 - smoothstep(0.1, 0.5, d);
        // Star color variation
        vec3 col = mix(vec3(0.7, 0.8, 1.0), vec3(1.0, 0.92, 0.7), vSize);
        col = mix(col, vec3(1.0, 0.5, 0.4), step(0.9, vSize));
        gl_FragColor = vec4(col, alpha * 0.9);
      }
    `,
  }), [])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    return g
  }, [positions, sizes])

  useFrame(({ clock }) => {
    starsMat.uniforms.time.value = clock.getElapsedTime()
    ref.current.rotation.y = clock.getElapsedTime() * 0.001
  })

  return <points ref={ref} geometry={geo} material={starsMat} />
}

// ─── Space Dust / Nebula ──────────────────────────────────────────────────────
function CosmicDust() {
  const ref = useRef<THREE.Mesh>(null!)

  const mat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 } },
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader: `
      uniform float time; varying vec2 vUv;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
      float fbm(vec2 p){float v=0.0;float a=0.5;for(int i=0;i<5;i++){v+=a*noise(p);p*=2.1;a*=0.5;}return v;}
      void main(){
        vec2 uv = vUv * 3.0;
        float n = fbm(uv + vec2(time * 0.01, time * 0.007));
        float n2 = fbm(uv * 1.5 - vec2(time * 0.008, 0.0) + 4.0);
        
        vec3 col1 = vec3(0.05, 0.1, 0.5);   // deep blue
        vec3 col2 = vec3(0.4, 0.05, 0.6);   // purple
        vec3 col3 = vec3(0.0, 0.3, 0.4);    // teal
        
        vec3 col = mix(col1, col2, n);
        col = mix(col, col3, n2 * 0.5);
        
        float alpha = n * 0.06 * smoothstep(0.0, 0.3, n);
        alpha *= (1.0 - smoothstep(0.35, 0.5, length(vUv - 0.5)));
        
        gl_FragColor = vec4(col, alpha);
      }
    `,
  }), [])

  useFrame(({ clock }) => {
    mat.uniforms.time.value = clock.getElapsedTime()
  })

  return (
    <mesh ref={ref} rotation={[-Math.PI / 3, 0.2, 0.5]}>
      <planeGeometry args={[80, 80, 1, 1]} />
      <primitive object={mat} attach="material" />
    </mesh>
  )
}

// ─── Shooting Stars ───────────────────────────────────────────────────────────
function ShootingStars() {
  const count = 14
  const groupRefs = useRef<(THREE.Group | null)[]>(Array(count).fill(null))

  // Fixed shared direction (normalized)
  const DIR = new THREE.Vector3(1.2, -0.6, 0.0).normalize()

  const meteors = useMemo(() => {
    const dir = new THREE.Vector3(1.2, -0.6, 0.0).normalize()

    return Array.from({ length: count }, (_, i) => {
      // Start positions spread in a band perpendicular to travel direction
      // so all meteors are truly parallel and cover the screen nicely
      const startX = -10 - Math.random() * 2
      const startY =   3 + (Math.random() - 0.5) * 6
      const startZ =  -5 + Math.random() * 10

      const start = new THREE.Vector3(startX, startY, startZ)

      // ── Closest approach to planet (origin) ──────────────────────────
      // For ray: P(t) = start + dir * t
      // Closest point to origin is at t = -dot(start, dir)
      // This is exact 3D math — no assumptions about axes
      const tClosest = -start.dot(dir)

      // The actual closest position to planet centre
      const closest  = start.clone().addScaledVector(dir, tClosest)
      const minDist  = closest.length()   // true 3D closest distance to origin

      // ── Travel time ──────────────────────────────────────────────────
      // We want the meteor to travel until it either:
      //   a) reaches closest approach to planet (tClosest), OR
      //   b) travels far enough past the planet to be off screen
      // Add a buffer so it always reaches + passes the planet
      const tEnd = tClosest + Math.max(2.5, PLANET_RADIUS * 1.5)

      // Speed: slow and consistent
      const speed = 0.55 + Math.random() * 0.15

      // Period must be long enough to complete full journey at this speed
      // plus a short invisible reset window (0.8s)
      const travelDuration = tEnd / speed
      const period         = travelDuration + 0.8

      return {
        startX, startY, startZ,
        dirX: dir.x,
        dirY: dir.y,
        dirZ: dir.z,
        speed,
        period,
        tEnd,          // local-time when meteor reaches end of journey
        tClosest,      // local-time of closest approach to planet
        minDist,       // closest distance to planet centre in 3D
        offset: (i / count) * period * 1.1 + Math.random() * 2,
        tailLength: 3.0 + Math.random() * 2.0,
        brightness: 0.85 + Math.random() * 0.15,
      }
    })
  }, [])

  // ── Tail geometry ──────────────────────────────────────────────────────────
  const tailGeos = useMemo(() =>
    meteors.map(m => {
      const len   = m.tailLength
      const segs  = 48
      const halfW = 0.038

      const verts:   number[] = []
      const uvs:     number[] = []
      const alongs:  number[] = []
      const indices: number[] = []

      for (let s = 0; s <= segs; s++) {
        const tt = s / segs
        const x  = -tt * len
        const w  = halfW * (1.0 - tt * 0.90)

        verts.push(x,  w, 0)
        verts.push(x, -w, 0)
        uvs.push(0.0, tt)
        uvs.push(1.0, tt)
        alongs.push(tt, tt)

        if (s < segs) {
          const b = s * 2
          indices.push(b, b + 1, b + 2, b + 1, b + 3, b + 2)
        }
      }

      const g = new THREE.BufferGeometry()
      g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts),  3))
      g.setAttribute('uv',       new THREE.BufferAttribute(new Float32Array(uvs),    2))
      g.setAttribute('along',    new THREE.BufferAttribute(new Float32Array(alongs), 1))
      g.setIndex(indices)
      return g
    }), [meteors]
  )

  // ── Tail material ──────────────────────────────────────────────────────────
  const tailMats = useMemo(() =>
    meteors.map(m => new THREE.ShaderMaterial({
      uniforms: {
        opacity:    { value: 0.0 },
        brightness: { value: m.brightness },
      },
      transparent: true,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
      side:        THREE.DoubleSide,
      vertexShader: `
        attribute float along;
        varying float vAlong;
        varying vec2  vUv2;
        void main() {
          vAlong = along;
          vUv2   = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float opacity;
        uniform float brightness;
        varying float vAlong;
        varying vec2  vUv2;
        void main() {
          // across: 0 at ribbon edges, 1 at centre
          float across = 1.0 - abs(vUv2.x - 0.5) * 2.0;
          across = pow(across, 1.6);

          // along: 1 at head, 0 at tail tip
          float fade = pow(1.0 - vAlong, 1.2);

          vec3 coreCol = vec3(0.95, 0.97, 1.00);
          vec3 edgeCol = vec3(0.40, 0.55, 1.00);
          vec3 tailCol = vec3(0.15, 0.25, 0.85);

          vec3 col = mix(edgeCol, coreCol, pow(across, 0.5));
          col      = mix(tailCol, col, fade * 0.85 + 0.15);

          float alpha = fade * across * opacity * brightness;
          // Bright spike right at the head
          alpha += pow(fade, 8.0) * across * opacity * 1.6;

          gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
        }
      `,
    })), [meteors]
  )

  // ── Head / glow material ───────────────────────────────────────────────────
  const headMats = useMemo(() =>
    meteors.map(m => new THREE.ShaderMaterial({
      uniforms: {
        opacity:    { value: 0.0 },
        brightness: { value: m.brightness },
      },
      transparent: true,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          vNormal  = normalize(normalMatrix * normal);
          vViewDir = normalize(cameraPosition - (modelMatrix * vec4(position, 1.0)).xyz);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float opacity;
        uniform float brightness;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          float rim  = 1.0 - max(dot(vNormal, vViewDir), 0.0);
          float core = pow(max(dot(vNormal, vViewDir), 0.0), 0.5);
          vec3  col  = mix(vec3(0.5, 0.65, 1.0), vec3(1.0, 1.0, 1.0), core);
          float alpha = (pow(rim, 1.2) * 0.8 + core * 1.2) * opacity * brightness;
          gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
        }
      `,
    })), [meteors]
  )

  // One shared quaternion — all meteors rotate identically (parallel)
  const sharedQuaternion = useMemo(() => {
    const dir   = new THREE.Vector3(1.2, -0.6, 0.0).normalize()
    const xAxis = new THREE.Vector3(1, 0, 0)
    return new THREE.Quaternion().setFromUnitVectors(xAxis, dir)
  }, [])

  // Reusable vec3 for position calculation (avoid GC)
  const posVec = useMemo(() => new THREE.Vector3(), [])

  useFrame(({ clock }) => {
    meteors.forEach((m, i) => {
      const group = groupRefs.current[i]
      if (!group) return

      const elapsed = clock.getElapsedTime()
      // local time within this meteor's period
      const t = (elapsed * m.speed + m.offset) % m.period

      // ── Position ────────────────────────────────────────────────────
      posVec.set(
        m.startX + m.dirX * t,
        m.startY + m.dirY * t,
        m.startZ + m.dirZ * t,
      )
      group.position.copy(posVec)
      group.quaternion.copy(sharedQuaternion)

      // ── Opacity ─────────────────────────────────────────────────────
      let op = 0.0

      // Only animate during the travel window (not the reset gap)
      const inTravelWindow = t <= m.tEnd

      if (inTravelWindow) {
        // 1. Fade IN: quick ramp over first 0.3s of local time
        const fadeIn = Math.min(t / 0.3, 1.0)

        // 2. Fade OUT near planet:
        //    Use the ACTUAL 3D distance from current position to origin
        const dist = posVec.length()

        //    Fade starts when meteor is within reach of planet atmosphere,
        //    but ONLY if it actually gets close (minDist < threshold).
        //    This prevents early fade for meteors that pass far from planet.
        let fadeOut = 1.0
        if (m.minDist < PLANET_RADIUS * 3.0) {
          // This meteor passes near the planet — fade as it approaches surface
          const fadeStartDist = PLANET_RADIUS * 2.8
          const fadeEndDist   = PLANET_RADIUS * 0.85

          if (dist < fadeStartDist) {
            fadeOut = Math.max(0.0,
              (dist - fadeEndDist) / (fadeStartDist - fadeEndDist)
            )
          }
        } else {
          // Meteor passes far from planet — fade out near end of journey
          const fadeOutStart = m.tEnd - 0.5
          if (t > fadeOutStart) {
            fadeOut = Math.max(0.0, 1.0 - (t - fadeOutStart) / 0.5)
          }
        }

        op = fadeIn * fadeOut
      }
      // else: reset gap — op stays 0.0, meteor is invisible while repositioning

      tailMats[i].uniforms.opacity.value = op
      headMats[i].uniforms.opacity.value  = op
    })
  })

  return (
    <>
      {meteors.map((_, i) => (
        <group key={i} ref={el => { groupRefs.current[i] = el }}>
          <mesh geometry={tailGeos[i]}>
            <primitive object={tailMats[i]} attach="material" />
          </mesh>

          <mesh>
            <sphereGeometry args={[0.06, 16, 16]} />
            <primitive object={headMats[i]} attach="material" />
          </mesh>

          <mesh scale={0.4}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <primitive object={headMats[i]} attach="material" />
          </mesh>
        </group>
      ))}
    </>
  )
}

// Put this constant outside the component
const PLANET_RADIUS = 1.8






// ─── Camera Rig ───────────────────────────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const smooth = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(({ clock }) => {
    smooth.current.x += (mouse.current.x * 1.5 - smooth.current.x) * 0.03
    smooth.current.y += (mouse.current.y * 0.8 - smooth.current.y) * 0.03
    const t = clock.getElapsedTime()
    camera.position.x = smooth.current.x + Math.sin(t * 0.04) * 0.3
    camera.position.y = smooth.current.y + 0.5 + Math.cos(t * 0.03) * 0.2
    camera.position.z = 7 + Math.sin(t * 0.025) * 0.4
    camera.lookAt(0, 0, 0)
  })

  return null
}

interface SceneProps {
  activeSlide: number
}


function PlanetSystem({ activeSlide }: { activeSlide: number }) {
  const groupRef = useRef<THREE.Group>(null!)
  const exitProgress = useRef(0)

  useFrame((_, delta) => {
    const target = activeSlide === 0 ? 0 : 1
    // Smooth lerp toward target (0 = visible, 1 = exited)
    exitProgress.current += (target - exitProgress.current) * delta * 2.5

    const p = exitProgress.current
    if (groupRef.current) {
      // Drift left and shrink as it exits
      groupRef.current.position.x = -p * 6
      groupRef.current.position.y = p * 1.5
      groupRef.current.scale.setScalar(1 - p * 0.6)
      groupRef.current.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m: any) => { if (m.transparent) m.opacity = 1 - p })
          } else {
            const m = mesh.material as any
            if (m.transparent) m.opacity = 1 - p
          }
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      <AlienPlanet />
      <AsteroidBelt />
    </group>
  )
}

// ─── Scene ────────────────────────────────────────────────────────────────────
interface SceneProps {
  activeSlide: number
  phase: 'loading' | 'intro' | 'main'
}

export default function Scene({ activeSlide, phase }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 7], fov: 52 }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      style={{ background: 'transparent' }}
    >
      <CameraRig />
      <CosmicDust />
      <Stars />

      {/* Sun always visible */}
      <Sun />

      {/* Planet system always visible in main phase — animates to background on other slides */}
      {phase === 'main' && (
  <>
    <PlanetSystem activeSlide={activeSlide} />
    {activeSlide === 0 && <Moon />}
    {activeSlide === 0 && <ShootingStars />}
  </>
)}


      <fog attach="fog" args={['#00010f', 30, 120]} />
    </Canvas>
  )
}


