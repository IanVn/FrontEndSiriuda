import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasantesComponent } from './pasantes.component';

describe('PasantesComponent', () => {
  let component: PasantesComponent;
  let fixture: ComponentFixture<PasantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
