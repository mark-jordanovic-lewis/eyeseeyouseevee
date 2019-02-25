import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentBlogComponent } from './content-blog.component';

describe('ContentBlogComponent', () => {
  let component: ContentBlogComponent;
  let fixture: ComponentFixture<ContentBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
