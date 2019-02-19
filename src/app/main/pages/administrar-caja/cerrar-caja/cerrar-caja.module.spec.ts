import { CerrarCajaModule } from './cerrar-caja.module';

describe('CerrarCajaModule', () => {
  let cerrarCajaModule: CerrarCajaModule;

  beforeEach(() => {
    cerrarCajaModule = new CerrarCajaModule();
  });

  it('should create an instance', () => {
    expect(cerrarCajaModule).toBeTruthy();
  });
});
