import { TipoDocumentoModule } from './tipo-documento.module';

describe('TipoDocumentoModule', () => {
  let tipoDocumentoModule: TipoDocumentoModule;

  beforeEach(() => {
    tipoDocumentoModule = new TipoDocumentoModule();
  });

  it('should create an instance', () => {
    expect(tipoDocumentoModule).toBeTruthy();
  });
});
