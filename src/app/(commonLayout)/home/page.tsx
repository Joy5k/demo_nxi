"use client";

import { useEffect } from "react";
import { cubicBezier, motion, useMotionValue, useMotionTemplate, animate, Variants } from "framer-motion";

const MissionHero = () => {
  const bgPos1X = useMotionValue(30);
  const bgPos1Y = useMotionValue(30);
  const bgPos2X = useMotionValue(70);
  const bgPos2Y = useMotionValue(60);
  const bgPos3X = useMotionValue(50);
  const bgPos3Y = useMotionValue(50);
  const bgPos4X = useMotionValue(20);
  const bgPos4Y = useMotionValue(70);
  const bgPos5X = useMotionValue(80);
  const bgPos5Y = useMotionValue(20);

  const animatedBackground = useMotionTemplate`radial-gradient(ellipse at ${bgPos1X}% ${bgPos1Y}%, rgb(153,200,255) 0%, transparent 40%), radial-gradient(ellipse at ${bgPos2X}% ${bgPos2Y}%, rgba(148,219,254,0.85) 0%, transparent 40%), radial-gradient(ellipse at ${bgPos3X}% ${bgPos3Y}%, rgba(212,206,246,0.8) 0%, transparent 45%), radial-gradient(ellipse at ${bgPos4X}% ${bgPos4Y}%, rgb(179,232,252) 0%, transparent 40%), radial-gradient(ellipse at ${bgPos5X}% ${bgPos5Y}%, rgb(147,215,254) 0%, transparent 40%), linear-gradient(135deg, #c8e8f8 0%, #d4ecfa 40%, #cce5f7 70%, #c4e0f5 100%)`;

  useEffect(() => {
    // ~3-4x faster than original (18-22s → 4.5-7s)
    animate(bgPos1X, [10, 80, 20, 60, 10], { duration: 5,   ease: "easeInOut", repeat: Infinity });
    animate(bgPos1Y, [30, 20, 40, 30],      { duration: 5,   ease: "easeInOut", repeat: Infinity });
    animate(bgPos2X, [70, 55, 75, 70],      { duration: 6,   ease: "easeInOut", repeat: Infinity });
    animate(bgPos2Y, [60, 75, 50, 60],      { duration: 6,   ease: "easeInOut", repeat: Infinity });
    animate(bgPos3X, [50, 65, 40, 50],      { duration: 4.5, ease: "easeInOut", repeat: Infinity });
    animate(bgPos3Y, [50, 35, 60, 50],      { duration: 4.5, ease: "easeInOut", repeat: Infinity });
    animate(bgPos4X, [20, 35, 15, 20],      { duration: 7,   ease: "easeInOut", repeat: Infinity });
    animate(bgPos4Y, [70, 55, 80, 70],      { duration: 7,   ease: "easeInOut", repeat: Infinity });
    animate(bgPos5X, [80, 65, 85, 80],      { duration: 5.5, ease: "easeInOut", repeat: Infinity });
    animate(bgPos5Y, [20, 35, 15, 20],      { duration: 5.5, ease: "easeInOut", repeat: Infinity });
  }, [bgPos1X, bgPos1Y, bgPos2X, bgPos2Y, bgPos3X, bgPos3Y, bgPos4X, bgPos4Y, bgPos5X, bgPos5Y]);

  const cards = [
    { icon: "🌍", label: "Global impact", delay: 0 },
    { icon: "🤝", label: "Great culture", delay: 1.3 },
    { icon: "🚀", label: "Fast growth", delay: 2.6 },
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: cubicBezier(0.4, 0, 0.2, 1) },
    },
  };

  return (
    <motion.section
      className="relative w-full h-screen overflow-hidden flex items-center justify-center font-sans"
      style={{ background: animatedBackground }}
    >
      {/* Edge & corner fills — prevent dark bleed */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[35%] h-full blur-[90px]"
          style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(179,222,252,0.95) 0%, rgba(196,229,252,0.5) 55%, transparent 80%)" }} />
        <div className="absolute top-0 right-0 w-[35%] h-full blur-[90px]"
          style={{ background: "radial-gradient(ellipse at 100% 50%, rgba(200,230,255,0.95) 0%, rgba(210,232,252,0.5) 55%, transparent 80%)" }} />
        <div className="absolute -top-10 -left-10 w-[40%] h-[60%] rounded-full blur-[80px]"
          style={{ background: "radial-gradient(circle, rgba(180,218,252,0.85) 0%, transparent 70%)" }} />
        <div className="absolute -top-10 -right-10 w-[40%] h-[60%] rounded-full blur-[80px]"
          style={{ background: "radial-gradient(circle, rgba(195,225,252,0.85) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-10 -left-10 w-[40%] h-[60%] rounded-full blur-[80px]"
          style={{ background: "radial-gradient(circle, rgba(175,218,239,0.95) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-10 -right-10 w-[40%] h-[60%] rounded-full blur-[80px]"
          style={{ background: "radial-gradient(circle, rgba(185,222,245,0.95) 0%, transparent 70%)" }} />

        {/* Animated orbs — sped up to match gradient (4-6s) */}
        <motion.div
          className="absolute top-[10%] left-[10%] w-[60%] h-[60%] rounded-full blur-[80px]"
          style={{ background: "radial-gradient(circle, rgba(99,179,255,0.9) 0%, rgba(148,210,255,0.5) 40%, transparent 70%)" }}
          animate={{ x: [0, 160, -80, 60, 0], y: [0, -80, 60, -40, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[20%] right-[5%] w-[55%] h-[55%] rounded-full blur-[90px]"
          style={{ background: "radial-gradient(circle, rgba(180,140,255,0.85) 0%, rgba(210,190,255,0.45) 40%, transparent 70%)" }}
          animate={{ x: [0, -120, 60, -40, 0], y: [0, 80, -60, 40, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[5%] left-[20%] w-[60%] h-[60%] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(56,195,255,0.85) 0%, rgba(100,220,255,0.4) 40%, transparent 70%)" }}
          animate={{ x: [0, 100, -60, 0], y: [0, -60, 40, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[40%] left-[35%] w-[50%] h-[50%] rounded-full blur-[110px] -translate-x-1/2 -translate-y-1/2"
          style={{ background: "radial-gradient(circle, rgba(200,180,255,0.7) 0%, rgba(220,210,255,0.3) 50%, transparent 70%)" }}
          animate={{ scale: [1, 1.25, 0.85, 1.1, 1], opacity: [0.7, 1, 0.6, 0.9, 0.7] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 w-full mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
  
        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-5xl font-semibold leading-[1.1] tracking-tight mb-4"
          style={{ color: "#1a2f4a" }}
        >
          Our team is working hard to make the{" "}<br />
          <span
            style={{
              backgroundImage: "linear-gradient(to right, #1193d2, #3e236a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            world a better place.
          </span>
        </motion.h1>


        {/* Join our journey */}
        <motion.p
          variants={fadeUp}
          className="text-lg font-semibold mb-5"
          style={{ color: "#1a2f4a" }}
        >
          Join our journey
        </motion.p>

        {/* CTA Button */}
        <motion.a
          variants={fadeUp}
          href="/careers"
          className="inline-flex items-center gap-2.5 px-8 py-3 rounded-full text-white text-[15px] font-semibold no-underline mb-8"
          style={{
            background: "linear-gradient(to right, #1193d2, #3e236a)",
            boxShadow: "0 8px 30px rgba(17,147,210,0.35)",
          }}
          whileHover={{ opacity: 0.88, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          Explore careers
          <span
            className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
            style={{ background: "rgba(255,255,255,0.22)" }}
          >
            ↗
          </span>
        </motion.a>

      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 w-full h-64 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(175,218,239,0.88) 0%, rgba(175,218,239,0.5) 40%, transparent 100%)" }}
      />
    </motion.section>
  );
};

export default MissionHero;