import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadmedidaEditComponent } from './unidadmedida-edit.component';

describe('UnidadmedidaEditComponent', () => {
  let component: UnidadmedidaEditComponent;
  let fixture: ComponentFixture<UnidadmedidaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadmedidaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadmedidaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
