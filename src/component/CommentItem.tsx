import * as React from "react";
import { memo, useCallback, useState } from "react";
import styled from "styled-components/native";
import { CustomModal } from "@/screens/TaskDetail/component/CustomModal";
import { Dimensions, TouchableOpacity } from "react-native";
import { IC_LIKE } from "@/assets";
import useBoolean from "@/hooks/useBoolean";

interface Props {
  account: string;
  comment: string;
  avatar: any;
  time: string;
  imageAttach: string | undefined;
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const CommentItem = memo((props: Props) => {
  const { avatar, comment, account, imageAttach, time } = props;
  const [modalVisible, setModalVisible] = useState(false);
  // const [modalVisible, showModal,hideModal] = useBoolean()
  const [icon, setIcon] = useState({
    id: 0,
    name: "",
    color: "",
    image: undefined
  });
  const [numberReaction, setNumberReaction] = useState(0);
  const itemOnPress = useCallback(() => {
    setModalVisible(!modalVisible);
    // showModal();
  }, [modalVisible]);
  const onLikePress = useCallback(() => {
    if (icon.name == "") {
      setIcon({
        id: 1, name: "Like", color: "#2A5B9C", image: IC_LIKE
      });
    }
  }, [icon.name]);

  return (
    <Container onLongPress={itemOnPress} delayLongPress={500}>
      <Avatar source={avatar} />
      <Content>
        <AccountName>{account}</AccountName>
        <CommentContent>{comment}</CommentContent>
        {imageAttach ? <AttachImage source={{ uri: imageAttach }} /> : null}

        <Bottom>
          <LeftBottom>
            <TouchableOpacity onPress={onLikePress}>
              <Reaction color={icon.color}>{icon.name || "like"}</Reaction>
            </TouchableOpacity>
            <Time>{time}</Time>
          </LeftBottom>

          {icon.image ?
            <RightBottom>
              <EmojiIcon source={icon.image} />
              <NumberReaction>{numberReaction + 1}</NumberReaction>
            </RightBottom>
            : null}

        </Bottom>
      </Content>
      <CustomModal visible={modalVisible} setModalVisible={setModalVisible} setIcon={setIcon}
      />
    </Container>
  );
});
const Container = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  margin-bottom: 10px;
  margin-top: 10px;
`;
const Avatar = styled.Image`
  margin-top: 10px;
`;
const Content = styled.View`
  margin-left: 10px;
`;
const AccountName = styled.Text`
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: 0.12px;
  color: #2A5B9C;
  margin-top: 12px;
`;
const CommentContent = styled.Text`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.12px;
  color: #333333;
  margin-top: 8px;
`;
const AttachImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-top: 10px;
`;
const Bottom = styled.View`
  margin-top: 15px;
  width: ${windowWidth - 32 - 52}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const LeftBottom = styled.View`
  flex-direction: row;
`;
const RightBottom = styled.View`
  flex-direction: row;
  align-items: center;
`;
const EmojiIcon = styled.Image`
  width: 20px;
  height: 20px;
`;
const NumberReaction = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  text-align: center;
  letter-spacing: 0.12px;
  color: #2F80ED;
  margin-left: 16px;

`;
const Reaction = styled.Text<{ color: any }>`
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: 0.12px;
  color: ${(props: any) => (props.color ? props.color : "#828282")};
`;
const Time = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: 0.12px;
  color: #828282;`;


