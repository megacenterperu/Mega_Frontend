import { PersonalAdminModule } from './personal-admin.module';

describe('PersonalAdminModule', () => {
  let personalAdminModule: PersonalAdminModule;

  beforeEach(() => {
    personalAdminModule = new PersonalAdminModule();
  });

  it('should create an instance', () => {
    expect(personalAdminModule).toBeTruthy();
  });
});
