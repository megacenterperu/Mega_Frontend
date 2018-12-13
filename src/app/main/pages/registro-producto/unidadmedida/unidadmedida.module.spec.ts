import { UnidadmedidaModule } from './unidadmedida.module';

describe('UnidadmedidaModule', () => {
  let unidadmedidaModule: UnidadmedidaModule;

  beforeEach(() => {
    unidadmedidaModule = new UnidadmedidaModule();
  });

  it('should create an instance', () => {
    expect(unidadmedidaModule).toBeTruthy();
  });
});
