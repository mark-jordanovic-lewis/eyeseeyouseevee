import { Component, OnInit } from '@angular/core';
import { Grid } from '../grid';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  grid: Grid = { size: 500, step: 50, live: [] };
  viewBox: string = "0 0 "+this.grid.size+" "+this.grid.size
  coordinates: { cx: number, cy: number }[];

  constructor() { }

  ngOnInit() {
    setCoords();
  }

  changeGrid(bool: boolean) {
    if (Math.random() > 0.9) { cleanGrid(); this.addCircle(); this.addCircle();}
    if (Math.random() > 0.8) { this.addCircle(); }
    if (Math.random() > 0.6) { this.addCircle(); this.addCircle(); }
    if (Math.random() > 0.4) {
      this.addCircle();
    } else {
      for (let i = this.grid.live.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ this.grid.live[i], this.grid.live[j]
        ] = [
          this.grid.live[j], this.grid.live[i] ];
        cleanGrid();
      }
    }
  }

  cleanGrid() {
    for (let i = 0; i < Math.floor(Math.random()*this.grid.live.length/2); i++) {
      if (Math.random() > 0.6) {
        this.grid.live.pop();
      } else if (Math.random() < 0.3) {
        this.grid.live.shift();
      }
    }
  }

  addCircle(): void {
    this.grid.live.push({ cx: this.scatter(), cy: this.scatter() });
  }

  scatter(): number {
    var position: number = this.grid.size - Math.floor(Math.random()*10)*this.grid.step + Math.floor((Math.random()-0.5)*3);
    return position;
  }

  setCoords() {
    var y_incr = step*Math.sqrt(3)/2;
    var cx, cy: number;
    for (var x = 0 ; x*step < this.grid.size) {
      if (x%2 === 0) {
        cx =
      } else {

      }
      for (var y = 0; y*y_incr < this.grid.size) {

      }
    }
  }

}
