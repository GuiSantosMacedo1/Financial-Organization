import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingComponent } from './spending.component';

describe('SpendingComponent', () => {
  let component: SpendingComponent;
  let fixture: ComponentFixture<SpendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the health icon and color for the stored category value', () => {
    expect(component.getIconsByCategory('Saude')).toBe('fa-heart');
    expect(component.getCategoryColor('Saude')).toBe('bg-info');
  });
});
