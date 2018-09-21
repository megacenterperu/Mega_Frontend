import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorViewComponent } from './proveedor-view.component';

describe('ProveedorViewComponent', () => {
  let component: ProveedorViewComponent;
  let fixture: ComponentFixture<ProveedorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
