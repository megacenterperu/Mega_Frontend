import { DeclaracionVentaCompraModule } from './declaracion-venta-compra.module';

describe('DeclaracionVentaCompraModule', () => {
  let declaracionVentaCompraModule: DeclaracionVentaCompraModule;

  beforeEach(() => {
    declaracionVentaCompraModule = new DeclaracionVentaCompraModule();
  });

  it('should create an instance', () => {
    expect(declaracionVentaCompraModule).toBeTruthy();
  });
});
