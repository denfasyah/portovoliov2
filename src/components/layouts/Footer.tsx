"use client";

import { useEffect, useRef } from "react";

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    // Shader program (menggunakan setup yang sama dengan Hero agar fluid)
    const vertSrc = `attribute vec2 a_position; void main() { gl_Position = vec4(a_position, 0.0, 1.0); }`;
    const fragSrc = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        float t = u_time * 0.1;
        // Efek fluid sederhana yang gelap untuk footer
        float val = sin(uv.x * 10.0 + t) * sin(uv.y * 10.0 + t) * 0.1;
        gl_FragColor = vec4(0.02 + val, 0.02 + val, 0.02 + val, 1.0);
      }
    `;

    // Boilerplate untuk compile shader
    function compileShader(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, vertSrc));
    gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, fragSrc));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");

    let animId: number;
    const render = (t: number) => {
      gl.uniform1f(uTime, t * 0.001);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    };

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
    render(0);

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 py-24 px-6 md:px-20 text-white overflow-hidden">
      {/* Canvas for Fluid Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
              Curious about what we <br />
              <span className="text-white/30">can create together?</span>
            </h2>
            <p className="text-white/40 text-sm max-w-sm">
              Let&apos;s bring something extraordinary to life! I&apos;m available for new collaborations.
            </p>
          </div>

          <a
            href="#contact"
            className="group relative flex items-center gap-3 border border-white/20 px-10 py-6 text-[0.7rem] font-bold uppercase tracking-[0.3em] transition-all hover:bg-white hover:text-black"
          >
            Book a Free Call
            <span className="text-[10px] opacity-50">↗</span>
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-8">
          <div className="text-[0.8rem] text-white/50 font-mono tracking-tight">
            denfasyah@gmail.com
          </div>
          
          <div className="flex gap-10 text-[0.65rem] uppercase tracking-[0.25em] text-white/40">
            <a href="#" className="hover:text-white transition-colors">Github</a>
            <a href="#" className="hover:text-white transition-colors">Linkedin</a>
            <a href="#" className="hover:text-white transition-colors">Whatsapp</a>
            <a href="#" className="hover:text-white transition-colors">Tiktok</a>
          </div>

          <div className="text-[0.65rem] text-white/20 uppercase tracking-[0.1em]">
            © 2026 Adent • Built with Next.js
          </div>
        </div>
      </div>
    </footer>
  );
}