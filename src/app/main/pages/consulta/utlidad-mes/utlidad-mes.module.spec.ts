import { UtlidadMesModule } from './utlidad-mes.module';

describe('UtlidadMesModule', () => {
  let utlidadMesModule: UtlidadMesModule;

  beforeEach(() => {
    utlidadMesModule = new UtlidadMesModule();
  });

  it('should create an instance', () => {
    expect(utlidadMesModule).toBeTruthy();
  });
});
