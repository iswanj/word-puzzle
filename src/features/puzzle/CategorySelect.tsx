import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Colors} from 'react-native-ui-lib';
import {Pressable, StyleSheet} from 'react-native';
import {Button} from '../../components';
import {useNavigation, NavigationProp} from '@react-navigation/native';

import {RootStackParamList} from '../../types';
import {getCategories} from '../../api';

const CategoryItem = ({
  item,
  selected,
  onPress,
}: {
  item: string;
  selected: string;
  onPress: (item: string) => void;
}) => {
  const handlePress = () => {
    onPress(item);
  };
  return (
    <Pressable
      style={[styles.categoryBtn, selected === item && styles.selected]}
      onPress={handlePress}>
      <Text style={styles.categoryText} text60>
        {item}
      </Text>
    </Pressable>
  );
};

export const CategorySelect: React.FC = () => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>('animals');
  useEffect(() => {
    const categoryList = getCategories();
    setCategories(categoryList);
  }, []);
  const gotoGame = useCallback(() => {
    navigate('PuzzleGame', {selected});
  }, [navigate, selected]);

  const handleSelect = useCallback((category: string) => {
    setSelected(category);
  }, []);
  return (
    <View flex useSafeArea>
      <View flex-2>
        <View style={styles.top} flex>
          <View paddingH-20 paddingT-80 center>
            <Text center style={styles.title} text30>
              Select a category
            </Text>
          </View>
          <View flex marginT-60 paddingH-20>
            <View centerH row>
              {categories.map((category: string) => (
                <CategoryItem
                  onPress={handleSelect}
                  key={category}
                  item={category}
                  selected={selected}
                />
              ))}
            </View>
          </View>
        </View>
        <View paddingH-20 style={styles.bottom} flex-1>
          <Button label="Next" onPress={gotoGame} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Colors.grey10,
    textTransform: 'uppercase',
  },
  score: {
    color: Colors.grey20,
  },
  scoreTitle: {
    textTransform: 'uppercase',
  },
  top: {
    justifyContent: 'space-between',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
  linkBtn: {
    textDecorationLine: 'underline',
    textTransform: 'capitalize',
  },
  categoryBtn: {
    backgroundColor: Colors.green60,
    borderWidth: 2,
    borderColor: Colors.green60,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 1,
    marginRight: 4,
  },
  categoryText: {
    fontWeight: 'normal',
    textTransform: 'capitalize',
  },
  selected: {
    backgroundColor: Colors.green40,
    borderWidth: 2,
    borderColor: Colors.green20,
  },
});
