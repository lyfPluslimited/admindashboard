import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoninfectiousConditionComponent } from './noninfectious-condition.component';

describe('NoninfectiousConditionComponent', () => {
  let component: NoninfectiousConditionComponent;
  let fixture: ComponentFixture<NoninfectiousConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoninfectiousConditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoninfectiousConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
