import { Component, OnInit } from '@angular/core';
import { SafeHtmlPipe } from '../safe-html.pipe';
import { Grid } from '../grid';

class CoordSystem {
  unit: { x: number, y: number }[]
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  grid: Grid = { size: 500, step: 50, live: [] };
  viewBox: string = "0 0 "+this.grid.size+" "+this.grid.size;
  coordinates: { x: number, y: number, pattern: string}[];
  coordSystem: CoordSystem;
  radius = 24;
  patterns = [
    "url(#flowers)",
    "url(#lines)",
    "url(#triangles)"
  ];

  constructor() { }

  ngOnInit() {
    this.setCoordSystem();
  }

  changeGrid(bool: boolean) {
    if (Math.random() > 0.9) { this.cleanGrid(); this.addCircle(); this.addCircle();}
    if (Math.random() > 0.8) { this.addCircle(); }
    if (Math.random() > 0.6) { this.addCircle(); this.addCircle(); }
    if (Math.random() > 0.3) {
      this.addCircle();
    } else {
      for (let i = this.grid.live.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ this.grid.live[i], this.grid.live[j]
        ] = [
          this.grid.live[j], this.grid.live[i] ];
        this.cleanGrid();
      }
    }
  }

  cleanGrid() {
    this.grid.live = this.grid.live.filter((circle) => circle);
    for (let i = 0; i < Math.floor(Math.random()*this.grid.live.length/5); i++) {
      if (Math.random() > 0.6) { this.grid.live.pop(); }
    }
  }

  addCircle(): void {
    this.grid.live.push(this.getCoords());
  }

  getCoords(): { x: number, y: number, pattern: string } {
    var point = this.coordSystem.unit[Math.floor(Math.random()*this.coordSystem.unit.length)];
    var nsteps = Math.ceil(this.grid.size/this.grid.step);
    var xMult = Math.round(nsteps*Math.random());
    var yMult = Math.round(nsteps*Math.random());
    return {
      x: Math.abs((point.x*xMult*this.grid.step)%this.grid.size),
      y: Math.abs((point.y*yMult*this.grid.step)%this.grid.size),
      pattern: this.patterns[Math.floor(Math.random()*this.patterns.length)]
    };

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

}
