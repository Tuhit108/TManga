import * as React from "react";
import { memo, useCallback } from "react";
import styled from "styled-components/native";
import { Dimensions, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { IC_ANGRY, IC_CARE, IC_HAHA, IC_LIKE, IC_LOVE, IC_SAD, IC_WOW } from "@/assets";
import { statusBarHeight } from "@/themes/styles";
import Modal from "react-native-modal";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

interface ItemProps {
  visible: boolean;
  setModalVisible: (prev: any) => void;
  setIcon: (prev: any) => void;
}

export const CustomModal = memo((props: ItemProps) => {
  const { visible, setModalVisible, setIcon } = props;
  const hideModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const emojiList = [
    { id: 1, name: "Like", color: "#2A5B9C", image: IC_LIKE },
    { id: 2, name: "Love", color: "#D96C6C", image: IC_LOVE },
    { id: 3, name: "Haha", color: "#f7b125", image: IC_HAHA },
    { id: 4, name: "Care", color: "#f7b125", image: IC_CARE },
    { id: 5, name: "Wow", color: "#f7b125", image: IC_WOW },
    { id: 6, name: "Angry", color: "#e9710f", image: IC_ANGRY },
    { id: 7, name: "Sad", color: "#f7b125", image: IC_SAD }
  ];

  const emojiOnPress = useCallback((item: any) => {
    setIcon(item);
    hideModal();
  }, []);

  return (
    <>
      <BottomModal
        animationInTiming={600}
        isVisible={visible}
      >

        <ModalView>
          <ListModalView>
            <ListEmojiView>
              {emojiList.map((item) => (

                <TouchableOpacity key={item.id} onPress={() => emojiOnPress(item)}>
                  <EmojiItem source={item.image} />
                </TouchableOpacity>
              ))}
            </ListEmojiView>
            <ActionView>
              <ActionText>Chỉnh sửa nội dung</ActionText>
            </ActionView>
            <ActionView>
              <ActionText>Sao chép</ActionText>
            </ActionView>
            <ActionView>
              <ActionText>Xoá</ActionText>
            </ActionView>
          </ListModalView>
          <TouchableWithoutFeedback onPress={hideModal}>
            <CloseModalView></CloseModalView>
          </TouchableWithoutFeedback>
        </ModalView>
      </BottomModal>
    </>
  );

});

const CloseModalView = styled.View`
  height: ${windowHeight}px;
  width: ${windowWidth}px;
  position: relative;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
`;
const BottomModal = styled(Modal)`
  width: 100%;
  margin: 0;

`;
const ModalView = styled.View`
  height: ${windowHeight}px;

`;
const ListModalView = styled.View`
  position: absolute;
  z-index: 2;
  background-color: #ffffff;
  bottom: 0;
  width: ${windowWidth}px;
  padding-bottom: ${statusBarHeight}px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const ListEmojiView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom-width: 0.5px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
`;
const EmojiItem = styled.Image`
  width: 32px;
  height: 32px;
`;
const ActionView = styled.TouchableOpacity`
  height: 44px;
  justify-content: center;
`;
const ActionText = styled.Text`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.12px;
  color: #333333;
  margin-top: 8px;
  margin-left: 16px;
`;




