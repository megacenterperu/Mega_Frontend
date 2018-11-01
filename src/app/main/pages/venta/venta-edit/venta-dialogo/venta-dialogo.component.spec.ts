import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaDialogoComponent } from './venta-dialogo.component';

describe('VentaDialogoComponent', () => {
  let component: VentaDialogoComponent;
  let fixture: ComponentFixture<VentaDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
