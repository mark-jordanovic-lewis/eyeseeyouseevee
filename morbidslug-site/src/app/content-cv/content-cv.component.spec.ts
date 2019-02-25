import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCvComponent } from './content-cv.component';

describe('ContentCvComponent', () => {
  let component: ContentCvComponent;
  let fixture: ComponentFixture<ContentCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
