import { TestBed, inject } from '@angular/core/testing';

import { TipoproductoService } from './tipoproducto.service';

describe('TipoproductoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoproductoService]
    });
  });

  it('should be created', inject([TipoproductoService], (service: TipoproductoService) => {
    expect(service).toBeTruthy();
  }));
});
