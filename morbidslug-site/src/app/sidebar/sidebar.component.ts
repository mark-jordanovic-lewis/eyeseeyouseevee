import { Component, OnInit } from '@angular/core';
import { SharedStateService } from '../shared-state.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  links = [
    { name: 'Mark J-L CV', img: '/assets/images/icon/24/handshake.png' },
    { name: 'Code',        img: '/assets/images/icon/24/flask.png' },
    { name: 'Blog',        img: '/assets/images/icon/24/notepad.png' },
    { name: 'Forum',       img: '/assets/images/icon/24/stamp.png' },
    { name: 'Comic',       img: '/assets/images/icon/24/bubbles-alt.png' }
  ];

  selection: string;

  constructor(private sharedStateService: SharedStateService) {}

  ngOnInit() {}

  clicked(linkname: string) {
    this.selection = linkname;
    this.sharedStateService
        .contentSelection
        .next(linkname.toLowerCase().replace(/ /g, '-'));
  }

}
