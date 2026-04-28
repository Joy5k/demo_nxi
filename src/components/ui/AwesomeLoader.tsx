import { useState, useEffect } from "react";

const AwesomeLoader = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 10) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <svg
        className={`w-12 h-12 rotate-${rotation} transition-transform duration-50`}
        viewBox="0 0 50 50"
        aria-label="Loading"
        role="img"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
          stroke="url(#loaderGradient)"
          strokeDasharray="125.6"
          strokeDashoffset="0"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
        <defs>
          <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5D5FEF" />
            <stop offset="100%" stopColor="#8A8AF0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default AwesomeLoader;