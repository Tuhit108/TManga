import * as React from "react";
import { memo, useCallback, useState } from "react";
import styled from "styled-components/native";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { statusBarHeight } from "@/themes/styles";
import Modal from "react-native-modal";
import { useMember, useMemberIds } from "@/store/member";
import { IC_CHECK, IC_MEMBER, IMG_ADD_MEMBER } from "@/assets";
import useBoolean from "@/hooks/useBoolean";
import FastImage from "react-native-fast-image";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

interface Props {
  params: any;
  setParams: (prev: any) => void;
  keyName: string;
  title: string;
}

interface ItemProps {
  id: string;
  list: string[];
  setList: (prev: any) => void;
}

interface MemberProps {
  avatar: string;
  name: string;
  check: boolean;
  setCheck: (prev: any) => void;
}

const MemberItemComponent = (props: MemberProps) => {
  const { avatar, name, check, setCheck } = props;
  return (
    <ItemView>
      <ItemAvatar source={{ uri: avatar }} />
      <ItemText>{name}</ItemText>
      <MemberCheckBox finished={check} onPress={() => setCheck(!check)}>
        {check ? <CheckIcon source={IC_CHECK} /> : null}
      </MemberCheckBox>
    </ItemView>

  );
};
const MemberItem = memo((props: ItemProps) => {
  const { id, list, setList } = props;
  const member = useMember(id);
  const [check, setCheck] = useState(list.includes(member.username));

  const itemOnPress = useCallback(() => {
    setCheck(!check);
    if (!check) {
      setList((prev: string[]) => {
        prev = [...new Set(prev.concat(member.username))];
        return prev;
      });
    }
    if (check) {
      setList((prev: string[]) => {
        prev = prev.filter((name: string) => name !== member.username);
        return prev;
      });
    }

  }, [list, check, member]);

  // const isChecked =

  return (
    <TouchableOpacity onPress={itemOnPress}>
      <MemberItemComponent avatar={member.gavatar} name={member.name} check={check} setCheck={setCheck} />
    </TouchableOpacity>
  );
});


export const AddMember = memo((props: Props) => {
  const { params, setParams, keyName, title } = props;
  const memberIds = useMemberIds();
  const [list, setList] = useState<string[]>([]);
  const [visible, setModalVisible, setHideModal] = useBoolean(false);

  const renderItem = useCallback(({ item, index }: { item: string, index: number }) => {
    return <MemberItem id={item} list={list} setList={setList} />;
  }, [params[keyName]]);

  const onAddPress = useCallback(() => {
    setParams((prev: any) => ({
      ...prev,
      [keyName]: list?.join(",") || ""
    }));
    setHideModal();
    console.log("hihhi");
  }, [list, params]);

  const keyExtractor = (item: any) => item.toString();

  return (
    <>
      <BottomModal
        animationInTiming={800}
        isVisible={visible}
      >
        <ModalView>
          <ListModalView>
            <Header>
              <TouchableOpacity onPress={onAddPress}>
                <Cancel>Thêm</Cancel>
              </TouchableOpacity>
              <HeaderText>{title}</HeaderText>
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
          <MemberName hasName={params.followers.length > 0}>{params.followers || title}</MemberName>
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

const ItemView = styled.View`
  height: 44px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 0.5px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  margin-left: 16px;
`;
const ItemAvatar = styled.Image`
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
const MemberIcon = styled.Image`
  width: 16px;
  height: 18px;
  tint-color: #333333;
  margin-left: 8px;
  margin-right: 8px;

`;
const MemberView = styled.View`
  flex-direction: row;
  align-items: center;
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

const MemberName = styled.Text<{ hasName?: string }>`
  width: 82%;
  padding: 5px;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  text-align: justify;
  color: ${(props: any) => (props.hasName ? "#333333" : "#BDBDBD")}
`;
const CheckIcon = styled.Image`
`;
const MemberCheckBox = styled.View <{ finished: boolean }>`
  background-color: ${(props: any) => (props.finished ? "#11D262" : "#ffffff")};
  width: 24px;
  height: 24px;
  margin-left: 16px;
  margin-right: 16px;
  border: 1px #BDBDBD;
  box-shadow: 0 7px 64px rgba(0, 0, 0, 0.07);
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0px;
`;




