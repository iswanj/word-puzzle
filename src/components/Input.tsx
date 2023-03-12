import React from 'react';
import {View, Text, Colors, TextField} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';

interface Props {
  label: string;
  error: any;
  placeholder: string;
  secureTextEntry?: boolean;
  field: {
    onChange: (value: string) => void;
    onBlur: () => void;
    value: string;
  };
}

export const Input: React.FC<Props> = ({
  label,
  error,
  placeholder,
  secureTextEntry = false,
  field: {onChange, onBlur, value},
}) => {
  return (
    <View marginB-20>
      <View marginB-5>
        <Text style={styles.legend}>{label}</Text>
      </View>
      <View style={styles.fieldSet}>
        <TextField
          style={styles.inputText}
          containerStyle={styles.input}
          placeholder={placeholder}
          onChangeText={onChange}
          placeholderTextColor={Colors.grey}
          fieldStyle={styles.withFrame}
          value={value}
          onBlur={onBlur}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={secureTextEntry}
        />
      </View>
      {error ? (
        <Text marginH-20 marginT-4 error>
          {error.message}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  fieldSet: {
    flexDirection: 'column',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.grey1,
  },
  legend: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: Colors.black,
    backgroundColor: Colors.lightYellow,
    paddingHorizontal: 4,
  },
  input: {
    marginBottom: 0,
    padding: 0,
    borderBottomWidth: 0,
    paddingVertical: 18,
    paddingHorizontal: 17,
  },
  withFrame: {
    borderWidth: 0,
    borderColor: Colors.$outlineDisabledHeavy,
    borderRadius: 2,
    marginBottom: 0,
  },
  inputText: {
    fontSize: 20,
  },
  rightBtnStyle: {
    paddingTop: 8,
    paddingRight: 8,
  },
});
