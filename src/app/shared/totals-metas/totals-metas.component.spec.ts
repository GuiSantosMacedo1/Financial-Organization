import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalsMetasComponent } from './totals-metas.component';

describe('TotalsMetasComponent', () => {
  let component: TotalsMetasComponent;
  let fixture: ComponentFixture<TotalsMetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalsMetasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalsMetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
