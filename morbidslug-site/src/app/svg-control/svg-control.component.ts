import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'svg-control',
  templateUrl: './svg-control.component.html',
  styleUrls: ['./svg-control.component.scss']
})
export class SvgControlComponent implements OnInit {
  @Output() choke: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() { this.revive(false); }

  revive(event): void {
    this.choke.emit(false);
    setTimeout(() => { this.revive(true); }, Math.floor(Math.random()*500));
  }
}
