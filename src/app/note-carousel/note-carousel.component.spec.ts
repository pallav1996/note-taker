import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteCarouselComponent } from './note-carousel.component';

describe('NoteCarouselComponent', () => {
  let component: NoteCarouselComponent;
  let fixture: ComponentFixture<NoteCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
