import { RegistroProductoModule } from './registro-producto.module';

describe('RegistroProductoModule', () => {
  let registroProductoModule: RegistroProductoModule;

  beforeEach(() => {
    registroProductoModule = new RegistroProductoModule();
  });

  it('should create an instance', () => {
    expect(registroProductoModule).toBeTruthy();
  });
});
