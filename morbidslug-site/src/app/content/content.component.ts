import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';

import { State } from '../state';
import { MessageService } from '../message.service';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  content: string;
  contentState: State;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private http: HttpClient,
    private messageService: MessageService,
    private httpService: HttpServiceService
  ) { }

  ngOnInit() {
    this.content = this.route.snapshot.paramMap.get('slug');
    this.router
        .events
        .subscribe(_ => this.content = this.route.snapshot.paramMap.get('slug'));
    this.httpService
        .getState()
        .subscribe(state => this.contentState = state);
  }

  private log(message: string) {
    this.messageService.add(`ContentComponent: ${message}`);
  }

  goBack(): void { this.location.back(); }
}
