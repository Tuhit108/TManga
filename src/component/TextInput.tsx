import React, { memo, useCallback } from "react";
import styled from "styled-components/native";
import { KeyboardType, TextInputProps } from "react-native";


const STextInput = styled.TextInput.attrs({
  placeholderTextColor: "#616161"
})`
  font-size: 15px;
  width: 180px;
  margin-left: 16px;
  padding: 5px;
`;

interface Props extends TextInputProps {
  keyboardType?: KeyboardType;
  secureTextEntry?: boolean;
  placeHolder: string;
  onChangeValue: (keyName: string, value: string) => void;
  keyName: string;
}

const CustomTextInput = (props: Props) => {
  const { placeHolder, onChangeValue, keyName, keyboardType, secureTextEntry } = props;

  const onChange = useCallback(
    (text: string) => {
      onChangeValue(keyName, text);
    },
    [keyName, onChangeValue]
  );

  return (

    <STextInput
      {...props}
      onChangeText={onChange}
      placeholder={placeHolder}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default memo(CustomTextInput);
