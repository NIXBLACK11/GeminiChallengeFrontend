// src/types/vanilla-tilt.d.ts
declare module 'vanilla-tilt' {
    interface Options {
      max?: number;
      speed?: number;
      scale?: number;
    }
  
    const VanillaTilt: {
      init(element: HTMLElement, options?: Options): void;
    };
  
    export default VanillaTilt;
  }
  