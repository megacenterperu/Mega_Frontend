import { PrecioProductoAlmacenModule } from './precio-producto-almacen.module';

describe('PrecioProductoAlmacenModule', () => {
  let precioProductoAlmacenModule: PrecioProductoAlmacenModule;

  beforeEach(() => {
    precioProductoAlmacenModule = new PrecioProductoAlmacenModule();
  });

  it('should create an instance', () => {
    expect(precioProductoAlmacenModule).toBeTruthy();
  });
});
