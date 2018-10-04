import { SucursalModule } from './sucursal.module';

describe('SucursalModule', () => {
  let sucursalModule: SucursalModule;

  beforeEach(() => {
    sucursalModule = new SucursalModule();
  });

  it('should create an instance', () => {
    expect(sucursalModule).toBeTruthy();
  });
});
