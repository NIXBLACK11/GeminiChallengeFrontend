import React, { ReactNode } from 'react';
import { useTilt, TiltOptions } from './useTilt';

interface TiltWrapperProps {
  children: ReactNode;
  options?: TiltOptions;
  className?: string;
  style?: React.CSSProperties;
}

const TiltWrapper: React.FC<TiltWrapperProps> = ({ children, options, className, style }) => {
  const tiltRef = useTilt(options);

  return (
    <div ref={tiltRef} className={className} style={style}>
      {children}
    </div>
  );
};

export default TiltWrapper;