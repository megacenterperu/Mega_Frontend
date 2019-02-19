import { CajaFuerteModule } from './caja-fuerte.module';

describe('CajaFuerteModule', () => {
  let cajaFuerteModule: CajaFuerteModule;

  beforeEach(() => {
    cajaFuerteModule = new CajaFuerteModule();
  });

  it('should create an instance', () => {
    expect(cajaFuerteModule).toBeTruthy();
  });
});
