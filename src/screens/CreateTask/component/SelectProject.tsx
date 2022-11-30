import * as React from "react";
import { memo, useCallback, useState } from "react";
import styled from "styled-components/native";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { statusBarHeight } from "@/themes/styles";
import Modal from "react-native-modal";
import { useProject, useProjectIds } from "@/store/project";
import { RawProject } from "@/types";
import { IC_CHECK, IC_DROP } from "@/assets";
import useBoolean from "@/hooks/useBoolean";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

interface Props {
  params: any;
  setParams: (prev: any) => void;
  keyName: string;
}

interface ItemProps {
  id: string;
}


export const SelectProject = memo((props: Props) => {
  const projectsIds = useProjectIds();
  const [name, setName] = useState("");
  const [visible, setModalVisible, setHideModal] = useBoolean(false);
  const { params, setParams, keyName } = props;

  const itemOnPress = useCallback((project: RawProject) => {
    setName(project.name);
    setParams((prev: any) => ({
      ...prev,
      [keyName]: project.id,
      tasklist_id: ""
    }));
    setHideModal();
  }, [name, params]);


  const ProjectItem = useCallback((props: ItemProps) => {
    const { id } = props;
    const project = useProject(id);
    const onPress = () => {
      itemOnPress(project);
    };
    return (
      project?.acl.task_create == 1 ?
        <ItemView onPress={onPress}>
          <ItemText numberOfLines={1}>{project.name}</ItemText>
          {name == project.name ? <CheckIcon source={IC_CHECK} /> : null}
        </ItemView>

        : <></>
    );
  }, [name]);

  const renderItem = useCallback(({ item, index }: { item: string, index: number }) => {
    return <ProjectItem id={item} />;
  }, [name]);
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
              <HeaderText>Chọn dự án</HeaderText>
              <TouchableOpacity onPress={setHideModal}>
                <Cancel>Huỷ</Cancel>
              </TouchableOpacity>
            </Header>
            <FlatList
              removeClippedSubviews={true}
              data={projectsIds}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
          </ListModalView>
        </ModalView>
      </BottomModal>
      <SelectView onPress={setModalVisible}>
        <ProjectName hasName={name}>{name || "Chọn dự án"}</ProjectName>
        <DropIcon source={IC_DROP} />
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

const ItemView = styled.TouchableOpacity`
  height: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 0.5px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  margin-left: 16px;
  margin-right: 16px;
`;
const CheckIcon = styled.Image`
  tint-color: blue;
`;
const ItemText = styled.Text`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.12px;
  color: #333333;
  margin-top: 8px;

`;
const SelectView = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ProjectName = styled.Text<{ hasName?: string }>`
  padding: 5px;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  text-align: justify;
  letter-spacing: 0.12px;
  color: ${(props: any) => (props.hasName ? "#333333" : "#BDBDBD")}
`;
const DropIcon = styled.Image``;




