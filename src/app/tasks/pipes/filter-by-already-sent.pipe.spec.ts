import { FilterByAlreadySentPipe } from './filter-by-already-sent.pipe';

describe('FilterByAlreadySentPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterByAlreadySentPipe();
    expect(pipe).toBeTruthy();
  });
});
