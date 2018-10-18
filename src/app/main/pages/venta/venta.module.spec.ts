import { VentaModule } from './venta.module';

describe('VentaModule', () => {
  let ventaModule: VentaModule;

  beforeEach(() => {
    ventaModule = new VentaModule();
  });

  it('should create an instance', () => {
    expect(ventaModule).toBeTruthy();
  });
});
