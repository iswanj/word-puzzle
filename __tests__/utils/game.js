import {generateLetters} from '../../src/utils/game';

describe('generateLetters', () => {
  test('returns an array of letters that includes the original word and two random letters', () => {
    const word = 'hello';
    const generatedLetters = generateLetters(word);
    expect(generatedLetters).toContain('h');
    expect(generatedLetters).toContain('e');
    expect(generatedLetters).toContain('l');
    expect(generatedLetters).toContain('o');
    expect(generatedLetters).not.toContain('ll');
    // new word length should combination of word.lenght and 2 random characters
    expect(generatedLetters.length).toEqual(word.length + 2);
  });
});
