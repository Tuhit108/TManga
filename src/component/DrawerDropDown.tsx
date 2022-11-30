import * as React from "react";
import { memo, useCallback, useState } from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import { IC_DROPDOWN } from "@/assets";

interface Props {
  name: string;
  list: { id: number; name: string; icon: any; }[];
}

export const DrawerDropDown = memo((props: Props) => {
  const { name, list } = props;
  const [showList, setShowList] = useState(false);
  const onShowList = useCallback(() => {
    setShowList(!showList);
  }, [showList]);

  return (
    <Container>
      <ListMenuView onPress={onShowList}>
        <DropdownText>
          {name}
        </DropdownText>
        <DownIconImage
          style={{ transform: [{ rotate: showList ? "0deg" : "-90deg" }] }}
          source={IC_DROPDOWN}
        />
      </ListMenuView>
      {showList ? (
        <View>
          {list.map(({ id, name, icon }) => (
            <CollectionItemView key={id}>
              <ListItemView>
                <ItemIconImage source={icon} />
                <ItemNameText> {name} </ItemNameText>
              </ListItemView>
            </CollectionItemView>
          ))}
        </View>
      ) : null}
    </Container>
  );
});
const Container = styled.View`
  margin-bottom: 1px;
`;
const ItemIconImage = styled.Image`
  margin-left: 20px;
  margin-right: 20px;
  tint-color: #FFFFFF
`;

const ItemNameText = styled.Text`
  font-size: 15px;
  font-weight: 400;
  color: #FFFFFF;
  align-self: center;
  line-height: 16px;
  letter-spacing: 0.12px;
`;
const ListMenuView = styled.TouchableOpacity`
  background: rgba(255, 255, 255, 0.1);
  height: 44px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ListItemView = styled.View`
  height: 44px;
  flex-direction: row;
  align-items: center;
`;
const DownIconImage = styled.Image`
  margin-left: 20px;
  margin-right: 16px;
  tint-color: #ffffff

`;
const DropdownText = styled.Text`
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  line-height: 16px;
  letter-spacing: 0.12px;
  text-transform: uppercase;
  margin-left: 20px;
`;

const CollectionItemView = styled.View`
  height: 40px;
  justify-content: center;

`;

