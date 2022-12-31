import React, { memo, useCallback, useEffect } from "react";
import styled from "styled-components/native";
import { Colors } from "@/themes/Colors";
import { ActivityIndicator } from "react-native";
import { navigateToLoginScreen, replaceWithMainScreen } from "@/utils/navigation";
import { IMG_LOGO } from "@/assets";
import { RawUser } from "@/types";
import { useUser } from "@/store/constant";

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
  align-items: center;
  justify-content: center;
`;

const Logo = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 120px;
`;
export const PreloadScreen = memo(() => {
  const user: RawUser = useUser();

  const getData = useCallback(() => {
    setTimeout(() => {
      navigateToLoginScreen();

    }, 2000);
  }, []);

  useEffect(() => {
    getData();

  }, []);
  return (
    <Container>
      <Logo source={IMG_LOGO} />
      <ActivityIndicator size={"large"} color={"#626262"} />
    </Container>
  );
});
