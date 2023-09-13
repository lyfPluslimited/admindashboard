import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualConditionComponent } from './individual-condition.component';

describe('IndividualConditionComponent', () => {
  let component: IndividualConditionComponent;
  let fixture: ComponentFixture<IndividualConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualConditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
