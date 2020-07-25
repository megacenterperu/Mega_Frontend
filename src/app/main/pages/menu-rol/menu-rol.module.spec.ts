import { MenuRolModule } from './menu-rol.module';

describe('MenuRolModule', () => {
  let menuRolModule: MenuRolModule;

  beforeEach(() => {
    menuRolModule = new MenuRolModule();
  });

  it('should create an instance', () => {
    expect(menuRolModule).toBeTruthy();
  });
});
