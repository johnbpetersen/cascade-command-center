import React from 'react';

interface DotDividerProps {
  /** diameter of each dot in px */
  size?: number;
  /** horizontal gap between dots in px */
  gapX?: number;
  /** vertical gap (computed if omitted) in px */
  gapY?: number;
  /** any extra Tailwind classes (e.g. animation utilities) */
  className?: string;
}

const DotDivider: React.FC<DotDividerProps> = ({
  size = 8,
  gapX = 16,
  gapY,
  className = '',
}) => {
  // equilateral triangle: row-gap = gapX * √3/2
  const computedGapY = gapY ?? Math.round(gapX * Math.sqrt(3) / 2);

  const dotStyle = {
    width:  `${size}px`,
    height: `${size}px`,
  };

  return (
    <div
      className={`
        inline-grid
        grid-cols-2 grid-rows-2
        justify-items-center items-start
        ${className}
      `}
      style={{
        columnGap: `${gapX}px`,
        rowGap:    `${computedGapY}px`,
      }}
    >
      {/* Top dot spans both columns */}
      <span
        className="col-span-2 bg-cascade-blue rounded-full"
        style={dotStyle}
      />
      {/* Bottom-left */}
      <span
        className="bg-cascade-blue rounded-full"
        style={dotStyle}
      />
      {/* Bottom-right */}
      <span
        className="bg-cascade-blue rounded-full"
        style={dotStyle}
      />
    </div>
  );
};

export default DotDivider;