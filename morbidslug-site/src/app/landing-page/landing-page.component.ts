import { Component, OnInit } from '@angular/core';

class Grid {
  size: number;
  step: number;
  live: {cx: number, cy: number}[];
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  circleGrid: Grid = { size: 500, step: 50, live: [] };

  constructor() { }

  ngOnInit() {}

  addCircle(bool: boolean) {
    if (Math.random() > 0.7) {
      this.circleGrid.live.push({ cx: this.scatter(), cy: this.scatter() })
      this.circleGrid.live.push({ cx: this.scatter(), cy: this.scatter() })
    }
    if (Math.random() > 0.5) {
      this.circleGrid.live.push({ cx: this.scatter(), cy: this.scatter() })
    } else {
      for (let i = this.circleGrid.live.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [
          this.circleGrid.live[i], this.circleGrid.live[j]
        ]
          = [
          this.circleGrid.live[j], this.circleGrid.live[i]
        ];
        for (let i = 0; i < Math.floor(Math.random()*this.circleGrid.live.length/5); i++) {
          if (Math.random() < 0.5) {
            this.circleGrid.live.pop();
          } else {
            this.circleGrid.live.shift();
          }
        }
      }
    }
  }

  scatter(): number {
    var position: number = this.circleGrid.size - Math.floor(Math.random()*10)*this.circleGrid.step + Math.floor((Math.random()-0.5)*3);
    return position;
  }

}
