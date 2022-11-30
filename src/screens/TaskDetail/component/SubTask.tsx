import * as React from "react";
import { useCallback, useState } from "react";
import styled from "styled-components/native";
import { IMG_ADD_SQUARE } from "@/assets";
import { DropDown } from "@/screens/TaskDetail/component/DropView";
import { CheckBox } from "@/component/CheckBox";
import { CachedSubtask } from "@/types";

interface Props {
  itemList: CachedSubtask[] | undefined;
}

interface SubTaskProps {
  item: any;
}

const SubCheckItem = (props: SubTaskProps) => {
  const [checked, setChecked] = useState(false);
  const { item } = props;
  return (
    <CheckItem>
      <SubTaskCheckBox isChecked={checked} setChecked={setChecked} />
      <CheckName finished={checked}>{item.name}</CheckName>
    </CheckItem>
  );
};
export const SubTask = (props: Props) => {
  const { itemList } = props;
  const subTaskContent = useCallback(() => {
    return (
      <SubTaskContent>
        <SubTaskItem>
          <AddTaskView>
            <BottomRight source={IMG_ADD_SQUARE} />
            <AddTaskText>Subtask</AddTaskText>
          </AddTaskView>
          {itemList?.map((item: any) => (
            <SubCheckItem key={item.id} item={item} />
          ))}
        </SubTaskItem>
      </SubTaskContent>
    );
  }, []);

  return (
    <Container>
      <DropDown name={"SUBTASK"} content={subTaskContent} />
    </Container>
  );
};

const Container = styled.View`
`;
const SubTaskContent = styled.View`
  padding-left: 16px;
  padding-right: 16px;
`;
const SubTaskItem = styled.View`
`;
const AddTaskView = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height: 44px;
`;
const AddTaskText = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: 0.12px;
  color: #BDBDBD;
  margin-left: 16px;
`;
const CheckItem = styled.View`
  flex-direction: row;
  align-items: center;
  height: 44px`;
const SubTaskCheckBox = styled(CheckBox)`
  border-radius: 6px;
  margin-left: 0;
  margin-right: 16px;
`;
const CheckName = styled.Text<{ finished: boolean }>`
  text-decoration: ${(props: any) => (props.finished ? "line-through" : null)};
  text-decoration-color: #11D262;
  font-weight: 400;
  font-size: 15px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: ${(props: any) => (props.finished ? "#11D262" : "#333333")};
`;
const BottomRight = styled.Image`
  width: 24px;
  height: 24px`;

