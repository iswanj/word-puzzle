import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Colors} from 'react-native-ui-lib';
import {FlatList, StyleSheet} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';

import {Button} from '../../components';
import {RootStackParamList} from '../../types';

import {getUsers} from '../../api/users';
import {User} from '../../types';

const Item = ({item, index}: {item: User; index: number}) => (
  <View row spread>
    <View flex row>
      <Text style={styles.rank} marginR-10 text60>
        {index + 1}
      </Text>
      <Text style={styles.name} text60>
        {item.fullName}
      </Text>
    </View>
    <Text style={styles.score} text60>
      {item.score}
    </Text>
  </View>
);

export const LeaderBoard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await getUsers();
      setUsers(userList);
    };
    fetchUsers();
  }, []);

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
            <FlatList
              data={users}
              renderItem={({item, index}) => <Item item={item} index={index} />}
              keyExtractor={item => item.id}
            />
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
