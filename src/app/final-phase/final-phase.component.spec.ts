import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalPhaseComponent } from './final-phase.component';

describe('FinalPhaseComponent', () => {
  let component: FinalPhaseComponent;
  let fixture: ComponentFixture<FinalPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalPhaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
