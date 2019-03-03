import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'communications',
  templateUrl: './communications.component.html',
  styleUrls: ['./communications.component.scss']
})
export class CommunicationsComponent implements OnInit {
  thing = 0;
  constructor() { console.log("CommunicationsComponent instantiated"); }

  ngOnInit() {}

}
