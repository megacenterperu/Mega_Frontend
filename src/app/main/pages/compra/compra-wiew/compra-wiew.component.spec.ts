import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraWiewComponent } from './compra-wiew.component';

describe('CompraWiewComponent', () => {
  let component: CompraWiewComponent;
  let fixture: ComponentFixture<CompraWiewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompraWiewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraWiewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
