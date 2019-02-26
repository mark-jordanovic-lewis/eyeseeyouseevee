import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { SharedStateService } from '../shared-state.service';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  content: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.content = this.route.snapshot.paramMap.get('slug');
    this.router
        .events
        .subscribe(_ => this.content = this.route.snapshot.paramMap.get('slug'));
  }

  goBack(): void { this.location.back(); }
}
