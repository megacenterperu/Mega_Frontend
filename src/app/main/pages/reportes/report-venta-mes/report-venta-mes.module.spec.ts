import { ReportVentaMesModule } from './report-venta-mes.module';

describe('ReportVentaMesModule', () => {
  let reportVentaMesModule: ReportVentaMesModule;

  beforeEach(() => {
    reportVentaMesModule = new ReportVentaMesModule();
  });

  it('should create an instance', () => {
    expect(reportVentaMesModule).toBeTruthy();
  });
});
