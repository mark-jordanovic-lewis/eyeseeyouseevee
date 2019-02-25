import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'navbar',
  template: `
    <nav>
      <span class="nav-title">{{navTitle}}</span>
      <div class="navigation">
        <input/> <!-- this is a search box -->
        <button class="login-button"><span class="logo">ヽ(￣～￣　)ノ</span></button>
        <span class="option-button">=</span> <!-- the three line option button. Add img attribute in component -->
      </div>
    </nav>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() navTitle: string;

  constructor() { }

  ngOnInit() {
  }

}
