import * as React from "react";
import { memo, useMemo, useState } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { IC_RED_CLOCK, IMG_ADD_DEFAULT } from "@/assets";
import { CheckBox } from "@/component/CheckBox";

interface Props {
  taskName: string;
  date: string;
  avatar: string;
  status: boolean;
  userId: string;
}

export const TaskItem =memo((props: Props) => {
  const { taskName, date, avatar, status, userId } = props;
  const [isFinished, setFinished] = useState(status);
  return (
    <ListView>
      <LeftItemView>
        <CheckBox isChecked={isFinished} setChecked={setFinished} />
        <ItemView>
          <ItemNameText numberOfLines={1} finished={isFinished}>
            {taskName}
          </ItemNameText>
          <ItemInformationView>
            <ClockIcon source={IC_RED_CLOCK} finished={isFinished} />
            <ItemDateText finished={isFinished}>{date}</ItemDateText>
            {/*{isEmergency ?*/}
            {/*  <WarningView>*/}
            {/*    <WarningText>Khẩn cấp</WarningText>*/}
            {/*  </WarningView>*/}
            {/*  : null}*/}
          </ItemInformationView>
        </ItemView>
      </LeftItemView>
      <TouchableOpacity>
        <ItemImage
          source={userId.length > 1 ? { uri: avatar } : IMG_ADD_DEFAULT}
        />
      </TouchableOpacity>
    </ListView>
  );
});


const ListView = styled.View`
  flex-direction: row;
  width: 100%;
  height: 64px;
  justify-content: space-between;
  align-items: center;
  border-bottom-color: #F5F5F5;
  border-bottom-width: 1px;
`;
const LeftItemView = styled.View`
  flex-direction: row;
  align-items: center;
`;
const ItemView = styled.View`
  width: 70%;
`;
const ItemImage = styled.Image`
  margin-right: 16px;
  width: 28px;
  height: 28px;
  border-radius: 50px;
`;
const ItemNameText = styled.Text<{ finished: boolean }>`
  text-decoration: ${(props: any) => (props.finished ? "line-through" : null)};
  text-decoration-color: #11D262;
  font-weight: 400;
  font-size: 15px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: ${(props: any) => (props.finished ? "#11D262" : "#333333")};
`;
const ItemInformationView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 7px;
`;
const ClockIcon = styled.Image<{ finished: boolean }>`
  width: 12px;
  height: 12px;
  margin-right: 6px;
  tint-color: ${(props: any) => (props.finished ? "#BBBBBB" : "#EB5757")}
`;
const ItemDateText = styled.Text<{ finished: boolean }>`
  font-weight: 400;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: ${(props: any) => (props.finished ? "#BDBDBD" : "#EB5757")};
`;


