import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SafeHtmlPipe } from '../safe-html.pipe';

@Component({
  selector: 'svg-control',
  templateUrl: './svg-control.component.html',
  styleUrls: ['./svg-control.component.scss']
})
export class SvgControlComponent implements OnInit {
  @Output() choke: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() live = [];
  radius: number = 71;

  constructor() {}

  ngOnInit() { this.revive(false); }

  revive(event): void {
    setTimeout(() => { this.choke.emit(false); }, 700);
    setTimeout(() => { this.revive(true); }, 500);
  }
}
