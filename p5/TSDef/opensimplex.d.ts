declare class Contribution2 {
    dx: number;
    dy: number;
    xsb: number;
    ysb: number;
    next?: Contribution2;
  
    constructor(multiplier: number, xsb: number, ysb: number);
  }
  
  declare class Contribution3 {
    dx: number;
    dy: number;
    dz: number;
    xsb: number;
    ysb: number;
    zsb: number;
    next?: Contribution3;
  
    constructor(multiplier: number, xsb: number, ysb: number, zsb: number);
  }
  
  declare class Contribution4 {
    dx: number;
    dy: number;
    dz: number;
    dw: number;
    xsb: number;
    ysb: number;
    zsb: number;
    wsb: number;
    next?: Contribution4;
  
    constructor(multiplier: number, xsb: number, ysb: number, zsb: number, wsb: number);
  }
  
  declare function shuffleSeed(seed: Uint32Array): Uint32Array;
  
  declare class OpenSimplexNoise {
    perm: Uint8Array;
    perm2D: Uint8Array;
    perm3D: Uint8Array;
    perm4D: Uint8Array;
    lookup2D: Contribution2[];
    lookup3D: Contribution3[];
    lookup4D: Contribution4[];
  
    constructor(clientSeed: number);
  
    initialize(): void;
    array2D(width: number, height: number): number[][];
    array3D(width: number, height: number, depth: number): number[][][];
    array4D(width: number, height: number, depth: number, wLength: number): number[][][][];
    noise2D(x: number, y: number): number;
    noise3D(x: number, y: number, z: number): number;
    noise4D(x: number, y: number, z: number, w: number): number;
  }
  