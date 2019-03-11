import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MessageService {
  private inbox: string[];
  public message$: BehaviorSubject<string[]>;


  constructor() {
    this.clear();
    this.add("MessageService instantiated");
  }

  add(message: string) {
    this.inbox.push(message);
    this.message$.next(this.inbox);
  }

  clear() {
    this.inbox = [];
    this.message$ = new BehaviorSubject<string[]>(this.inbox);
  }
}
