import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AspiranteComponent } from './aspirante.component';

describe('AspiranteComponent', () => {
  let component: AspiranteComponent;
  let fixture: ComponentFixture<AspiranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AspiranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AspiranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
