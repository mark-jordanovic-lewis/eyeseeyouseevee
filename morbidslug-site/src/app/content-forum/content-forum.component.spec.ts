import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentForumComponent } from './content-forum.component';

describe('ContentForumComponent', () => {
  let component: ContentForumComponent;
  let fixture: ComponentFixture<ContentForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
