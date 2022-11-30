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
import { IC_CALENDAR, IC_HOME, IC_PROFILE, IC_SEND } from "@/assets";
import DrawerScreen from "@/screens/Drawer/DrawerScreen";
import TaskDetailScreen from "@/screens/TaskDetail/TaskDetailScreen";
import { PreloadScreen } from "@/screens/PreloadScreen";
import CreateTaskScreen from "@/screens/CreateTask/CreateTask";



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
        name="Screen2"
        component={View}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarView focused={focused}>
              <TabIcon source={IC_PROFILE}></TabIcon>
              <TabBarText> Giao cho tôi</TabBarText>
            </TabBarView>
          )
        }}
      />
      <TabStack.Screen
        name="Screen3"
        component={View}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarView focused={focused}>
              <TabIcon source={IC_SEND}></TabIcon>
              <TabBarText>Tôi giao đi</TabBarText>
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
      <MainStack.Screen name="TaskDetailScreen" component={TaskDetailScreen} />
      <MainStack.Screen name="CreateTaskScreen" component={CreateTaskScreen} />
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
