import * as React from "react";
import { memo } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { openDrawer } from "@/utils/navigation";
import { IC_MENU, IC_OPTION } from "@/assets";
import { statusBarHeight } from "@/themes/styles";

interface Props {
  title: string;
}

export const TabHeader = memo((props: Props) => {
  const { title } = props;
  return (
    <HeaderView>
      <TouchableOpacity
        onPress={openDrawer}>
        <MenuImage source={IC_MENU} />
      </TouchableOpacity>
      <HeaderText>{title}</HeaderText>
      <TouchableOpacity>
        <OptionImage source={IC_OPTION} />
      </TouchableOpacity>
    </HeaderView>
  );
});
const HeaderView = styled.View`
  height: ${statusBarHeight + 44}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #2A5B9C;
  padding-top: ${statusBarHeight}px;
`;
const MenuImage = styled.Image`
  height: 28px;
  width: 28px;
  margin-left: 16px;
  tint-color: #ffffff
`;
const OptionImage = styled.Image`
  width: 28px;
  height: 28px;
  margin-right: 16px;
`;
const HeaderText = styled.Text`
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  letter-spacing: -0.41px;
  color: rgba(255, 255, 255, 0.54);
`;
