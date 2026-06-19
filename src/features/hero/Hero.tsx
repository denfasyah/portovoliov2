"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function HeroPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vertSrc = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragSrc = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i = floor(v + dot(v, C.yyy));
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
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        float t = u_time * 0.18;
        float n1 = snoise(vec3(uv * 2.2, t));
        float n2 = snoise(vec3(uv * 1.6 + 1.3, t * 0.7));
        float n3 = snoise(vec3(uv * 3.0 - 0.8, t * 1.2));
        float fluid = n1 * 0.55 + n2 * 0.3 + n3 * 0.15;
        fluid = fluid * 0.5 + 0.5;
        float dark = 0.0;
        float light = fluid * fluid * 0.78;
        float bright = smoothstep(0.62, 0.9, fluid) * 0.85;
        float val = mix(dark, light, fluid) + bright * 0.25;
        vec3 col = vec3(val * 0.97, val * 0.97, val);
        vec2 vUv = uv - 0.5;
        float vign = 1.0 - dot(vUv, vUv) * 2.2;
        vign = clamp(vign, 0.0, 1.0);
        col *= vign;
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function compileShader(type: number, src: string): WebGLShader {
      const s = gl!.createShader(type) as WebGLShader;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }

    const prog = gl.createProgram() as WebGLProgram;
    gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, vertSrc));
    gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, fragSrc));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");

    let animId: number;
    const startTime = performance.now();

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }

    function render() {
      const t = (performance.now() - startTime) / 1000;
      gl!.uniform1f(uTime, t);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    }

    resize();
    window.addEventListener("resize", resize);
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div id="home" className="bg-black min-h-screen relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-10 md:pt-18">
        {/* Active to work badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-3 text-[0.78rem] text-white/75 tracking-[0.04em]"
        >
          <span className="w-[7px] h-[7px] bg-green-500 rounded-full relative">
            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping" />
          </span>
          Active to work
        </motion.div>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="mb-6 text-[0.8rem] font-semibold text-white/50 uppercase tracking-[0.22em]"
        >
          Full Stack Developer
        </motion.p>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="flex flex-col items-center my-3 w-full"
        >
          {/* Mobile: 3 separate stacked words */}
          <div className="md:hidden flex flex-col items-center">
            {["ADENT", "FALLAH", "AMORISYAH"].map((word) => (
              <h1
                key={word}
                className="font-bold text-white text-6xl uppercase leading-none tracking-tighter"
                style={{
                  fontFamily: "var(--font-mona)",
                  transform: "scaleY(1.2)",
                  display: "block",
                  lineHeight: 1,
                  marginBottom: "0.05em",
                }}
              >
                {word}
              </h1>
            ))}
          </div>

          {/* Desktop: 2 lines */}
          <div className="hidden md:flex flex-col text-9xl items-center">
            {["ADENT FALLAH", "AMORISYAH"].map((line, i) => (
              <h1
                key={line}
                className="font-bold text-white uppercase tracking-tighter"
                style={{
                  fontFamily: "var(--font-mona)",
                  lineHeight: 0.9,
                  transform: "scaleY(1.25)",
                  display: "block",
                  marginTop: i === 1 ? "0.12em" : 0,
                }}
              >
                {line}
              </h1>
            ))}
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          className="mt-7 max-w-md text-sm md:text-md text-white/55 tracking-[0.02em] leading-relaxed"
        >
          Crafting performant, pixel-perfect digital experiences — from backend
          architecture to polished user interfaces.
        </motion.p>

        {/* CTA Buttons — styled like the reference image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="mt-9 flex items-center gap-4"
        >
          <a
            href="#portfolio"
            className="group relative flex items-center gap-3 border border-white/40 px-7 py-4 text-[0.72rem] font-semibold text-white uppercase tracking-[0.14em] transition-all duration-200 hover:border-white/80 hover:bg-white/5"
            style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
          >
            {/* corner notches */}
            <span className="pointer-events-none absolute top-0 left-0 w-2 h-px bg-white/30" />
            <span className="pointer-events-none absolute top-0 left-0 h-2 w-px bg-white/30" />
            <span className="pointer-events-none absolute bottom-0 right-0 w-2 h-px bg-white/30" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-2 w-px bg-white/30" />
            Portofolio
            <svg
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 11L11 1M11 1H4M11 1V8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <a
            href="#contact"
            className="group relative flex items-center gap-3 border border-white/40 px-7 py-4 text-[0.72rem] font-semibold text-white uppercase tracking-[0.14em] transition-all duration-200 hover:border-white/80 hover:bg-white/5"
            style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
          >
            <span className="pointer-events-none absolute top-0 left-0 w-2 h-px bg-white/30" />
            <span className="pointer-events-none absolute top-0 left-0 h-2 w-px bg-white/30" />
            <span className="pointer-events-none absolute bottom-0 right-0 w-2 h-px bg-white/30" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-2 w-px bg-white/30" />
            Get in Touch
            <svg
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 11L11 1M11 1H4M11 1V8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>

        {/* Scroll hint */}
        {/* <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[0.6rem] text-white/40 uppercase tracking-[0.18em]">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
        </div> */}
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
    </div>
  );
}