import { TipoGenericosModule } from './tipo-genericos.module';

describe('TipoGenericosModule', () => {
  let tipoGenericosModule: TipoGenericosModule;

  beforeEach(() => {
    tipoGenericosModule = new TipoGenericosModule();
  });

  it('should create an instance', () => {
    expect(tipoGenericosModule).toBeTruthy();
  });
});
