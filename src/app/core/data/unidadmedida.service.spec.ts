import { TestBed, inject } from '@angular/core/testing';

import { UnidadmedidaService } from './unidadmedida.service';

describe('UnidadmedidaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnidadmedidaService]
    });
  });

  it('should be created', inject([UnidadmedidaService], (service: UnidadmedidaService) => {
    expect(service).toBeTruthy();
  }));
});
