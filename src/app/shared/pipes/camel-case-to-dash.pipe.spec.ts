import { CamelCaseToDashPipe } from './camel-case-to-dash.pipe';

describe('CamelCaseToDashPipe', () => {
  it('create an instance', () => {
    const pipe = new CamelCaseToDashPipe();
    expect(pipe).toBeTruthy();
  });
});
