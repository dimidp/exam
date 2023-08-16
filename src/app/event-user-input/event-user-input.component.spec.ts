import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventUserInputComponent } from './event-user-input.component';

describe('EventUserInputComponent', () => {
  let component: EventUserInputComponent;
  let fixture: ComponentFixture<EventUserInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventUserInputComponent]
    });
    fixture = TestBed.createComponent(EventUserInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
