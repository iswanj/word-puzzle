import React from 'react';
import {Pressable, StyleSheet, StyleProp, TextStyle} from 'react-native';
import {Colors, Text, View} from 'react-native-ui-lib';

interface ButtonProps {
  label?: string;
  color?: string;
  background?: string;
  link?: boolean;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  label = 'Button',
  link = false,
  color,
  background,
  onPress,
  textStyle,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        background
          ? {...styles.btnWithTxt, backgroundColor: background}
          : link
          ? styles.link
          : styles.btn,
      ]}>
      <View row center>
        <Text style={[styles.font, textStyle]} color={color} text65M>
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 18,
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: Colors.grey20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnWithTxt: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderWidth: 2,
    borderColor: Colors.green20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  font: {
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});
