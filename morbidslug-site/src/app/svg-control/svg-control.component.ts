import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'svg-control',
  templateUrl: './svg-control.component.html',
  styleUrls: ['./svg-control.component.scss']
})
export class SvgControlComponent implements OnInit {
  @Output() choke: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() stutter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {
    this.revive(false);
    this.buzz(true);
  }

  revive(event): void {
    this.choke.emit(false);
    setTimeout(() => { this.choke.emit(false); }, 500 );
    setTimeout(() => { this.choke.emit(false); }, 1000 );
    setTimeout(() => { this.revive(true); }, Math.floor(Math.random()*700)+300);
  }

  buzz(event): void {
    setTimeout(() => { this.buzz(true); }, Math.floor(Math.random()*100));
    this.stutter.emit(true);
  }
}
