import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteInputComponent } from './note-input.component';

describe('NoteInputComponent', () => {
  let component: NoteInputComponent;
  let fixture: ComponentFixture<NoteInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
