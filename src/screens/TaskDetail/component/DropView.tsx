import * as React from "react";
import { memo, useCallback, useState } from "react";
import styled from "styled-components/native";

import { IC_DROP } from "@/assets";

interface Props {
  name: string;
  content: () => JSX.Element;
  labelHeader?: () => JSX.Element | undefined;

}

export const DropDown = memo((props: Props) => {
  const [showContent, setShowContent] = useState(false);
  const { name, content, labelHeader } = props;
  const onPressDrop = useCallback(() => {
    setShowContent(!showContent);
  }, [showContent]);
  return (
    <Container>
      <SectionHeader>
        <Dropdown onPress={onPressDrop}>
          <DropIcon source={IC_DROP} style={{ transform: [{ rotate: showContent ? "0deg" : "-90deg" }] }} />
          <DropText>{name}</DropText>
        </Dropdown>
        {labelHeader && labelHeader()}
      </SectionHeader>
      {showContent ? content() : null}
    </Container>
  );
});
const Container = styled.View`

`;
const SectionHeader = styled.View`
  height: 44px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Dropdown = styled.TouchableOpacity`
  height: 100%;
  flex-direction: row;
  align-items: center;
`;
const DropIcon = styled.Image`
  margin: 0 10px 0 16px;
  width: 10px;
  height: 5px;
`;
const DropText = styled.Text`
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: 0.08px;
  color: #2A5B9C;
`;
