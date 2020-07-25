import { VentaDirectaModule } from './venta-directa.module';

describe('VentaDirectaModule', () => {
  let ventaDirectaModule: VentaDirectaModule;

  beforeEach(() => {
    ventaDirectaModule = new VentaDirectaModule();
  });

  it('should create an instance', () => {
    expect(ventaDirectaModule).toBeTruthy();
  });
});
