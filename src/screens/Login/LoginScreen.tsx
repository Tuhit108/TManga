import * as React from "react";
import { memo, useCallback, useState } from "react";
import styled from "styled-components/native";
import { IC_EMAIL, IC_EYE, IC_LOCK, IMG_LOGO } from "@/assets";
import { replaceWithMainScreen } from "@/utils/navigation";
import CustomTextInput from "@/component/TextInput";
import { useAsyncFn } from "react-use";
import { ActivityIndicator, Alert } from "react-native";
import { requestLogin } from "@/store/constant/funtions";
import auth from '@react-native-firebase/auth';


const LoginScreen = () => {
  const [hidePass, setHidePass] = useState(true);
  const [params, setParams] = useState({
    email: "",
    password: ""
  });
  const onSignIn = useCallback(()=>{
    auth()
        .createUserWithEmailAndPassword(params.email, params.password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
  },[])
  const [{ loading }, onLogin] = useAsyncFn(async () => {
    if (!params.email || !params.password) {
      Alert.alert("", "Vui lòng nhập email và mật khẩu", [{ text: "OK" }]);
      return;
    }
    const res = await requestLogin(params);
    if (res == 0) {
      Alert.alert(
        "Không thể đăng nhập",
        "Email hoặc mật khẩu không chính xác",
        [{ text: "OK" }]
      );
    } else {
      replaceWithMainScreen();
    }

  }, [params]);


  const onChangeValue = useCallback((keyName: string, value: string) => {
    setParams(prev => ({
      ...prev,
      [keyName]: value
    }));
  }, []);

  const onHidePass = useCallback(() => {
    setHidePass(!hidePass);
  }, [hidePass]);

  return (
    <Container>
      <AppLogoImage source={IMG_LOGO} />
      <AppName>Wework</AppName>
      <AccountView>
        <InputLabel>Email</InputLabel>
        <InputView>
          <InputIcon source={IC_EMAIL} />
          <CustomTextInput
            keyName={"email"}
            value={params.email}
            onChangeValue={onChangeValue}
            keyboardType={"email-address"}
            placeHolder="Email"
            secureTextEntry={false}
          />
        </InputView>
      </AccountView>
      <AccountView>
        <InputLabel>Password</InputLabel>
        <InputView>
          <InputIcon source={IC_LOCK} />
          <CustomTextInput
            value={params.password}
            keyName={"password"}
            onChangeValue={onChangeValue}
            placeHolder="Password"
            secureTextEntry={hidePass} keyboardType={"default"} />
          <HidePassIcon onPress={onHidePass}>
            <EyeIcon source={IC_EYE} />
          </HidePassIcon>
        </InputView>
      </AccountView>
      <ForgotPassword>Quên mật khẩu ?</ForgotPassword>
      <LoginButton onPress={onSignIn}>
        {loading ? <ActivityIndicator size={"small"} color={"#FFFFFF"} /> : <LoginText>Login</LoginText>}
      </LoginButton>
    </Container>
  );
};

export default memo(LoginScreen);
const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #FFFFFF;
`;
const AppLogoImage = styled.Image`
  width: 120px;
  height: 120px;
  margin-top: 44px;
`;
const AppName = styled.Text`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  color: #242424;
  margin-top: 8px;
  margin-bottom: 30px;
  font-style: normal;
`;
const AccountView = styled.View`

  width: 90%;
  padding-bottom: 16px;
`;
const InputView = styled.View`
  flex-direction: row;
  padding: 4px 16px;
  border: 1px #E0E0E0;
  border-radius: 4px;
  height: 44px;
  align-items: center;
`;
const InputLabel = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #242424;
  margin-bottom: 4px;
`;
const InputIcon = styled.Image`
`;
const HidePassIcon = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
`;
const EyeIcon = styled(InputIcon)`

`;
export const LoginInput = styled.TextInput.attrs({
  placeholderTextColor: "#616161"
})`
  font-size: 15px;
  width: 180px;
  height: 100%;
  margin-left: 16px;
  padding: 5px;
`;
const ForgotPassword = styled.Text`
  text-align: right;
  width: 90%;
  color: #616161;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`;
const LoginButton = styled.TouchableOpacity`
  margin-top: 24px;
  height: 44px;
  width: 90%;
  background: #40739E;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;
const LoginText = styled.Text`
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  text-align: center;
  letter-spacing: -0.2px;
  color: #FFFFFF;
`;

