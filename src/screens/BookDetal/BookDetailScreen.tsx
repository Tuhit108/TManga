import * as React from "react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components/native";
import { statusBarHeight } from "@/themes/styles";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";
import {
  IC_BACK,
  IC_OPTION,
} from "@/assets";
import { goBack } from "@/utils/navigation";
import { DetailScreenProps, Follower } from "@/types";
import { useNavigationParams } from "@/hooks/useNavigationParams";
import useAsyncFn from "@/hooks/useAsyncFn";
import { DETAIL_BOOKS } from "@/store/books/functions";
import { TabView, SceneMap } from 'react-native-tab-view';

export const BookDetailScreen = () => {
  const params = useNavigationParams<DetailScreenProps>();
  const [book,setBook] = useState({
    name : "",
    img : "",
    author : "",
    status : "",
    latest : "",
    views : "",
    content : ""});

  const bookId = useMemo(() => {
    return params?.id || "";
  }, [params]);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Nội dung' },
    { key: 'second', title: 'Truyện khác' },
  ]);


  const [{ loading }, getBookDetail] = useAsyncFn(async () => {
     const res = await DETAIL_BOOKS(bookId)
    console.log("a",res);
    setBook(res)
  }, [bookId]);

  useEffect(() => {
    getBookDetail().then();
    console.log(book);
  }, []);
  const FirstRoute = () => (
    <ContentText>book.content</ContentText>
  );

  const SecondRoute = () =>  (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });



  return (
    <Container>
      <WrapperView behavior={Platform.OS == "ios" ? "padding" : undefined}>
        {loading ? null : <UnderView />}
        <HeaderView>
          <TouchableOpacity onPress={goBack}>
            <BackIc source={IC_BACK} />
          </TouchableOpacity>
          <HeaderText numberOfLines={1}>{book?.name}</HeaderText>
          <OptionImage source={IC_OPTION} />
        </HeaderView>
          <ScrollView refreshControl={
            <Refresh refreshing={loading} onRefresh={getBookDetail} />
          }>
            <ContentView>
              <Section1>
                <LeftItemView>
                  <BookImg source={{uri:book.img }}/>
                </LeftItemView>
                <RightItemView>
                  <ItemName >{book.name}</ItemName>
                  <ItemInfo>Tác giả : {book.author}</ItemInfo>
                  <ItemInfo>Trạng thái : {book.status}</ItemInfo>
                  <ItemInfo>Mới nhất : Chap {book.latest}</ItemInfo>
                  <ItemStatus>Lượt đọc : {book.views}</ItemStatus>
                </RightItemView>
              </Section1>
              <Section2>
                <TabView
                  navigationState={{ index, routes }}
                  renderScene={renderScene}
                  onIndexChange={setIndex}
                />
              </Section2>

            </ContentView>
          </ScrollView>

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
const Section1= styled.View`
  background-color: white;
  flex-direction: row;
`
const Section2= styled.View`
  background-color: white;
`
const BookImg = styled.Image`
  height: 188px;
  width: 124px;
  border-radius: 8px;
  margin-top: 18px;
  margin-left: 12px;
  
`
const LeftItemView = styled.View`
  height: 224px;
`;
const RightItemView = styled.View`
  width: 250px;
  margin-top: 18px;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemName = styled.Text`
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 0.12px;
  padding-left: 12px;
  width:300px;
  color: red
`
const ItemStatus = styled.Text`
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.12px;
  padding-left : 12px;
  color: red;
`
const ItemInfo = styled.Text`
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 0.12px;
  padding-left : 12px;
`
const ContentText = styled.Text`
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 0.12px;
  padding-left : 12px;
`





export default memo(BookDetailScreen);
