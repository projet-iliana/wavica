interface LogoProps {
  className?: string;
  showTagline?: boolean;
  isLightMode?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "hero";
}

export function Logo({
  className = "",
  showTagline = true,
  isLightMode = false,
  size = "md",
}: LogoProps) {
  // Dimension profiles
  const dimensions = {
    sm: { w: 140, h: 42, textW: "w-36" },
    md: { w: 200, h: 60, textW: "w-52" },
    lg: { w: 280, h: 84, textW: "w-72" },
    xl: { w: 360, h: 108, textW: "w-96" },
    hero: { w: 460, h: 138, textW: "w-[440px]" },
  };

  const currentDim = dimensions[size] || dimensions.md;

  // Colors aligned exactly with the uploaded logo:
  // - Ribbon: Vibrant Blue (#0052FF / #0066FF) -> Bright Cyan (#00B4D8 / #00C8F8) -> Luminous Turquoise (#00E5C9 / #00D2B4)
  // - Dark letters: Deep Navy (#081226 / #0B1938) in light mode, or Glowing Slate/White with Cyan sheen in dark mode
  const letterColor = isLightMode ? "#0B1938" : "#FFFFFF";
  const letterSecondary = isLightMode ? "#0F2148" : "#E2E8F0";
  const taglineColor = isLightMode ? "#0B1938" : "#CBD5E1";
  const cyanDotColor = "#00E5C9";

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <svg
        width={currentDim.w}
        height={currentDim.h}
        viewBox="0 0 540 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        aria-label="WAVICA Logo - Your Health • Your Future"
      >
        <defs>
          {/* Main 3D Ribbon Gradient: Cobalt Blue to Electric Cyan to Turquoise */}
          <linearGradient id="ribbon-gradient-main" x1="0%" y1="60%" x2="100%" y2="20%">
            <stop offset="0%" stopColor="#0055FF" />
            <stop offset="25%" stopColor="#007BFF" />
            <stop offset="55%" stopColor="#00C4FF" />
            <stop offset="85%" stopColor="#00E5C9" />
            <stop offset="100%" stopColor="#00D2B4" />
          </linearGradient>

          {/* Ribbon Underbelly / Shadow Gradient for 3D depth */}
          <linearGradient id="ribbon-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0035A8" />
            <stop offset="50%" stopColor="#0052CC" />
            <stop offset="100%" stopColor="#0088CC" />
          </linearGradient>

          {/* Cyan Glow Filter for circular dots */}
          <filter id="cyan-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Letter gradient for subtle luxury depth */}
          <linearGradient id="letter-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isLightMode ? "#0B1938" : "#FFFFFF"} />
            <stop offset="100%" stopColor={isLightMode ? "#060E1F" : "#CBD5E1"} />
          </linearGradient>

          {/* Dot radial gradient to look like 3D illuminated sphere */}
          <radialGradient id="dot-sphere" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="40%" stopColor="#00E5C9" />
            <stop offset="100%" stopColor="#008F85" />
          </radialGradient>
        </defs>

        {/* -------------------------------------------------------------
            1. THE 3D FLUID RIBBON WAVE: Forms W, links to A, loops to V
            ------------------------------------------------------------- */}
        
        {/* Ribbon Upper Flow: S-curve top loop from left to center */}
        <path
          d="M 148 24 
             C 180 14, 230 18, 260 22 
             C 240 28, 205 32, 175 38 
             C 155 42, 140 32, 148 24 Z"
          fill="url(#ribbon-gradient-main)"
          opacity="0.95"
        />

        {/* Leftmost sweep of 'W' starting at bottom left */}
        <path
          d="M 18 64
             C 32 64, 48 88, 62 108
             C 68 116, 76 116, 82 106
             C 96 82, 108 52, 122 32
             C 134 16, 150 14, 166 22
             C 182 30, 186 52, 168 76
             C 152 98, 128 116, 114 116
             C 106 116, 104 108, 108 96
             C 114 78, 134 50, 144 38
             C 134 44, 116 72, 100 96
             C 86 118, 70 122, 54 104
             C 42 90, 28 72, 18 64 Z"
          fill="url(#ribbon-gradient-main)"
        />

        {/* 'W' left wing upward curl & underside shadow */}
        <path
          d="M 18 64
             C 28 64, 46 84, 58 102
             C 50 94, 34 76, 26 70
             C 22 67, 19 65, 18 64 Z"
          fill="url(#ribbon-shadow)"
        />

        {/* 'W' mid-to-right crest looping up over first 'A' */}
        <path
          d="M 124 112
             C 142 86, 174 42, 192 24
             C 208 8, 232 8, 252 20
             C 264 27, 268 36, 258 42
             C 246 48, 222 34, 204 30
             C 188 26, 166 40, 148 64
             C 134 84, 122 104, 114 116 Z"
          fill="url(#ribbon-gradient-main)"
        />

        {/* -------------------------------------------------------------
            2. FIRST 'A': Stylized triangle apex with interior turquoise dot
            ------------------------------------------------------------- */}
        {/* Left leg of A (intertwined with the ribbon) */}
        <path
          d="M 198 48
             L 164 116
             L 182 116
             L 204 70
             Z"
          fill="url(#ribbon-gradient-main)"
        />
        {/* Right leg of A (bold navy stroke) */}
        <path
          d="M 196 46
             L 228 116
             L 208 116
             L 188 72
             Z"
          fill={letterColor}
        />
        {/* Floating cyan sphere inside first 'A' */}
        <circle
          cx="198"
          cy="92"
          r="9.5"
          fill="url(#dot-sphere)"
          filter="url(#cyan-glow)"
        />

        {/* -------------------------------------------------------------
            3. 'V': Formed by dynamic fluid ribbon fold
            ------------------------------------------------------------- */}
        <path
          d="M 218 62
             C 230 48, 246 44, 256 54
             C 264 62, 260 76, 250 94
             C 240 110, 232 116, 224 116
             C 216 116, 218 108, 224 96
             C 232 80, 246 64, 242 56
             C 238 48, 226 56, 218 62 Z"
          fill="url(#ribbon-shadow)"
        />
        <path
          d="M 230 48
             C 242 42, 256 46, 266 58
             C 278 74, 268 96, 254 110
             C 246 118, 238 118, 232 112
             C 226 106, 230 96, 240 82
             C 252 66, 258 56, 248 50
             C 240 46, 234 48, 230 48 Z"
          fill="url(#ribbon-gradient-main)"
        />
        <path
          d="M 252 112
             C 262 98, 276 76, 292 50
             L 308 50
             C 288 80, 272 104, 258 116
             C 252 120, 246 118, 252 112 Z"
          fill="url(#ribbon-gradient-main)"
        />

        {/* -------------------------------------------------------------
            4. 'I': Clean vertical architectural bar
            ------------------------------------------------------------- */}
        <rect
          x="320"
          y="48"
          width="17"
          height="68"
          rx="2"
          fill={letterColor}
        />

        {/* -------------------------------------------------------------
            5. 'C': Bold geometric open circular crescent
            ------------------------------------------------------------- */}
        <path
          d="M 412 62
             C 402 52, 388 46, 372 46
             C 346 46, 328 66, 328 92
             C 328 118, 348 138, 374 138
             C 392 138, 406 130, 414 118
             L 402 108
             C 396 116, 386 122, 374 122
             C 356 122, 344 108, 344 92
             C 344 76, 356 62, 372 62
             C 384 62, 394 68, 400 76
             Z"
          fill={letterColor}
          transform="translate(30, -10)"
        />

        {/* -------------------------------------------------------------
            6. SECOND 'A': Matching apex with double-stem parallel slash
            ------------------------------------------------------------- */}
        {/* Main A triangle */}
        <path
          d="M 454 48
             L 424 116
             L 442 116
             L 460 74
             L 478 116
             L 496 116
             L 466 48
             Z"
          fill={letterColor}
        />
        {/* Parallel accent slash on the right side of second 'A' */}
        <path
          d="M 478 48
             L 508 116
             L 496 116
             L 468 54
             Z"
          fill="url(#ribbon-gradient-main)"
        />
        {/* Floating cyan sphere inside second 'A' */}
        <circle
          cx="460"
          cy="92"
          r="9.5"
          fill="url(#dot-sphere)"
          filter="url(#cyan-glow)"
        />

        {/* -------------------------------------------------------------
            7. SUBTITLE: "YOUR HEALTH • YOUR FUTURE"
            ------------------------------------------------------------- */}
        {showTagline && (
          <g transform="translate(270, 148)">
            {/* "YOUR HEALTH" */}
            <text
              x="-16"
              y="0"
              textAnchor="end"
              fill={taglineColor}
              fontSize="16"
              fontWeight="700"
              letterSpacing="0.28em"
              fontFamily="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
            >
              YOUR HEALTH
            </text>

            {/* Glowing cyan separator dot */}
            <circle
              cx="0"
              cy="-5"
              r="4"
              fill={cyanDotColor}
              filter="url(#cyan-glow)"
            />

            {/* "YOUR FUTURE" */}
            <text
              x="18"
              y="0"
              textAnchor="start"
              fill={taglineColor}
              fontSize="16"
              fontWeight="700"
              letterSpacing="0.28em"
              fontFamily="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
            >
              YOUR FUTURE
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
