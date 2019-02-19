import { AdministrarCajaModule } from './administrar-caja.module';

describe('AdministrarCajaModule', () => {
  let administrarCajaModule: AdministrarCajaModule;

  beforeEach(() => {
    administrarCajaModule = new AdministrarCajaModule();
  });

  it('should create an instance', () => {
    expect(administrarCajaModule).toBeTruthy();
  });
});
