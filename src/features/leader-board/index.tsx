import React, {useCallback} from 'react';
import {View, Text, Colors} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';

import {Button} from '../../components';
import {RootStackParamList} from '../../types';

export const LeaderBoard = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const backHandle = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return (
    <View flex useSafeArea>
      <View flex>
        <View style={styles.top} flex marginT-20>
          <Text center style={styles.title} text40>
            Highest Scores
          </Text>
          <View marginV-20 marginH-20>
            <View row spread>
              <View row>
                <Text style={styles.rank} marginR-10 text60>
                  01
                </Text>
                <Text style={styles.name} text60>
                  Iswan
                </Text>
              </View>
              <Text style={styles.score} text60>
                2000
              </Text>
            </View>
          </View>
        </View>
        <View paddingH-20>
          <Button label="Back" onPress={backHandle} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Colors.grey10,
    textTransform: 'uppercase',
    fontWeight: 'normal',
  },
  top: {
    justifyContent: 'flex-start',
  },
  rank: {
    fontWeight: 'normal',
  },
  name: {
    fontWeight: 'normal',
  },
  score: {
    fontWeight: 'normal',
  },
});
