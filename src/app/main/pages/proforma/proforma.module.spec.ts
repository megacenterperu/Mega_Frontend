import { ProformaModule } from './proforma.module';

describe('ProformaModule', () => {
  let proformaModule: ProformaModule;

  beforeEach(() => {
    proformaModule = new ProformaModule();
  });

  it('should create an instance', () => {
    expect(proformaModule).toBeTruthy();
  });
});
