import * as React from "react";
import { memo, useCallback } from "react";
import styled from "styled-components/native";
import { IC_ATTACH, IC_DOWNLOAD, IC_EDIT, IC_IMAGE } from "@/assets";
import { DropDown } from "@/screens/TaskDetail/component/DropView";
import { TouchableOpacity } from "react-native";

interface Props {
  content: string | undefined;
}

export const Description = memo((props: Props) => {
  const { content } = props;

  const descriptionContentV = useCallback(() => {
    return (
      <DescriptionContent>
        {content ? <DescriptionText>{content}</DescriptionText> : null}
        <AttachFileView>
          <BottomSectionView>
            <ImageIcon source={IC_IMAGE} />
            <BottomText>background.pn</BottomText>
          </BottomSectionView>
          <TouchableOpacity>
            <BottomRight source={IC_DOWNLOAD} />
          </TouchableOpacity>
        </AttachFileView>
      </DescriptionContent>
    );
  }, [content]);
  const descriptionLabel = useCallback(() => {
    return (
      <HeaderLabelView>
        <HeaderLabelItem>
          <HeaderLabelText>Compose</HeaderLabelText>
          <HeaderLabelIcon source={IC_EDIT} />
        </HeaderLabelItem>
        <HeaderLine></HeaderLine>
        <HeaderLabelItem>
          <HeaderLabelText>Choose file</HeaderLabelText>
          <HeaderLabelIcon source={IC_ATTACH} />
        </HeaderLabelItem>
      </HeaderLabelView>
    );
  }, []);

  return (
    <Container>
      <DropDown name={"DESCRIPTION"} content={descriptionContentV} labelHeader={descriptionLabel} />
    </Container>
  );
});

const Container = styled.View`
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
const HeaderLine = styled.View`
  width: 1px;
  height: 20px;
  background: rgba(42, 91, 156, 0.6);
  margin-left: 10px;
  margin-right: 10px;
`;
const DescriptionContent = styled.View`
  margin-bottom: 10px;
`;
const DescriptionText = styled.Text`
  margin: 10px 16px;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  text-align: justify;
  letter-spacing: 0.12px;
  color: #333333;

`;
const AttachFileView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  height: 36px;
`;
const BottomSectionView = styled.View`
  flex-direction: row;
  align-items: center;
`;
const BottomLeftIcon = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;
const ImageIcon = styled(BottomLeftIcon)`
  width: 16px;
  height: 16px;
`;

const BottomText = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: 0.12px;
  color: #828282;
`;
const BottomRight = styled.Image`
  width: 24px;
  height: 24px`;

