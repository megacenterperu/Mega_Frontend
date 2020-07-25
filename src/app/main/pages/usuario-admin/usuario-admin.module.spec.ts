import { UsuarioAdminModule } from './usuario-admin.module';

describe('UsuarioAdminModule', () => {
  let usuarioAdminModule: UsuarioAdminModule;

  beforeEach(() => {
    usuarioAdminModule = new UsuarioAdminModule();
  });

  it('should create an instance', () => {
    expect(usuarioAdminModule).toBeTruthy();
  });
});
