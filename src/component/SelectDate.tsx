import * as React from "react";
import { memo, useCallback, useState } from "react";
import styled from "styled-components/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { IC_DETAIL_CALENDAR } from "@/assets";
interface Props {
  title: string;
}

export const SelectDate = memo((props: Props) => {
  const [date, setDate] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const dateOnPress = useCallback(() => {
    setOpenModal(true);
  }, [openModal]);
  const dateOnConfirm = useCallback((date: string) => {
    setDate(date);
    setOpenModal(false);
  }, [openModal, date]);
  return (
    <DateView onPress={dateOnPress}>
      <CalendarIcon source={IC_DETAIL_CALENDAR} />
      <DateTimePickerModal
        isVisible={openModal}
        mode="date"
        onConfirm={(date) => {
          dateOnConfirm(date.toLocaleDateString());
        }}
        onCancel={() => setOpenModal(false)}
      />
      <DateText>{date || props.title}</DateText>
    </DateView>
  );
});

const DateView = styled.TouchableOpacity`
  width: 146px;
  height: 36px;
  background: #EAEFF5;
  border-radius: 6px;
  align-items: center;
  flex-direction: row;
`;
const CalendarIcon = styled.Image`
  width: 16px;
  height: 16px;
  margin: 10px
`;
const DateText = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  text-align: center;
  letter-spacing: 0.12px;
  color: #BDBDBD;
`;

