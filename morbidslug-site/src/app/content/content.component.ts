import { Component, OnInit } from '@angular/core';
import { SharedStateService } from '../shared-state.service';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  content: string;

  constructor(private sharedStateService: SharedStateService) {
    this.sharedStateService
        .contentSelection
        .subscribe(value => {this.content = value});
  }

  ngOnInit() {}
}
