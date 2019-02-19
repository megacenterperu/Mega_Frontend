import { LoginUsuarioModule } from './login-usuario.module';

describe('LoginUsuarioModule', () => {
  let loginUsuarioModule: LoginUsuarioModule;

  beforeEach(() => {
    loginUsuarioModule = new LoginUsuarioModule();
  });

  it('should create an instance', () => {
    expect(loginUsuarioModule).toBeTruthy();
  });
});
