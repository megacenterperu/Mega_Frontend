import { SubMenuModule } from './sub-menu.module';

describe('SubMenuModule', () => {
  let subMenuModule: SubMenuModule;

  beforeEach(() => {
    subMenuModule = new SubMenuModule();
  });

  it('should create an instance', () => {
    expect(subMenuModule).toBeTruthy();
  });
});
