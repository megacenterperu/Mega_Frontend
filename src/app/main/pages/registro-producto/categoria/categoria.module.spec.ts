import { CategoriaModule } from './categoria.module';

describe('CategoriaModule', () => {
  let categoriaModule: CategoriaModule;

  beforeEach(() => {
    categoriaModule = new CategoriaModule();
  });

  it('should create an instance', () => {
    expect(categoriaModule).toBeTruthy();
  });
});
