export default function Loader({
  className = "",
  size = "40px",
  color = "#5D5FEF",
}: {
  className?: string;
  size?: string;
  color?: string;
}) {
  return (
    <div className={`flex items-center justify-center ${className} animate-spin`}>
      <div className={`w-[${size}] h-[${size}]`}>
        <div className="relative w-full h-full">
          {/* Outer ring */}
          <div 
            className="absolute inset-0 rounded-full border-2"
            style={{
              borderColor: `${color}33`, // 20% opacity
              animation: 'spin-slow 1.5s linear infinite',
            }}
          />
          
          {/* Inner dots */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: color,
                  transform: `rotate(${i * 90}deg) translateY(-10px)`,
                  animationDelay: `${i * 0.15}s`,
                  opacity: 0.7,
                }}
              >
                <div 
                  className="w-full h-full rounded-full"
                  style={{
                    backgroundColor: color,
                    animation: 'pulse 1.5s ease-in-out infinite',
                  }}
                />
              </div>
            ))}
          </div>
          
          {/* Center circle */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              borderColor: `${color}33`, // 20% opacity
              borderWidth: '1px',
            }}
          />
        </div>
      </div>
    </div>
  );
}