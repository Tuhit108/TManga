import * as React from "react";
import { useCallback, useState } from "react";
import styled from "styled-components/native";
import { IC_CHECK_LIST, IMG_ADD_SQUARE } from "@/assets";
import { DropDown } from "@/screens/TaskDetail/component/DropView";
import { CheckBox } from "@/component/CheckBox";
import { Checklist } from "@/types";

interface Props {
  itemList: Checklist[] | undefined;
}

interface CheckProps {
  item: any;
}

const SubCheckItem = (props: CheckProps) => {
  const [checked, setChecked] = useState(false);
  const { item } = props;
  return (
    <CheckItem>
      <CheckListCheckBox isChecked={checked} setChecked={setChecked} />
      <CheckName finished={checked}>{item.name}</CheckName>
    </CheckItem>
  );

};

export const CheckList = (props: Props) => {
  const { itemList } = props;

  const CheckContent = useCallback(() => {
    return (
      <CheckListContent>
        {itemList?.map((check_item: any) => (<>
          <CheckListItem key={check_item.id}>
            <NumOfCheckList>{"# " + check_item.name}</NumOfCheckList>
            <AddTaskView>
              <BottomRight source={IMG_ADD_SQUARE} />
              <AddTaskText>Thêm check list</AddTaskText>
            </AddTaskView>
            {check_item.items.map((item: any) => (
              <SubCheckItem key={item.id} item={item} />
            ))}

          </CheckListItem>
        </>))}

      </CheckListContent>
    );
  }, []);
  const CheckLabel = useCallback(() => {
    return (
      <HeaderLabelView>
        <HeaderLabelItem>
          <HeaderLabelText>Add check list</HeaderLabelText>
          <HeaderLabelIcon source={IC_CHECK_LIST} />
        </HeaderLabelItem>
      </HeaderLabelView>
    );
  }, []);

  return (
    <Container>
      <DropDown name={"CHECK LIST"} content={CheckContent} labelHeader={CheckLabel} />
    </Container>
  );
};

const Container = styled.View`
`;
const CheckListContent = styled.View`
  padding-left: 16px;
  padding-right: 16px;
`;
const CheckListItem = styled.View`
`;
const NumOfCheckList = styled.Text`
  height: 36px;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.12px;
  text-transform: uppercase;
  color: #333333;
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
const CheckListCheckBox = styled(CheckBox)`
  border-radius: 50px;
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
const HeaderLabelView = styled.View`
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;
`;
const HeaderLabelItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const HeaderLabelText = styled.Text`
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  text-align: right;
  letter-spacing: 0.12px;
  color: #828282;
  margin-right: 2px;
`;
const HeaderLabelIcon = styled.Image`
  margin-left: 6px`;

const BottomRight = styled.Image`
  width: 24px;
  height: 24px`;

