import { CompraMesModule } from './compra-mes.module';

describe('CompraMesModule', () => {
  let compraMesModule: CompraMesModule;

  beforeEach(() => {
    compraMesModule = new CompraMesModule();
  });

  it('should create an instance', () => {
    expect(compraMesModule).toBeTruthy();
  });
});
