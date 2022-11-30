import * as React from "react";
import { memo, useCallback } from "react";
import styled from "styled-components/native";
import { IC_CHECK } from "@/assets";

interface Props {
  isChecked: boolean;
  setChecked: (prev: any) => void;
}

export const CheckBox = memo((props: Props) => {
  const { isChecked, setChecked } = props;
  const onPress = useCallback(() => {
    setChecked(!isChecked);
  },[isChecked])
  return (
    <ItemCheckBox finished={isChecked} onPress={onPress} {...props} >
      {isChecked ? <CheckIcon source={IC_CHECK} /> : null}
    </ItemCheckBox>
  );
});
const ItemCheckBox = styled.TouchableOpacity <{ finished: boolean }>`
  background-color: ${(props: any) => (props.finished ? "#11D262" : "#F2F2F2")};
  width: 24px;
  height: 24px;
  margin-left: 16px;
  margin-right: 16px;
  border: 1px #BDBDBD;
  box-shadow: 0 7px 64px rgba(0, 0, 0, 0.07);
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`;
const CheckIcon = styled.Image`
`;
