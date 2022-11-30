import * as React from "react";
import { memo, useCallback, useState } from "react";
import styled from "styled-components/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { IC_CALENDAR } from "@/assets";
import { RawAddParams } from "@/screens/CreateTask/CreateTask";
import useBoolean from "@/hooks/useBoolean";

interface Props {
  title: string;
  params: RawAddParams;
  setParams: (prev: any) => void;
  keyName: string;
}

export const AddDate = memo((props: Props) => {
  const { title, params, setParams, keyName } = props;

  const [date, setDate] = useState("");
  const [openModal, setOpenModal, setHideModal] = useBoolean(false);

  const dateOnConfirm = useCallback((date: string) => {
    setDate(date);
    if (keyName=="deadline"){
      setParams((prev: any) => ({
        ...prev,
        [keyName]: date,
        has_deadline : 1
      }));
    }
    else {
      setParams((prev: any) => ({
        ...prev,
        [keyName]: date
      }));
    }
    setHideModal();
  }, [openModal, date]);

  const onConfirm = useCallback((date: any) => {
    dateOnConfirm(date.toLocaleDateString());
  }, []);

  return (
    <DateView onPress={setOpenModal}>
      <DateTimePickerModal
        isVisible={openModal}
        mode="date"
        onConfirm={onConfirm}
        onCancel={setHideModal}
      />
      <DateText hasDate={date}>{date || title}</DateText>
      <CalendarIcon source={IC_CALENDAR} />
    </DateView>
  );
});

const DateView = styled.TouchableOpacity`
  border-radius: 6px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
const DateText = styled.Text<{ hasDate?: string }>`
  padding: 5px;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  text-align: justify;
  letter-spacing: 0.12px;
  color: ${(props: any) => (props.hasDate ? "#333333" : "#BDBDBD")}
`;
const CalendarIcon = styled.Image`
  width: 24px;
  height: 24px;
  tint-color: #828282;
`;

