import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailViewComponent } from './event-detail-view.component';

describe('EventDetailViewComponent', () => {
  let component: EventDetailViewComponent;
  let fixture: ComponentFixture<EventDetailViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventDetailViewComponent]
    });
    fixture = TestBed.createComponent(EventDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
