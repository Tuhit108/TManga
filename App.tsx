import "react-native-gesture-handler";
import * as React from "react";
import { memo, useEffect } from "react";
import { LogBox, StatusBar, YellowBox } from "react-native";
import { Provider } from "react-redux";

import SplashScreen from "react-native-splash-screen";
import styled from "styled-components/native";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Routes from "./src/Routes";
import { store } from "./src/store";
LogBox.ignoreLogs(['']);

const Container = styled.View`
  flex: 1;
`;
let persistor = persistStore(store);

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Container>
          <StatusBar
            translucent={true}
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          <Routes/>
        </Container>
      </PersistGate>
    </Provider>
  );
};
export default memo(App);
