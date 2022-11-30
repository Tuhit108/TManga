import * as React from "react";
import { memo, useCallback, useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Alert, ScrollView, TouchableOpacity } from "react-native";
import { IC_BACK } from "@/assets";
import { statusBarHeight } from "@/themes/styles";
import CustomTextInput from "@/component/TextInput";
import { SelectProject } from "@/screens/CreateTask/component/SelectProject";

import { AddDate } from "@/screens/CreateTask/component/AddDate";
import { useUser } from "@/store/constant";
import { requestCreateTask } from "@/store/tasks/funtions";
import useAsyncFn from "@/hooks/useAsyncFn";
import { SelectTaskList } from "@/screens/CreateTask/component/SelectTaskList";
import { defaultParams } from "@/utils";
import { AddMember } from "@/screens/CreateTask/component/AddMember";
import { AddAssign } from "@/screens/CreateTask/component/AddAssign";
import { goBack } from "@/utils/navigation";

interface Props {
}

export interface RawAddParams {
  id: string;
  tasklist_id: string;
  name: string;
  content: string;
  assign: string;
  followers: string;
  has_deadline: number;
  deadline: string;
  start_time: string;
}

const CreateTaskScreen = () => {
  const user = useUser();
  const [params, setParams] = useState<RawAddParams>({
    id: "",
    tasklist_id: "",
    name: "",
    content: "",
    assign: "",
    followers: "",
    has_deadline: 0,
    deadline: "",
    start_time: ""
  });

  const onChangeValue = useCallback((keyName: string, value: string) => {
    setParams(prev => ({
      ...prev,
      [keyName]: value
    }));
  }, []);


  const [{ loading }, onSaveItem] = useAsyncFn(async () => {
    if (loading) {
      return;
    }

    const createParams = {
      ...params,
      access_token: user.access_token,
      client_key: user.client_key,
      ...defaultParams
    };


    const res = await requestCreateTask(createParams);

    if (res.code == 1) {
      goBack();

    } else {
      Alert.alert(res.message);
    }
  }, [user, params]);

  console.log(params);

  const TaskList = useCallback(() => {
    return <AddItem>
      <AddLabel>CHỌN TASKLIST</AddLabel>
      <SelectTaskList params={params} setParams={setParams} keyName={"tasklist_id"} />
    </AddItem>;
  }, [params.id]);

  return (
    <Container>
      <HeaderView>
        <TouchableOpacity onPress={goBack}>
          <BackIc source={IC_BACK} />
        </TouchableOpacity>
        {loading ?
          <ActivityIndicator size={"small"} color={"#FFFFFF"} />
          :
          <HeaderText numberOfLines={1}>Tạo công việc</HeaderText>}
        {params.name && params.id
          ? (
            <SaveButton onPress={onSaveItem}>
              <SaveText>Lưu</SaveText>
            </SaveButton>
          )
          : (
            <DisableText>Lưu</DisableText>
          )
        }
      </HeaderView>
      <ScrollView>
        <AddItem>
          <AddLabel>TÊN CÔNG VIỆC *</AddLabel>
          <AddInput
            multiline={true}
            value={params.name}
            keyName={"name"}
            onChangeValue={onChangeValue}
            placeHolder="Tên công việc"
            keyboardType={"default"} />
        </AddItem>
        <AddItem>
          <AddLabel>MÔ TẢ</AddLabel>
          <AddInput
            multiline={true}
            value={params.content}
            keyName={"content"}
            onChangeValue={onChangeValue}
            placeHolder="mô tả"
            keyboardType={"default"} />
        </AddItem>
        <AddItem>
          <AddLabel>CHỌN DỰ ÁN *</AddLabel>
          <SelectProject params={params} setParams={setParams} keyName={"id"} />
        </AddItem>
        <TaskList />
        <AddItem>
          <AddLabel>CHỌN THÀNH VIÊN ĐƯỢC GIAO CÔNG VIỆC</AddLabel>
          <AddAssign params={params} setParams={setParams} keyName={"assign"} title={"Giao cho"} />
        </AddItem>
        <AddItem>
          <AddLabel>NGƯỜI THEO DÕI</AddLabel>
          <AddMember params={params} setParams={setParams} keyName={"followers"} title={"Thêm người theo dõi"} />
        </AddItem>
        <AddItem>
          <AddLabel>NGÀY BẮT ĐẦU</AddLabel>
          <AddDate title={"Start date"} params={params} setParams={setParams} keyName={"start_time"} />
        </AddItem>
        <AddItem>
          <AddLabel>NGÀY KẾT THÚC</AddLabel>
          <AddDate title={"Deadline"} params={params} setParams={setParams} keyName={"deadline"} />
        </AddItem>

      </ScrollView>
    </Container>

  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;
const HeaderView = styled.View`
  height: ${statusBarHeight + 60}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #2A5B9C;
  padding-top: ${statusBarHeight}px;;
`;
const BackIc = styled.Image`
  height: 21px;
  width: 12px;
  margin-left: 16px;
  margin-right: 20px;
`;

const HeaderText = styled.Text`
  width: 65%;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  letter-spacing: -0.41px;
  color: #FFFFFF;

`;
const SaveButton = styled.TouchableOpacity`
`;
const SaveText = styled.Text`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  letter-spacing: -0.41px;
  color: #FFFFFF;
  margin: 16px;
`;
const DisableText = styled.Text`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  letter-spacing: -0.41px;
  color: #828282;
  margin: 16px;
`;
const AddItem = styled.View`
  flex-direction: column;
  justify-content: center;
  min-height: 60px;
  margin-left: 16px;
  margin-right: 16px;
  border-bottom-width: 0.5px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
`;
const AddLabel = styled.Text`
  padding: 5px;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: 0.08px;
  color: #2A5B9C;
`;
const AddInput = styled(CustomTextInput)`
  margin: 0;
  width: 80%;
`;


export default memo(CreateTaskScreen);
