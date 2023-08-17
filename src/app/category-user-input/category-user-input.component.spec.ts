import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryUserInputComponent } from './category-user-input.component';

describe('CategoryUserInputComponent', () => {
  let component: CategoryUserInputComponent;
  let fixture: ComponentFixture<CategoryUserInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryUserInputComponent]
    });
    fixture = TestBed.createComponent(CategoryUserInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
