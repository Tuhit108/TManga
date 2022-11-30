import * as React from "react";
import { memo, useCallback, useState } from "react";
import styled from "styled-components/native";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { statusBarHeight } from "@/themes/styles";
import Modal from "react-native-modal";
import { useMember, useMemberIds } from "@/store/member";
import { IC_CHECK, IC_MEMBER, IMG_ADD_MEMBER } from "@/assets";
import { RawMember } from "@/types";
import { RawAddParams } from "@/screens/CreateTask/CreateTask";
import FastImage from "react-native-fast-image";
import useBoolean from "@/hooks/useBoolean";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

interface Props {
  params: RawAddParams;
  setParams: (prev: any) => void;
  keyName: string;
  title: string;
}

interface ItemProps {
  id: string;

}


export const AddAssign = memo((props: Props) => {
  const { params, setParams, keyName, title } = props;
  const memberIds = useMemberIds();
  const [name, setName] = useState("");
  const [visible, setModalVisible, setHideModal] = useBoolean(false);

  const itemOnPress = useCallback((member: RawMember) => {
    setName(member.username);
    setParams((prev: any) => ({
      ...prev,
      assign: member.username
    }));
    setHideModal();
  }, [name, params]);

  const MemberItem = useCallback((props: ItemProps) => {
    const { id } = props;
    const member = useMember(id);
    const [check, setCheck] = useState(name == member.username);
    const onPress = () => {
      itemOnPress(member);
    };
    return (
      <Item onPress={onPress}>
        <ItemView>
          <ItemAvatar source={{ uri: member.gavatar }} />
          <ItemText>{member.name}</ItemText>
        </ItemView>
        {check ? <CheckIcon source={IC_CHECK} /> : null}
      </Item>
    );
  }, [name]);

  const renderItem = useCallback(({ item, index }: { item: string, index: number }) => {
    return <MemberItem id={item} />;
  }, [name]);

  const onCancelPress = useCallback(() => {
    setName("");
    setParams((prev: any) => ({
      ...prev,
      assign: ""
    }));
    setHideModal();
  }, [name, params]);
  const keyExtractor = (item: any) => item.toString();

  return (
    <>
      <BottomModal
        animationInTiming={800}
        animationOutTiming={800}
        isVisible={visible}
      >
        <ModalView>
          <ListModalView>
            <Header>
              <TouchableOpacity onPress={onCancelPress}>
                <Cancel>Bỏ chọn</Cancel>
              </TouchableOpacity>
              <TouchableOpacity onPress={setHideModal}>
                <Cancel>Huỷ</Cancel>
              </TouchableOpacity>
            </Header>
            <FlatList
              removeClippedSubviews={true}
              data={memberIds}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
          </ListModalView>
        </ModalView>
      </BottomModal>
      <SelectView onPress={setModalVisible}>
        <MemberView>
          <MemberIcon source={IC_MEMBER} />
          <MemberName hasName={name}>{name || "Giao cho"}</MemberName>
        </MemberView>
        <AddMemberIcon source={IMG_ADD_MEMBER} />
      </SelectView>
    </>
  );

});


const BottomModal = styled(Modal)`
  width: 100%;
  margin: 0;
`;
const Header = styled.View`
  flex-direction: row;
  margin-left: 16px;
  margin-right: 16px;
  justify-content: space-between;
  align-items: center;
  height: 44px;
`;
const HeaderText = styled.Text`
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 0.08px;
  color: #2A5B9C;
`;
const Cancel = styled.Text`
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.08px;
  color: #2A5B9C;
`;
const ModalView = styled.View`
  height: ${windowHeight}px;
`;
const ListModalView = styled.View`
  position: absolute;
  z-index: 2;
  background-color: #ffffff;
  bottom: 0;
  height: ${windowHeight}px;
  width: ${windowWidth}px;
  padding-bottom: ${statusBarHeight}px;
  padding-top: ${statusBarHeight}px;
`;
const Item = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 0.5px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  margin-left: 16px;
  margin-right: 16px;
`;
const ItemView = styled.View`
  height: 44px;
  flex-direction: row;
  align-items: center;

`;
const ItemAvatar = styled(FastImage)`
  width: 36px;
  height: 36px;
  border-radius: 100px;
  margin-right: 16px;
`;
const ItemText = styled.Text`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.12px;
  color: #333333;
  margin-top: 8px;

`;
const MemberView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MemberIcon = styled.Image`
  width: 16px;
  height: 18px;
  tint-color: #333333;
  margin-left: 8px;
  margin-right: 8px;

`;
const SelectView = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const AddMemberIcon = styled.Image`
  width: 24px;
  height: 24px
`;
const CheckIcon = styled.Image`
  tint-color: blue;
`;
const MemberName = styled.Text<{ hasName?: string }>`
  width: 82%;
  padding: 5px;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  text-align: justify;
  color: ${(props: any) => (props.hasName ? "#333333" : "#BDBDBD")}
`;




