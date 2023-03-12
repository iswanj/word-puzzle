export const generateLetters = (word: string) => {
  // split the word into an array and change index to random position.
  const letters = word.split('');

  // get random 3 letters from alphabet into a array of characters
  const randomLetters = Array.from({length: 2}, () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 97),
  );

  // merge randomLetters with letters

  let randomWordArr = letters.concat(randomLetters);

  // shuffle the array.
  randomWordArr.sort(() => Math.random() - 0.5);

  return randomWordArr;
};
