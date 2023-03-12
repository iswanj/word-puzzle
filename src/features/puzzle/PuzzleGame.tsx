import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Colors} from 'react-native-ui-lib';

import {Image, Pressable, StyleSheet} from 'react-native';
import {generateLetters} from '../../utils/game';
import {Button} from '../../components';

import _ from 'lodash';
import {getWordsByCategory} from '../../api';

type SelectedCharacter = {
  value: string;
  index: number;
};

interface LetterItemProps {
  letter: string;
  index: number;
  handleLetterSelection: (letter: string, index: number) => void;
  selectedCharacters: SelectedCharacter[];
}

const LetterItem: React.FC<LetterItemProps> = ({
  letter,
  index,
  handleLetterSelection,
  selectedCharacters = [],
}) => {
  const handleClick = useCallback(() => {
    if (!_.some(selectedCharacters, {value: letter, index})) {
      handleLetterSelection(letter, index);
    }
  }, [handleLetterSelection, index, letter, selectedCharacters]);
  return (
    <Pressable
      key={index}
      style={[
        styles.key,
        _.some(selectedCharacters, {value: letter, index}) && styles.selected,
      ]}
      onPress={handleClick}>
      <Text style={styles.keyText} text40>
        {letter}
      </Text>
    </Pressable>
  );
};

export const PuzzleGame = () => {
  const [word, setWord] = useState<string[]>([]);
  const [words, setWords] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [selectedCharacters, setSelected] = useState<SelectedCharacter[]>([]);

  useEffect(() => {
    const wordList = getWordsByCategory('food');
    const letters = generateLetters(wordList[page]);
    console.log('letters***', letters);
    setWord(letters);
    setWords(wordList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const checkWord = useCallback(() => {
    const joinedWord = selectedCharacters.map(item => item.value).join('');

    return words[page] === joinedWord;
  }, [page, selectedCharacters, words]);

  const handleLetterSelection = useCallback(
    (value: string, index: number) => {
      if (checkWord()) {
        return;
      }
      setSelected([...selectedCharacters, {index, value}]);
    },
    [checkWord, selectedCharacters],
  );

  const clearSelected = useCallback(() => {
    setSelected([]);
  }, []);

  const handleNext = useCallback(() => {
    // submit result to the server
    if (page < 5) {
      const letters = generateLetters(words[page + 1]);
      setWord(letters);
      setPage(page + 1);
      clearSelected();
    }
  }, [page, words, clearSelected]);

  return (
    <View flex useSafeArea>
      <View flex paddingH-20>
        <View flex>
          <View marginT-30 centerH>
            <Text text60>Score</Text>
            <Text style={styles.score} text30>
              1000
            </Text>
            <View centerH marginT-20>
              <Text text70>Words</Text>
              <Text text70>{page + 1}/5</Text>
            </View>
          </View>
          <View marginT-20 row centerH style={styles.word}>
            {word.map((letter, index) => (
              <LetterItem
                key={index}
                letter={letter}
                index={index}
                selectedCharacters={selectedCharacters}
                handleLetterSelection={handleLetterSelection}
              />
            ))}
          </View>
          <View marginT-10>
            <Text text70 center>
              Tap on the letters to create a word
            </Text>
          </View>
          <View style={styles.result} centerV marginT-40 paddingH-5 centerH>
            <Text style={styles.keyText} text30>
              {selectedCharacters.map(item => item.value).join('')}
            </Text>
          </View>
          <View centerH marginT-6>
            {checkWord() ? (
              <Image source={require('../../assets/images/accept.png')} />
            ) : (
              <Button label="clear" link onPress={clearSelected} />
            )}
          </View>
        </View>
        <View row right>
          <Button
            label="Finish"
            background={Colors.green50}
            onPress={() => {}}
          />
          {page < 4 && <Button label="Next" onPress={handleNext} />}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  score: {
    fontWeight: 'normal',
  },
  word: {
    flexWrap: 'wrap',
    gap: 8,
  },
  key: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.green60,
    borderWidth: 1,
    borderColor: Colors.green20,
    borderRadius: 4,
  },
  keyText: {
    fontWeight: 'normal',
    textTransform: 'uppercase',
  },
  result: {
    backgroundColor: Colors.green70,
    borderColor: Colors.green40,
    borderWidth: 1,
    height: 70,
  },
  selected: {
    backgroundColor: Colors.green40,
    borderColor: Colors.green10,
    borderWidth: 1,
  },
});
