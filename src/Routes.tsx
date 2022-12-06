import * as React from "react";
import LoginScreen from "./screens/Login/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Dimensions, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { memo, useCallback } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "@/screens/Home/HomeScreen";
import { navigationRef } from "@/utils/navigation";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { IC_CALENDAR, IC_GENRES, IC_HOME, IC_PROFILE, IC_SEARCH, IC_SEND } from "@/assets";
import DrawerScreen from "@/screens/Drawer/DrawerScreen";
import { PreloadScreen } from "@/screens/PreloadScreen";
import { BookDetailScreen } from "@/screens/BookDetal/BookDetailScreen";
import GenresScreen from "@/screens/Genres/GenresScreen";
import GenresDetail from "@/screens/Genres/GenresDetail";
import SearchBook from "@/screens/SearchBook";
import ReadChapter from "@/screens/BookDetal/ReadChapter";



const MainStack = createStackNavigator();
const TabStack = createBottomTabNavigator();
const DrawerStack = createDrawerNavigator();
const RootStack = createNativeStackNavigator();


const windowHeight = Dimensions.get("window").height;
const ContainerView = styled.View`
  height: ${windowHeight}px;
`;
const TabBarView = styled.View<{ focused: boolean }>`
  align-items: center;
  opacity: ${(props: any) => (props.focused ? 1 : 0.5)};
`;
const TabBarText = styled.Text`
  font-size: 10px;
  color: #FFFFFF;
  margin-top: 8px
`;
const TabIcon = styled.Image`
  tint-color :#ffffff;
  width: 24px;
  height: 24px;
`;
const TabStackComponent = () => {
  return (
    <TabStack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#2A5B9C",
          height: 44 + getStatusBarHeight()
        }
      }}
      initialRouteName="HomeScreen">
      <TabStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarView focused={focused}>
              <TabIcon source={IC_HOME}></TabIcon>
              <TabBarText>Tổng hợp</TabBarText>
            </TabBarView>
          )
        }}
      />
      <TabStack.Screen
        name="GenresScreen"
        component={GenresScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarView focused={focused}>
              <TabIcon source={IC_GENRES}></TabIcon>
              <TabBarText> Thể loại</TabBarText>
            </TabBarView>
          )
        }}
      />
      <TabStack.Screen
        name="SearchScreen"
        component={SearchBook}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarView focused={focused}>
              <TabIcon source={IC_SEARCH}></TabIcon>
              <TabBarText>Tìm kiếm</TabBarText>
            </TabBarView>
          )
        }}
      />
      <TabStack.Screen
        name="Screen4"
        component={View}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarView focused={focused}>
              <TabIcon source={IC_CALENDAR}></TabIcon>
              <TabBarText>Lịch biểu</TabBarText>
            </TabBarView>
          )
        }}
      />
    </TabStack.Navigator>

  );
};
const DrawerStackComponent = () => {

  return (
    <ContainerView>
      <DrawerStack.Navigator
        initialRouteName="TabNavigation"
        screenOptions={{
          headerShown: false,
          drawerType: "front",
          swipeEdgeWidth: 0
        }} useLegacyImplementation
        // @ts-ignore
        drawerContent={(props) => <DrawerScreen {...props} />}
      >
        <DrawerStack.Screen name="TabNavigation" component={TabStackComponent} />
      </DrawerStack.Navigator>
    </ContainerView>
  );
};
const MainStackComponent = memo(function MainStackComponent() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown:false}}
      initialRouteName="Drawer"
    >
      <MainStack.Screen name="Drawer" component={DrawerStackComponent} />
      <MainStack.Screen name="BookDetailScreen" component={BookDetailScreen} />
      <MainStack.Screen name="ReadChapterScreen" component={ReadChapter} />
      <MainStack.Screen name="GenresDetailScreen" component={GenresDetail} />
    </MainStack.Navigator>
  );
});
const Routes =memo(function Routes ()  {
  const routeNameRef = React.useRef<string>('');

  const onStateChange = useCallback(() => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;
    if (currentRouteName && previousRouteName !== currentRouteName) {
      routeNameRef.current = currentRouteName;
    }
  }, []);

  return (
    <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="PreloadScreen"
      >
        <RootStack.Screen name="PreloadScreen" component={PreloadScreen} />
        <RootStack.Screen name="LoginScreen" component={LoginScreen} />
        <RootStack.Screen name="MainNavigation" component={MainStackComponent} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
});
export default Routes;
