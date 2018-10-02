import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadmedidaListComponent } from './unidadmedida-list.component';

describe('UnidadmedidaListComponent', () => {
  let component: UnidadmedidaListComponent;
  let fixture: ComponentFixture<UnidadmedidaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadmedidaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadmedidaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
