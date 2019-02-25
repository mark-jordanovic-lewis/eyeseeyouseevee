import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCodeComponent } from './content-code.component';

describe('ContentCodeComponent', () => {
  let component: ContentCodeComponent;
  let fixture: ComponentFixture<ContentCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
