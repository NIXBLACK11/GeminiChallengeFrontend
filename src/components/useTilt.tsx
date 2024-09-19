import { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

export interface TiltOptions {
  max?: number;
  speed?: number;
  glare?: boolean;
  'max-glare'?: number;
}

const defaultOptions: TiltOptions = {
  max: 25,
  speed: 400,
  glare: true,
  'max-glare': 0.5
};

export function useTilt(options: TiltOptions = {}) {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tiltNode = tiltRef.current;
    if (tiltNode) {
      const tiltOptions = { ...defaultOptions, ...options };
      VanillaTilt.init(tiltNode, tiltOptions);
    }

    return () => {
      if (tiltNode) {
        (tiltNode as any).vanillaTilt.destroy();
      }
    };
  }, [options]);

  return tiltRef;
}