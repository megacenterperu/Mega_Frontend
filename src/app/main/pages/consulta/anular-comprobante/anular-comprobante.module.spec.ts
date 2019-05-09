import { AnularComprobanteModule } from './anular-comprobante.module';

describe('AnularComprobanteModule', () => {
  let anularComprobanteModule: AnularComprobanteModule;

  beforeEach(() => {
    anularComprobanteModule = new AnularComprobanteModule();
  });

  it('should create an instance', () => {
    expect(anularComprobanteModule).toBeTruthy();
  });
});
