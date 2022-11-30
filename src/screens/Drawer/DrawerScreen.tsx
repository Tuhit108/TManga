import * as React from "react";
import { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Alert, FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import { statusBarHeight } from "@/themes/styles";
import { IC_CIRCLE, IC_DROPDOWN, IC_LIST, IC_MEMBER, IC_PAGE, IC_TASK } from "@/assets";
import { DrawerDropDown } from "@/component/DrawerDropDown";
import { useUser } from "@/store/constant";
import { useProject, useProjectIds } from "@/store/project";
import useAsyncFn from "@/hooks/useAsyncFn";
import { requestGetProjectList } from "@/store/project/functions";
import { requestLogout } from "@/store/constant/funtions";
import { reset } from "@/utils/navigation";


interface ItemProps {
  id: string;
}

const ProjectItem = (props: ItemProps) => {
  const { id } = props;
  const project = useProject(id);


  return (
    <CollectionItemView>
      <ListItemView>
        <ItemIconImage source={IC_CIRCLE} />
        <ItemNameText numberOfLines={1}> {project.name} </ItemNameText>
      </ListItemView>
    </CollectionItemView>
  );
};


const DrawerScreen = () => {
  const user = useUser();
  const projectsIds = useProjectIds();
  const [showList, setShowList] = useState(false);
  const onShowList = useCallback(() => {
    setShowList(!showList);
  }, [showList]);

  const [{ loading }, getListProject] = useAsyncFn(async () => {
    if (loading) {
      return;
    }
    const projectParams = {
      access_token: user.access_token,
      client_key: user.client_key,
      __code: "native",
      client_auth: "1"

    };
    const res = await requestGetProjectList(projectParams);

  }, [user]);
  const onLogout = useCallback(async () => {
    const logoutParams = {
      client_key: user.client_key,
      client_secret: user.client_secret,
      __code: "native",
      client_auth: "1",
      user_id: user.id
    };
    const res = await requestLogout(logoutParams);
    if (res) {
      reset();
    }

  }, [user]);
  const onLogoutOnPress = useCallback(() => {
    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc muốn đăng xuất",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => onLogout() }
      ]
    );
  }, []);

  useEffect(() => {
    getListProject().then();

  }, []);
  // @ts-ignore
  const renderItem = useCallback(({ item, index }) => {
    return <ProjectItem id={item} />;
  }, []);

  return (
    <WrapperView>
      <DrawerHeaderView>
        <ChildView>
          <AvatarImage
            source={{ uri: user?.avatar }}
          />
          <UserView>
            <UserNameText>
              {user?.name}
            </UserNameText>
            <UserPhoneText>
              UI/UX
            </UserPhoneText>
          </UserView>
        </ChildView>
      </DrawerHeaderView>
      <ScrollView nestedScrollEnabled={true}>
        <DrawerContentView>
          <DrawerDropDown name={"TỔNG HỢP"} list={menuLists} />
        </DrawerContentView>
        <DrawerContentView>
          <ListMenuView onPress={onShowList}>
            <DropdownText>
              DỰ ÁN
            </DropdownText>
            <DownIconImage
              style={{ transform: [{ rotate: showList ? "0deg" : "-90deg" }] }}
              source={IC_DROPDOWN}
            />
          </ListMenuView>
          {showList ? (
            <View>
              <FlatList
                nestedScrollEnabled={true}
                removeClippedSubviews={true}
                data={projectsIds}
                renderItem={renderItem}
              />
            </View>
          ) : null}
        </DrawerContentView>
        <TouchableOpacity onPress={onLogoutOnPress}>
          <LogoutText>Logout</LogoutText>
        </TouchableOpacity>
      </ScrollView>
    </WrapperView>
  );
};
const menuLists = [
  { id: 1, name: "Công việc", icon: IC_TASK },
  { id: 2, name: "Danh sách phòng ban", icon: IC_LIST },
  { id: 3, name: "Danh sách các dự án (40)", icon: IC_PAGE },
  { id: 4, name: "Thành viên", icon: IC_MEMBER }
];
const WrapperView = styled.View`
  flex: 1;
  background-color: #2A5B9C;
`;
const DrawerHeaderView = styled.View`
  background-color: #2A5B9C;
  height: ${statusBarHeight + 60}px;
`;
const ChildView = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: 0;
`;
const AvatarImage = styled.Image`
  width: 40px;
  height: 40px;
  margin-left: 20px;
  margin-right: 12px;
  margin-bottom: 12px;
  border-radius: 50px;
`;
const UserView = styled.View`
  flex-direction: column;
`;
const UserNameText = styled.Text`
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  letter-spacing: 0.12px;
  color: #FFFFFF;
`;
const UserPhoneText = styled.Text`
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: #FFFFFF;
  margin-top: 3px;
`;
const DrawerContentView = styled.View`


`;
const ListMenuView = styled.TouchableOpacity`
  background: rgba(255, 255, 255, 0.1);
  height: 44px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ListItemView = styled.TouchableOpacity`
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
  width: 70%;
`;
const LogoutText = styled.Text`
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  height: 44px;
  line-height: 44px;
  letter-spacing: 0.12px;
  text-transform: uppercase;
  margin-left: 20px;`;

export default memo(DrawerScreen);
