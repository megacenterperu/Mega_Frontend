import { VentaPorusuarioModule } from './venta-porusuario.module';

describe('VentaPorusuarioModule', () => {
  let ventaPorusuarioModule: VentaPorusuarioModule;

  beforeEach(() => {
    ventaPorusuarioModule = new VentaPorusuarioModule();
  });

  it('should create an instance', () => {
    expect(ventaPorusuarioModule).toBeTruthy();
  });
});
