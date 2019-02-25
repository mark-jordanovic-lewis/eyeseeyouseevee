import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentComicComponent } from './content-comic.component';

describe('ContentComicComponent', () => {
  let component: ContentComicComponent;
  let fixture: ComponentFixture<ContentComicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentComicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
