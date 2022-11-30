import { Fetch } from "@/utils/fetch";
import { setUserAction } from "@/store/constant/index";
import Global from "@/utils/Global";
import { newFormData } from "@/utils";

export interface LoginInputParams {
  email: string;
  password: string;
}
export const requestSecret = async () => {
  const { data } = await Fetch.get("https://api.base.vn/extapi/oauth/client");

  if (!data) {
    return null;
  }
  return {
    client_key: data.client?.client_key,
    client_secret: data.client?.client_secret
  };
};
export const requestLogin = async (params: LoginInputParams) => {

  const client = await requestSecret();
  if (!client) {
    return null;
  }

  const loginParams = newFormData({
    email: params.email,
    password: params.password,
    client_key: client?.client_key,
    client_secret: client?.client_secret,
    __code: "native"
  });


  const { data } = await Fetch.post("https://api.base.vn/ajax/mobile/login", loginParams);

  if (!data) {
    return null;
  }
  if (data.code) {
    setUserAction({
        id: data.client.user_id,
        name: data.viewer.name,
        access_token: data.client.access_token,
        client_key: client.client_key,
        client_secret: client.client_secret,
        avatar: data.viewer.gavatar
      }
    );
    Global.accessToken = data.client.access_token;
  }

  return data.code;
};
export const requestLogout = async (params: any) => {
  const logoutFormData = newFormData(params);

  const { data } = await Fetch.post(
    "https://api.base.vn/ajax/api/user/profile",
    logoutFormData
  );

  if (!data) {
    return null;
  }

  setUserAction();
  return data;
};

