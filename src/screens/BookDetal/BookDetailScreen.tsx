import * as React from "react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components/native";
import { statusBarHeight } from "@/themes/styles";
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";
import { IC_BACK, IC_CHECK, IC_OPTION } from "@/assets";
import { goBack, navigateToReadChapterScreen } from "@/utils/navigation";
import { DetailScreenProps } from "@/types";
import { useNavigationParams } from "@/hooks/useNavigationParams";
import useAsyncFn from "@/hooks/useAsyncFn";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import useBoolean from "@/hooks/useBoolean";
import Modal from "react-native-modal";
import { DETAIL_MANGA } from "@/store/books/apimanhuarock/get_detail_manga";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export const BookDetailScreen = () => {
  const params = useNavigationParams<DetailScreenProps>();
  const [book, setBook] = useState({
    name: "",
    genres: [],
    img: "",
    author: "",
    status: "",
    views: "",
    content: "",
    chapter_list: []

  });
  const [visible, setModalVisible, setHideModal] = useBoolean(false);
  const [chap, setChap] = useState({
    chapter_name : "Chọn chương",
    chapter_url : ""
  });

  const bookId = useMemo(() => {
    return params?.id || "";
  }, [params]);
  console.log("id", bookId);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Nội dung" },
    { key: "second", title: "Truyện khác" }
  ]);


  const [{ loading }, getBookDetail] = useAsyncFn(async () => {
    const res = await DETAIL_MANGA(bookId);
    console.log("a", res);
    setBook(res);
  }, [bookId]);

  useEffect(() => {
    getBookDetail().then();
  }, []);



  const FirstRoute = () => {
    return (
      <ContentTabView>
        <ContentText>{book.content}</ContentText>
      </ContentTabView>
    );
  };

  const SecondRoute = () => {
    console.log("hahaf");
    return <View style={{ backgroundColor: "#673ab7" }} />;

  };


  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      activeColor={"red"}
      inactiveColor={"#2A5B9C"}
      indicatorStyle={{ backgroundColor: "red" }}
      style={{ backgroundColor: "white" }}
    />
  );

  const renderItem = useCallback(({ item, index }: { item: string, index: number }) => {
    const selectChap = () => {
      setChap(item);
      console.log(item);
      setHideModal();
    };

    return <ChapterItem id={index} onPress={selectChap}>
      <ChaperItemText>{item.chapter_name}</ChaperItemText>
      {chap === item.chapter_name ? <CheckIcon source={IC_CHECK} /> : null}
    </ChapterItem>;
  }, [chap]);
  const keyExtractor = (item: any) => item.toString();
  const onPressRead = useCallback(()=>{
    console.log(book);
    navigateToReadChapterScreen({
      id : chap.chapter_url.length>0?chap.chapter_url: book.chapter_list[0].chapter_url ,
      name : chap.chapter_name
    })
  },[chap])
  return (
    <Container>
      <WrapperView behavior={Platform.OS == "ios" ? "padding" : undefined}>

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
                <BookImg source={{ uri: book.img }} />
              </LeftItemView>
              <RightItemView>
                <ItemName>{book.name}</ItemName>
                <ItemInfo numberOfLines={1}>Tác giả : {book.author}</ItemInfo>
                <ItemInfo numberOfLines={1}>Trạng thái : {book.status}</ItemInfo>
                <ItemInfo numberOfLines={2}>Thể loại : {book.genres.length > 0 ? book.genres.join(', ') : "Đang cập nhật"}</ItemInfo>
                <ItemStatus numberOfLines={1}> Lượt đọc : {book.views}</ItemStatus>
              </RightItemView>
            </Section1>
            <Section2>
              <TabViewSection
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: Dimensions.get("window").width }}
              />
            </Section2>
          </ContentView>
        </ScrollView>
        <BottomView>
          <ChapterView onPress={setModalVisible}>
            <ChaperText>{chap.chapter_name}</ChaperText>
          </ChapterView>
          <ReadView onPress={onPressRead}>
            <ReadText>Đọc Truyện</ReadText>
          </ReadView>
        </BottomView>
        <BottomModal
          animationInTiming={600}
          isVisible={visible}
        >
          <ModalView>
            <ListModalView>
              <Header>
                <TouchableOpacity onPress={setHideModal}>
                  <Cancel>Huỷ</Cancel>
                </TouchableOpacity>
              </Header>
              <FlatList
                removeClippedSubviews={true}
                data={book.chapter_list}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
              />

            </ListModalView>
          </ModalView>
        </BottomModal>

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
  flex: 1;
`;
const Section1 = styled.View`
  background-color: white;
  flex-direction: row;
`;
const Section2 = styled.View`
  background-color: white;
`;
const BookImg = styled.Image`
  height: 188px;
  width: 124px;
  border-radius: 8px;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 12px;

`;
const LeftItemView = styled.View`
  height: 224px;
  margin-top: 18px;
`;
const RightItemView = styled.View`
  width: 300px;
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
  width: 300px;
  color: red;
`;
const ItemStatus = styled.Text`
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.12px;
  padding-left: 12px;
  color: red;
`;
const ItemInfo = styled.Text`
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.12px;
  padding-left: 12px;
`;
const ContentText = styled.Text`
  text-align: justify;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.24px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 12px;
`;
const ContentTabView = styled.ScrollView`
`;
const TabViewSection = styled(TabView)`
  height: 500px;
`;
const BottomView = styled.View`
  height: 44px;
  background-color: white;
  position: absolute;
  bottom: 0;
  width: ${windowWidth};
  border-width: 1px;
  border-color: #2A5B9C50;
  flex-direction: row;
  border-radius: 8px;
`;
const ChapterView = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 44px;
`;
const ReadView = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 44px;
  width: 50%;
  background-color: #2A5B9C;
`;
const ReadText = styled.Text`
  text-align: center;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.24px;
  color: white;
`;
const ChaperText = styled.Text`
  text-align: center;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.24px;
  color: red;
`;
const BottomModal = styled(Modal)`
  width: 100%;
  margin: 0;
`;
const Header = styled.View`
  flex-direction: row;
  margin-left: 16px;
  margin-right: 16px;
  justify-content: space-between;
  align-items: center;
  height: 44px;
`;

const Cancel = styled.Text`
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.08px;
  color: #2A5B9C;
`;
const ModalView = styled.View`
  height: ${windowHeight}px;
`;
const ListModalView = styled.View`
  position: absolute;
  z-index: 2;
  background-color: #ffffff;
  bottom: 0;
  height: ${windowHeight}px;
  width: ${windowWidth}px;
  padding-bottom: ${statusBarHeight}px;
  padding-top: ${statusBarHeight}px;
`;
const ChapterItem = styled.TouchableOpacity`
  flex-direction: row;
  height: 44px;
  width: ${windowWidth};
  border-bottom-width: 1px;
  border-color: #69666620;
  padding-left: 24px;
  justify-content: space-between;
  align-items: center;

`;
const ChaperItemText = styled.Text`
  text-align: center;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.24px;
  color: #2A5B9C;
`;
const CheckIcon = styled.Image`
  tint-color: blue;
  margin-right: 24px;
`;


export default memo(BookDetailScreen);
