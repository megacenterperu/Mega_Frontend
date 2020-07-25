import { ReportVentaDiaModule } from './report-venta-dia.module';

describe('ReportVentaDiaModule', () => {
  let reportVentaDiaModule: ReportVentaDiaModule;

  beforeEach(() => {
    reportVentaDiaModule = new ReportVentaDiaModule();
  });

  it('should create an instance', () => {
    expect(reportVentaDiaModule).toBeTruthy();
  });
});
