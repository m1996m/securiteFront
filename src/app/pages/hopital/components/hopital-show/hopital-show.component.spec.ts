import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HopitalShowComponent } from './hopital-show.component';

describe('HopitalShowComponent', () => {
  let component: HopitalShowComponent;
  let fixture: ComponentFixture<HopitalShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HopitalShowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HopitalShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
