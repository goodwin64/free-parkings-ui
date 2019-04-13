import { prepareParkings } from './adapters';

describe('prepareParkings adapter', () => {
  it('should create default Parkings object if falsy response passed', () => {
    expect(prepareParkings()).toEqual({
      allParkings: [],
      freeParkings: [],
    });
  });
});
