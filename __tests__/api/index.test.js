import {
  getWordsByCategory,
  getCategories,
  CATEGORIES,
} from '../../src/api/index';

describe('getWordsByCategory', () => {
  it('returns an empty array when no category is provided', () => {
    expect(getWordsByCategory('')).toEqual([]);
  });

  it('returns an array of 5 words when a category is provided', () => {
    const words = getWordsByCategory('animals');
    expect(words).toHaveLength(5);
    words.forEach(word => {
      expect(CATEGORIES.animals).toContain(word);
    });
  });
});

describe('getCategories', () => {
  it('returns an array of category names', () => {
    const categories = getCategories();
    expect(categories).toContain('animals');
    expect(categories).toContain('cities');
    expect(categories).toContain('food');
  });
});
