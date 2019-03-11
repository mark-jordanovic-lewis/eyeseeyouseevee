import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';

import { MessageService } from '../message.service';

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
    private location: Location,
    private http: HttpClient,
    private messageService: MessageService
  ) { this.log("instantiated"); }

  ngOnInit() {
    this.content = this.route.snapshot.paramMap.get('slug');
    this.router
        .events
        .subscribe(_ => this.content = this.route.snapshot.paramMap.get('slug'));
  }

  private log(message: string) {
    this.messageService.add(`ContentComponent: ${message}`);
  }

  goBack(): void { this.location.back(); }
}
