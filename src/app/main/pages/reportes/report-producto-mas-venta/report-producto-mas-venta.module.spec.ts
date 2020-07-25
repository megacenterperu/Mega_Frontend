import { ReportProductoMasVentaModule } from './report-producto-mas-venta.module';

describe('ReportProductoMasVentaModule', () => {
  let reportProductoMasVentaModule: ReportProductoMasVentaModule;

  beforeEach(() => {
    reportProductoMasVentaModule = new ReportProductoMasVentaModule();
  });

  it('should create an instance', () => {
    expect(reportProductoMasVentaModule).toBeTruthy();
  });
});
