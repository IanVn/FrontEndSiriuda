import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicoExternoComponent } from './academico-externo.component';

describe('AcademicoExternoComponent', () => {
  let component: AcademicoExternoComponent;
  let fixture: ComponentFixture<AcademicoExternoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicoExternoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicoExternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
