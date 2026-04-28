'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCursorPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-black pt-5"
      style={{
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, rgba(255, 0, 150, 0.05) 25%, rgba(255, 0, 150, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 0, 150, 0.05) 75%, rgba(255, 0, 150, 0.05) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(255, 0, 150, 0.05) 25%, rgba(255, 0, 150, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 0, 150, 0.05) 75%, rgba(255, 0, 150, 0.05) 76%, transparent 77%, transparent)
        `,
        backgroundSize: '50px 50px',
      }}
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(0, 255, 200, 0.08) 25%, rgba(0, 255, 200, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 255, 200, 0.08) 75%, rgba(0, 255, 200, 0.08) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(0, 255, 200, 0.08) 25%, rgba(0, 255, 200, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 255, 200, 0.08) 75%, rgba(0, 255, 200, 0.08) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '100px 100px',
            animation: 'gridSlide 20s linear infinite',
          }}
        />
      </div>

      {/* Glow effect following cursor */}
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 200, 0.2) 0%, transparent 70%)',
          left: cursorPos.x - 192,
          top: cursorPos.y - 192,
          opacity: isHovering ? 0.6 : 0.2,
        }}
      />

      {/* Content */}
      <div className="relative z-20 w-full h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Animated corner decorations */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-cyan-400 animate-pulse opacity-60" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-cyan-400 animate-pulse opacity-60" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-pink-500 animate-pulse opacity-40" style={{ animationDelay: '0.25s' }} />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-pink-500 animate-pulse opacity-40" style={{ animationDelay: '0.75s' }} />

        <div className="max-w-5xl mx-auto text-center space-y-10">
          {/* Top label with glitch effect */}
          <div className="inline-block relative group mb-8">
            <div className="text-xs sm:text-sm tracking-widest uppercase font-mono text-cyan-400 opacity-80">
              ▪ System Online ▪
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 blur-lg group-hover:from-cyan-500/20 group-hover:via-cyan-500/50 group-hover:to-cyan-500/20 transition-all duration-500" />
          </div>

          {/* Main heading with glitch layers */}
          <div className="relative h-40 sm:h-48 lg:h-56 flex items-center justify-center">
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-pink-400 to-cyan-300 leading-none"
              style={{
                textShadow: '0 0 30px rgba(0, 255, 200, 0.5)',
                animation: 'flicker 4s infinite',
              }}
            >
              THE FUTURE
              <br />
              IS LOADING
            </h1>

            {/* Glitch effect elements */}
            <div
              className="absolute inset-0 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-wider opacity-80 pointer-events-none"
              style={{
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundImage: 'linear-gradient(90deg, #ff00ff, #00ffff)',
                animation: 'glitch1 2s infinite',
                clipPath: 'polygon(0 0, 100% 0, 100% 35%, 0 35%)',
              }}
            >
              THE FUTURE
              <br />
              IS LOADING
            </div>

            <div
              className="absolute inset-0 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-wider opacity-60 pointer-events-none"
              style={{
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundImage: 'linear-gradient(90deg, #00ffff, #ff00ff)',
                animation: 'glitch2 2s infinite',
                clipPath: 'polygon(0 65%, 100% 65%, 100% 100%, 0 100%)',
              }}
            >
              THE FUTURE
              <br />
              IS LOADING
            </div>
          </div>

          {/* Subheading with scanline effect */}
          <div
            className="text-base sm:text-lg text-gray-300 font-light tracking-wide max-w-3xl mx-auto relative"
            style={{
              animation: 'scanlines 8s linear infinite',
            }}
          >
            <p className="mb-2">
              We&apos;re building something revolutionary. Something that will
            </p>
            <p>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 font-semibold">
                redefine the industry
              </span>
              . Watch this space.
            </p>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-center gap-4 text-xs font-mono text-cyan-400 opacity-60 mt-8">
            <div className="w-2 h-2 bg-cyan-400 animate-pulse rounded-full" />
            <span>[ INITIALIZING LAUNCH SEQUENCE ]</span>
            <div className="w-2 h-2 bg-pink-500 animate-pulse rounded-full" style={{ animationDelay: '0.5s' }} />
          </div>

          {/* Loading bar */}
          <div className="relative w-48 sm:w-64 h-1 bg-gray-800 border border-cyan-400/50 rounded-full overflow-hidden mx-auto mt-6">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 rounded-full"
              style={{
                width: '65%',
                boxShadow: '0 0 20px rgba(0, 255, 200, 0.8)',
                animation: 'loading 3s ease-in-out infinite',
              }}
            />
          </div>

          {/* Careers Button with neon glow */}
          <div className="mt-12 relative group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            {/* Glow background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-500 rounded-lg" />

            <button
              className="relative px-8 sm:px-10 py-4 text-sm sm:text-base font-mono tracking-widest uppercase border-2 border-cyan-400 bg-black/80 backdrop-blur-sm text-cyan-400 group-hover:text-black group-hover:bg-cyan-400 transition-all duration-500 overflow-hidden rounded-lg"
              onClick={() => {
                window.location.href = '/careers';
              }}
            >
              {/* Animated border */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 via-pink-500/50 to-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Button text */}
              <span className="relative flex items-center justify-center gap-3">
                → EXPLORE CAREERS ←
              </span>

              {/* Shine effect */}
              <div className="absolute inset-0 overflow-hidden rounded-lg">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    animation: 'shine 0.6s ease-in-out forwards',
                  }}
                />
              </div>
            </button>
          </div>

          {/* Additional info text */}
          <div className="text-xs sm:text-sm text-gray-500 font-mono tracking-wider mt-8 opacity-60">
            <p> Preparing for launch in Q2 2024</p>
            <p> Stay tuned for updates</p>
          </div>
        </div>

        {/* Vertical scanner lines effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.5) 2px,
              rgba(255, 255, 255, 0.5) 4px
            )`,
            animation: 'scan 8s linear infinite',
          }}
        />
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes flicker {
          0%, 100% {
            text-shadow: 0 0 30px rgba(0, 255, 200, 0.5);
          }
          50% {
            text-shadow: 0 0 50px rgba(0, 255, 200, 0.8), 0 0 80px rgba(255, 0, 200, 0.4);
          }
        }

        @keyframes glitch1 {
          0% {
            clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
            transform: translateX(0);
          }
          20% {
            clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
            transform: translateX(-4px);
          }
          40% {
            clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
            transform: translateX(4px);
          }
          60% {
            clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
            transform: translateX(-2px);
          }
          80% {
            clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
            transform: translateX(2px);
          }
          100% {
            clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
            transform: translateX(0);
          }
        }

        @keyframes glitch2 {
          0% {
            clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
            transform: translateX(0);
          }
          20% {
            clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
            transform: translateX(4px);
          }
          40% {
            clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
            transform: translateX(-4px);
          }
          60% {
            clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
            transform: translateX(2px);
          }
          80% {
            clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
            transform: translateX(-2px);
          }
          100% {
            clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
            transform: translateX(0);
          }
        }

        @keyframes scanlines {
          0%, 100% {
            text-shadow: 0 0 10px rgba(0, 255, 200, 0.3);
          }
          50% {
            text-shadow: 0 0 20px rgba(0, 255, 200, 0.6), 0 2px 10px rgba(255, 0, 150, 0.3);
          }
        }

        @keyframes loading {
          0%, 100% {
            width: 0;
          }
          50% {
            width: 100%;
          }
        }

        @keyframes gridSlide {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100px);
          }
        }

        @keyframes scan {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(10px);
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        * {
          user-select: none;
        }

        html {
          scroll-behavior: smooth;
        }

        /* Custom cursor effect */
        body {
          cursor: crosshair;
        }

        button {
          cursor: pointer;
        }

        /* Text rendering for crisp look */
        h1 {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </div>
  );
}