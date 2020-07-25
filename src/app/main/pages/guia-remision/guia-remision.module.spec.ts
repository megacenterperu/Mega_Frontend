import { GuiaRemisionModule } from './guia-remision.module';

describe('GuiaRemisionModule', () => {
  let guiaRemisionModule: GuiaRemisionModule;

  beforeEach(() => {
    guiaRemisionModule = new GuiaRemisionModule();
  });

  it('should create an instance', () => {
    expect(guiaRemisionModule).toBeTruthy();
  });
});
