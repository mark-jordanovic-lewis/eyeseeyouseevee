export class Grid {
  size: number;
  step: number;
  live: ShapeData[];
}
interface ShapeData {
  x: number;
  y: number;
  pattern: string;
  background: string;
  filter: string;
}
export class Circle implements ShapeData {
  x: number;
  y: number;
  pattern: string;
  background: string;
  filter: string;
}

export class CoordSystem {
  unit: { x: number, y: number }[]
}
