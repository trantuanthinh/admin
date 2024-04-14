import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientManagementComponent } from './ingredient-management.component';

describe('IngredientManagementComponent', () => {
  let component: IngredientManagementComponent;
  let fixture: ComponentFixture<IngredientManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
