import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacaronsComponent } from './macarons.component';

describe('MacaronsComponent', () => {
  let component: MacaronsComponent;
  let fixture: ComponentFixture<MacaronsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MacaronsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MacaronsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
