import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MessageService } from '../message.service';

@Component({
  selector: 'communications',
  templateUrl: './communications.component.html',
  styleUrls: ['./communications.component.scss']
})
export class CommunicationsComponent implements OnInit {
  messages: string[];

  constructor(private messageService: MessageService) {
    this.messageService
        .message$
        .subscribe(messages => this.messages = messages);
    this.log("instantiated");
  }

  log(message): void {
    this.messageService.add(`CommunicationsComponent: ${message}`);
  }

  ngOnInit() {}

}
