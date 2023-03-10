import React, {useCallback} from 'react';
import {View, Text, Colors} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {Button} from '../../components';
import {useNavigation, NavigationProp} from '@react-navigation/native';

import {RootStackParamList} from '../../types';

import {useSelector} from 'react-redux';
import {UserState} from '../../store/user';

export const Home: React.FC = () => {
  const data = useSelector((state: {user: UserState}) => state.user);
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const handleShowLeaderBoard = useCallback(() => {
    navigate('LeaderBoard');
  }, [navigate]);
  const handleStartGame = useCallback(() => {
    navigate('CategorySelect');
  }, [navigate]);

  return (
    <View flex useSafeArea>
      <View flex-2>
        <View style={styles.top} flex>
          <View paddingH-20 paddingT-80 center>
            <Text center style={styles.title} text30>
              Word Puzzle
            </Text>
          </View>
          <View marginT-60 center>
            <Text text50>{data?.user?.fullName}</Text>
            <Text style={styles.score} text10>
              {data?.user?.score}
            </Text>
            <Text style={styles.scoreTitle} text50>
              Score
            </Text>
            <Button
              textStyle={styles.linkBtn}
              label="Show LeaderBoard"
              onPress={handleShowLeaderBoard}
              link
            />
          </View>
        </View>
        <View paddingH-20 style={styles.bottom} flex-1>
          <Button label="Start" onPress={handleStartGame} />
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
});
