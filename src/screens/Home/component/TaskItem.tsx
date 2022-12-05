import * as React from "react";
import { memo, useMemo, useState } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { IC_RED_CLOCK, IMG_ADD_DEFAULT } from "@/assets";
import { CheckBox } from "@/component/CheckBox";
import { SlideFromRightIOS } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets";

interface Props {
  name: string;
  img: string;
  status: string
}

export const TaskItem =memo((props: Props) => {
  const { name, img,status } = props;
  return (
    <ListView>
        <LeftItemView>
          <BookImg source={{uri:img }}/>
        </LeftItemView>
        <RightItemView>
          <ItemName numberOfLines={2}>{name}</ItemName>
          <ItemStatus>{status}</ItemStatus>
        </RightItemView>
    </ListView>
  );
});


const ListView = styled.View`
  flex-direction: row;
  width: 100%;
  height: 148px;
  border-bottom-color: #F5F5F5;
  border-bottom-width: 1px;
  padding: 12px;
`;
const BookImg = styled.Image`
  height: 124px;
  width: 90px;
  border-radius: 8px;
`
const LeftItemView = styled.View`
  height: 100px;
`;
const RightItemView = styled.View`
  flex-direction: column;
  justify-content: space-between;
`;

const ItemName = styled.Text`
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 0.12px;
  padding-left: 12px;
  width:300px;
  color: red
`
const ItemStatus = styled.Text`
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.12px;
  padding-left : 12px;
`



