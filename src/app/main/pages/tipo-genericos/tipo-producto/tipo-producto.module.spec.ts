import { TipoProductoModule } from './tipo-producto.module';

describe('TipoProductoModule', () => {
  let tipoProductoModule: TipoProductoModule;

  beforeEach(() => {
    tipoProductoModule = new TipoProductoModule();
  });

  it('should create an instance', () => {
    expect(tipoProductoModule).toBeTruthy();
  });
});
