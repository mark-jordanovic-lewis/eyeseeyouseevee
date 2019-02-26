import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  links = [
    { name: 'Mark J-L CV', route: 'mark-j-l-cv', img: '/assets/images/icon/24/handshake.png' },
    { name: 'Code',        route: 'code',        img: '/assets/images/icon/24/flask.png' },
    { name: 'Blog',        route: 'blog',        img: '/assets/images/icon/24/notepad.png' },
    { name: 'Forum',       route: 'forum',       img: '/assets/images/icon/24/stamp.png' },
    { name: 'Comic',       route: 'comic',       img: '/assets/images/icon/24/bubbles-alt.png' }
  ];

  selection: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.assignSelectedRoute();
    this.subToExternalRouteChange();
  }

  subToExternalRouteChange(): void {
    this.router.events.subscribe(_ => { this.assignSelectedRoute() });
  }

  assignSelectedRoute(): void {
    var route: string = this.route.snapshot.paramMap.get('slug');
    var link: string = this.links.filter(link => link.route === route )[0].name;
    this.selection = link;
  }

  clicked(linkname: string): void {
    this.selection = linkname;
  }
}
