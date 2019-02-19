import { EgresoModule } from './egreso.module';

describe('EgresoModule', () => {
  let egresoModule: EgresoModule;

  beforeEach(() => {
    egresoModule = new EgresoModule();
  });

  it('should create an instance', () => {
    expect(egresoModule).toBeTruthy();
  });
});
