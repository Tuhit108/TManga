import * as React from "react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components/native";
import { statusBarHeight } from "@/themes/styles";
import { Dimensions, KeyboardAvoidingView, Platform, RefreshControl, ScrollView, TouchableOpacity } from "react-native";
import {
  IC_ACCOUNT,
  IC_ADD_MEMBER,
  IC_BACK,
  IC_DROP,
  IC_EMOJI,
  IC_OPTION,
  IC_PATH,
  IC_REPLY,
  IC_SEND_CMT,
  IC_TAG,
  IC_UPLOAD,
  IMG_ADD_MEMBER,
  IMG_ADD_SQUARE,
  IMG_DEFAULT
} from "@/assets";
import { goBack } from "@/utils/navigation";
import { CheckBox } from "@/component/CheckBox";
import { CommentItem } from "@/component/CommentItem";
import { DetailScreenProps, Follower } from "@/types";
import { useNavigationParams } from "@/hooks/useNavigationParams";
import moment from "moment";
import { Description } from "@/screens/TaskDetail/component/Description";
import { CheckList } from "@/screens/TaskDetail/component/CheckList";
import { SubTask } from "@/screens/TaskDetail/component/SubTask";
import { Result } from "@/screens/TaskDetail/component/Result";
import { SelectDate } from "@/component/SelectDate";
import useAsyncFn from "@/hooks/useAsyncFn";
import { useUser } from "@/store/constant";
import { requestTaskDetail } from "@/store/tasks/funtions";
import { useTask } from "@/store/tasks";
import { formatDate } from "@/utils/date";
import { useMember } from "@/store/member";
import { defaultParams } from "@/utils";


const windowWidth = Dimensions.get("window").width;
let list = [
  { id: "1", content: "đây là comment", time: " • 08:03 • Sep 14" }
];

export const TaskDetailScreen = () => {
  const params = useNavigationParams<DetailScreenProps>();
  const user = useUser();
  const taskId = useMemo(() => {
    return params?.id || "";
  }, [params]);
  const task = useTask(taskId);
  const userTask = useMember(task.user_id);
  const userCreator = useMember(task.creator_id);
  const scrollView = useRef<ScrollView | null>(null);
  const [isComplete, setComplete] = useState(false);
  const [comment, setComment] = useState("");
  const [listComment, setListComment] = useState(list);
  const [endPage, setEndPage] = useState(false);

  const [{ loading }, getTaskDetail] = useAsyncFn(async () => {
    if (loading) {
      return;
    }

    const taskDetailParams = {
      access_token: user.access_token,
      client_key: user.client_key,
      id: taskId,
      ...defaultParams
    };

    const res = await requestTaskDetail(taskDetailParams);

    if (res) {
      setComplete(res.complete == "100.00");
    }

  }, [user, userTask, taskId, isComplete]);

  useEffect(() => {
    getTaskDetail().then();
  }, []);

  const onSendComment = useCallback(() => {
    if (comment) {
      setListComment((prev: any) => prev.concat([{
        id: moment().unix().toString(),
        content: comment,
        time: " • " + moment().utcOffset("+07:00").format("HH:mm") + " • " + moment().format("MMM D")
      }]));
      setComment("");
      setEndPage(true);
    }
  }, [comment]);

  const toEndPage = useCallback(() => {
    if (endPage) { // @ts-ignore
      scrollView.current.scrollToEnd({ animated: true });
    }
  }, [endPage]);

  return (
    <Container>
      <WrapperView behavior={Platform.OS == "ios" ? "padding" : undefined}>
        {loading ? null : <UnderView />}
        <HeaderView>
          <TouchableOpacity onPress={goBack}>
            <BackIc source={IC_BACK} />
          </TouchableOpacity>
          <HeaderText numberOfLines={1}>{task?.name}</HeaderText>
          <OptionImage source={IC_OPTION} />
        </HeaderView>
        <>
          <ScrollView refreshControl={
            <Refresh refreshing={loading} onRefresh={getTaskDetail} />
          }>
            <ContentView>
              <Section1>
                <HeaderSection1>
                  <PathText numberOfLines={1}>{"Trong " + task?.ns.name + "/"} </PathText>
                  <ChildPath>Interview</ChildPath>
                  <PathIcon source={IC_PATH} />
                </HeaderSection1>
                <ContentSection1View>
                  <SelectDate title={formatDate(task?.start_time) || "Start date"} />
                  <PathText>đến</PathText>
                  <SelectDate title={formatDate(task?.deadline) || "End date"} />
                </ContentSection1View>
                <ReturnView onPress={goBack}>
                  <ReturnIcon source={IC_REPLY} />
                  <ReturnText>Quay lạiProject</ReturnText>
                </ReturnView>
              </Section1>
              <StatusView>
                <TaskStatus1>
                  <StatusCheckBox isChecked={isComplete} setChecked={setComplete} />
                  {isComplete ? <CompleteText>Đã hoàn thành</CompleteText> : <WorkingText>Đang làm</WorkingText>}
                </TaskStatus1>
                <TaskStatus2>
                  <TouchableOpacity>
                    <AvatarMember source={userTask?.gavatar ? { uri: userTask?.gavatar } : IMG_ADD_MEMBER} />
                  </TouchableOpacity>
                  <AddMemberText numberOfLines={2}>{userTask?.name || "Giao cho"} </AddMemberText>
                </TaskStatus2>
              </StatusView>
              <DescriptionView>
                <Description content={task?.content} />
                <TagView>
                  <BottomSectionView>
                    <BottomLeftIcon source={IC_TAG} />
                    <BottomText>Hiện tại chưa có tag nà</BottomText>
                  </BottomSectionView>
                  <BottomRight source={IMG_ADD_SQUARE} />
                </TagView>
                <CreateMemberView>
                  <BottomSectionView>
                    <BottomLeftIcon source={IC_ACCOUNT} />
                    <BottomText>{userCreator?.name + " tạo lúc " + formatDate(task?.since)}</BottomText>
                  </BottomSectionView>
                </CreateMemberView>
              </DescriptionView>
              <FollowerView>
                <SectionHeader>
                  <FollowerText>FOLLOWERS</FollowerText>
                  <HeaderLabelItem>
                    <HeaderLabelText>Thêm người theo dõi</HeaderLabelText>
                    <HeaderLabelIcon source={IC_ADD_MEMBER} />
                  </HeaderLabelItem>
                </SectionHeader>
                <FollowerContent>
                  {task?.followers.map((item: Follower, index) => {
                    return (
                      index < 4 ? <StackFollowerAvatar source={{ uri: item.gavatar }} /> : null
                    );
                  })}
                  {(task?.followers.length || 0) > 4 ?
                    <OtherFollower>
                      <OtherFollowerText>+{(task?.followers?.length || 0) - 4}</OtherFollowerText>
                    </OtherFollower> : null}
                </FollowerContent>
              </FollowerView>
              <CheckListView>
                <CheckList itemList={task?.checklists} />
              </CheckListView>
              <SubTaskView>
                <SubTask itemList={task?.cached_subtasks} />
              </SubTaskView>
              <ResultView>
                <Result />
              </ResultView>
              <CommentView>
                <SectionHeader>
                  <Dropdown>
                    <DropIcon source={IC_DROP} />
                    <DropText>COMMENTS (4)</DropText>
                  </Dropdown>
                </SectionHeader>
                <CommentContent nestedScrollEnabled={true} onContentSizeChange={toEndPage}>
                  <TouchableOpacity>
                    <MoreComment>Hiển thị thêm...</MoreComment>
                  </TouchableOpacity>
                  {listComment.map(({ id, content, time }) => (
                    <CommentItem
                      key={id}
                      account={"Khắc Tú"}
                      comment={content}
                      avatar={IMG_DEFAULT}
                      time={time}
                      imageAttach="https://picsum.photos/300/300" />))}
                </CommentContent>
              </CommentView>
            </ContentView>
          </ScrollView>
          <CommentInputView>
            <InputView>
              <CommentTextInput
                placeholder="Comments..."
                value={comment}
                onChangeText={setComment}
              />
              <CommentIconView>
                <TouchableOpacity>
                  <CommentIcon source={IC_UPLOAD} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <CommentIcon source={IC_EMOJI} />
                </TouchableOpacity>
              </CommentIconView>
            </InputView>
            <TouchableOpacity onPress={onSendComment}>
              <SendIcon source={IC_SEND_CMT} />
            </TouchableOpacity>
          </CommentInputView>
        </>
      </WrapperView>
    </Container>
  );
};
const Container = styled.View`
  flex: 1;
  background-color: white;

`;
const WrapperView = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: white;
  margin-bottom: ${statusBarHeight - 20}px;

`;
const Refresh = styled(RefreshControl)`
  background-color: #2A5B9C;
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
const OptionImage = styled.Image`
  width: 28px;
  height: 28px;
  margin-right: 16px;
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
const UnderView = styled.View`
  background-color: #2A5B9C;
  position: absolute;
  height: 50%;
  top: 0;
  left: 0;
  right: 0;
`;
const ContentView = styled.View`
  background-color: #ffffff;
`;
const Section1 = styled.View`
  height: 114px;
  background-color: #2A5B9C;
  padding-right: 16px;
  padding-left: 16px;
`;
const HeaderSection1 = styled.View`
  flex-direction: row;
  align-items: center;
`;
const PathText = styled.Text`
  max-width: 80%;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: 0.12px;
  color: #FFFFFF;
`;
const ChildPath = styled.Text`
  font-weight: 700;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: 0.12px;
  color: #FFFFFF;
`;
const PathIcon = styled.Image`
  width: 20px;
  height: 20px;
`;
const ContentSection1View = styled.View`
  margin-top: 18px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ReturnView = styled.TouchableOpacity`
  margin-top: 12px;
  flex-direction: row;
  align-items: center;
`;
const ReturnIcon = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 4px;
`;
const ReturnText = styled.Text`
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  letter-spacing: 0.12px;
  color: #FFFFFF;`;
const StatusView = styled.View`
  height: 64px;
  background: rgba(42, 91, 156, 0.1);
  padding-right: 16px;
  padding-left: 16px;
  flex-direction: row;
  align-items: center;
`;
const TaskStatus1 = styled.View`
  width: 50%;
  flex-direction: row;
  align-items: center;
  height: 44px;
`;
const TaskStatus2 = styled(TaskStatus1)`
  border-left-width: 1px;
  border-left-color: rgba(51, 51, 51, 0.2);

`;
const StatusCheckBox = styled(CheckBox)`
  border-width: 1px;
  border-color: #2A5B9C;
`;
const WorkingText = styled.Text`
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: 0.12px;
  color: #2A5B9C;
`;
const CompleteText = styled.Text`
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: 0.12px;
  color: #11D262;
`;
const AvatarMember = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  margin-left: 15px;
  margin-right: 15px;
`;
const AddMemberText = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.12px;
  color: #828282;
  width: 70%;
`;
const DescriptionView = styled.View`
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
const HeaderLabelItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const HeaderLabelText = styled.Text`
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  text-align: right;
  letter-spacing: 0.12px;
  color: #828282;
  margin-right: 2px;
`;
const HeaderLabelIcon = styled.Image`
  margin-left: 6px`;

const AttachFileView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  height: 36px;
`;
const BottomSectionView = styled.View`
  flex-direction: row;
  align-items: center;
`;
const BottomLeftIcon = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;
const BottomText = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: 0.12px;
  color: #828282;
`;
const BottomRight = styled.Image`
  width: 24px;
  height: 24px`;
const TagView = styled(AttachFileView)`
  height: 44px;
  border-width: 0.5px;
  border-color: rgba(0, 0, 0, 0.1);
`;
const CreateMemberView = styled(AttachFileView)`
  height: 44px;
  border-bottom-width: 0.5px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
`;
const FollowerView = styled.View`
  padding-right: 16px;
  padding-left: 16px;
  border-bottom-width: 0.5px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
`;
const FollowerText = styled(DropText)`
  color: #828282;
`;
const FollowerContent = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 4px;
`;
const FollowerAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  border-width: 2px;
  border-color: #FFFFFF;
  margin-bottom: 12px;
`;
const StackFollowerAvatar = styled(FollowerAvatar)`
  margin-left: -8px;
  border-width: 2px;
  border-color: #FFFFFF;
`;
const OtherFollower = styled.View`
  width: 39px;
  height: 39px;
  border-radius: 100px;
  background: #F2F2F2;
  border-width: 2px;
  border-color: #E0E0E0;
  margin-left: -8px;
  margin-bottom: 12px;
  justify-content: center;
  align-items: center;
`;
const OtherFollowerText = styled.Text`
  font-weight: 500;
  font-size: 15px;
  line-height: 40px;
  letter-spacing: 0.12px;
  text-transform: uppercase;
  color: #BDBDBD;
  text-align: center;
`;
const CheckListView = styled.View`
  border-bottom-width: 0.5px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
`;

const SubTaskView = styled(CheckListView)`
`;
const ResultView = styled(CheckListView)``;
const CommentView = styled.View`


`;
const CommentContent = styled.ScrollView`
  padding-right: 16px;
  padding-left: 16px;

`;
const MoreComment = styled.Text`
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: 0.12px;
  color: #333333;
  margin-top: 11px;
  margin-bottom: 10px;
`;
const CommentInputView = styled.View`
  height: 60px;
  left: 16px;
  right: 16px;
  flex-direction: row;
  align-items: center;
  background-color: white;

`;
const InputView = styled.View`
  height: 44px;
  width: ${windowWidth - 72}px;
  background: #F2F2F2;
  border-radius: 100px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CommentTextInput = styled.TextInput`
  margin-left: 20px;
  height: 90%;
  width: 60%;
`;
const CommentIconView = styled.View`
  flex-direction: row;
  align-items: center`;
const CommentIcon = styled.Image`
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const SendIcon = styled.Image`
  width: 24px;
  height: 24px;
  margin-left: 16px;
`;
export default memo(TaskDetailScreen);
