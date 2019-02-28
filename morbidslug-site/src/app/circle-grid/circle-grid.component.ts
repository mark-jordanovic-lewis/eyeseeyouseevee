import { Component, OnInit } from '@angular/core';
import { Grid, Circle } from '../grid';

class CoordSystem {
  unit: { x: number, y: number }[]
}

@Component({
  selector: 'app-circle-grid',
  templateUrl: './circle-grid.component.html',
  styleUrls: ['./circle-grid.component.scss']
})
export class CircleGridComponent implements OnInit {
  grid: Grid = { size: 500, step: 100, live: [] };
  viewBox: string = "0 0 "+this.grid.size+" "+this.grid.size;
  coordinates: { x: number, y: number, pattern: string, background: string }[];
  coordSystem: CoordSystem;
  radius = 46;
  patterns = ["url(#flowers)", "url(#lines)", "url(#triangles)"];
  backgrounds = ["url(#bullet_cluster)", "url(#code)", "url(#dinosaur)", "url(#green-cowhair)"]
  filters = ["url(#bacon)", "url(#ripping)", "url(#rocks)", "url(#cowhair)"]

  constructor() { }

  ngOnInit() {
    this.setCoordSystem();
  }

  changeGrid(bool: boolean): void {
    var current = Math.random();
    if (current > 0.9) { this.cleanGrid(); this.addCircle(); }
    if (current > 0.8) { this.addCircle(); }
    if (current > 0.6) { this.addCircle(); }
    if (current > 0.4) {
      this.addCircle();
    } else {
      this.shuffleGrid();
    }
  }

  flicker(bool: boolean): void {
    for (let i = this.grid.live.length - 1; i > 0; i--) {
      this.grid.live[i].filter = this.filters[this.randInt(this.filters.length)];
    }
  }

  shuffleGrid() {
    for (let i = this.grid.live.length - 1; i > 0; i--) {
      const j = this.randInt(this.grid.live.length);
      [ this.grid.live[i], this.grid.live[j]
      ] = [
        this.grid.live[j], this.grid.live[i] ];
      this.cleanGrid();
    }
  }

  cleanGrid() {
    this.grid.live = this.grid.live.filter((circle) => circle);
    for (let i = 0; i < this.grid.live.length/4; i++) {
      if (Math.random() > 0.4) {
        this.grid.live.pop();
      } else {
        this.grid.live[i].filter = this.filters[this.randInt(this.filters.length)];
      }
    }
  }

  addCircle(): void {
    this.grid.live.push(this.getCoords());
  }

  getCoords(): { x: number, y: number, pattern: string, background: string, filter: string } {
    var point = this.coordSystem.unit[this.randInt(this.coordSystem.unit.length)];
    var nsteps = Math.ceil(this.grid.size/this.grid.step);
    var xMult = Math.round(nsteps*Math.random());
    var yMult = Math.round(nsteps*Math.random());
    return {
      x: Math.abs((point.x*xMult*this.grid.step)%this.grid.size),
      y: Math.abs((point.y*yMult*this.grid.step)%this.grid.size),
      pattern: this.patterns[this.randInt(this.patterns.length)],
      background: this.background(),
      filter: this.filters[this.randInt(this.filters.length)]
    };

  }

  background(): string {
    var rand = Math.random();
    if (rand < 0.05) {
      return "url(#bacon_lightening1)"
    } else if (rand < 0.4) {
      return "url(#code)"
    } else {
      return this.backgrounds[this.randInt(this.backgrounds.length)]
    }
  }

  filter(): string {
    if (Math.random() < 0.07) {
      return "url(#phasing)"
    } else {
      this.filters[this.randInt(this.filters.length)]
    }
  }

  setCoordSystem() {
    // hexagon grid unit is parallelogram
    var y_incr = Math.sqrt(3)/2;
    this.coordSystem = {
     unit: [
       { x: 0.5, y: y_incr},
       { x: 2, y: 2*y_incr}
      ]
    };
  }

  randInt(max: number): number {
    return Math.floor(Math.random()*max);
  }

}
