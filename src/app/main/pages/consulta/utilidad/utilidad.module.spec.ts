import { UtilidadModule } from './utilidad.module';

describe('UtilidadModule', () => {
  let utilidadModule: UtilidadModule;

  beforeEach(() => {
    utilidadModule = new UtilidadModule();
  });

  it('should create an instance', () => {
    expect(utilidadModule).toBeTruthy();
  });
});
