import * as React from "react";
import { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { TabHeader } from "@/component/TabHeader";
import { BookItem } from "@/screens/Home/component/BookItem";
import { navigateToCreateTaskScreen, navigateToDetailScreen } from "@/utils/navigation";
import { useTask, useTaskIds } from "@/store/tasks";
import useAsyncFn from "@/hooks/useAsyncFn";
import { useUser } from "@/store/constant";
import { requestGetTaskList } from "@/store/tasks/funtions";
import { requestGetListMember } from "@/store/member/functions";
import { formatDate } from "@/utils/date";
import { IC_ADD_TASK } from "@/assets";
import { defaultParams } from "@/utils";
import Carousel from 'react-native-snap-carousel';
import  { LIST_BOOKS,HOT_BOOKS, } from "@/store/books/functions";
import { useBook, useBookIds } from "@/store/books";
import { LATEST_UPDATE } from "@/store/books/apimanhuarock/latest_update_list";

interface ItemProps {
  id: string;
}
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const TaskItemCB = memo((props: ItemProps) => {
  const { id } = props;
  const book = useBook(id)

  return (

    <TaskItemView  key={id} >
      <BookItem name={book?.title || ""}
                img={book?.bookImg || ""}
                status={book?.latest}
                url={book?.id}
      />
    </TaskItemView>
  );
});

const keyExtractor = (item: any) => item.toString();

const renderItem = ({ item, index }: { item: string, index: number }) => {
  return <TaskItemCB id={item} />;
};

const HomeScreen = () => {
  const user = useUser();
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(1);
  const taskIds = useTaskIds();
  const bookIds = useBookIds()
  const [hot,setHot] = useState([])
const [data,setData] = useState([])
  const isCarousel = React.useRef(null)

  const getData = useCallback(async () => {
    const res = await HOT_BOOKS();
    setHot(res)
  }, [])


  const [{loading: refreshing}, getList] = useAsyncFn( async ()=>{
      const res = await LATEST_UPDATE(page);
      setData(res)
      console.log("hihi",res);
      if (!res.length || res.length < 30) {
        setIsLastPage(true);
      } else {
        setIsLastPage(false);
      }
  }

  , [page])

  const onRefresh = useCallback(() => {
    setPage(1)
    getList().then()
  }, []);


  const onPressNext = useCallback(() => {
    setPage(page + 1);

  }, [ page]);

  useEffect(() => {

    getList().then();
  }, [page]);

  useEffect(() => {
    getData().then();
  }, []);

  const renderFooter = useCallback(() => {
    return (
      <FooterView>
        <PageView>
          <PreButton>
            <PreText>Trước</PreText>
          </PreButton>
          <PageText>{page}</PageText>
          <NextButton onPress={onPressNext}>
            <PreText>Sau</PreText>
          </NextButton>
        </PageView>


      </FooterView>);
  }, [loadingMore, isLastPage]);

  const CarouselCardItem = ({ item, index }) => {
    return (
      <CarouselView  key={index}>
        <CarouselImage
          source={{ uri: item.bookImg }}
        />
        <CarouselText >{item.title}</CarouselText>
      </CarouselView>
    )
  }

  return (
    <WrapperView>
      <TabHeader title={"Trang chủ"} />

      <View style={ {flex : 1}}>
        <CarouselSectionView>
          <Carousel
            layout="default"
            ref={isCarousel}
            data={hot}
            autoplay={true}
            renderItem={CarouselCardItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
          />
        </CarouselSectionView>

        < SectionText>Truyện mới cập nhật</SectionText>
        <FlatList
          removeClippedSubviews={true}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          data={bookIds}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListFooterComponent={renderFooter}
          onEndReachedThreshold={1}

        />


      </View>


      <AddTaskButton onPress={LATEST_UPDATE}>
        <AddTask source={IC_ADD_TASK} />
      </AddTaskButton>
    </WrapperView>
  );
};

const WrapperView = styled.View`
  flex: auto;
  background-color: white;
`;
const SectionText = styled.Text`
  padding: 12px;
  font-size: 20px;
  font-weight: bold;
  `
const CarouselSectionView = styled.View`
  width: ${ITEM_WIDTH}px;
  height: 250px;
`;
const CarouselView = styled.View`
  padding-top: 10px;
  background-color: white;
  width: ${ITEM_WIDTH}px;
`;
const CarouselImage = styled.Image`
  width: ${ITEM_WIDTH}px;
  border-radius: 10px;
  height: 200px;
  
`;
const CarouselText = styled.Text`
  padding-top: 10px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`
const PageView = styled.View`
  flex-direction: row ;
  justify-content: center;
`
const PageText = styled.Text`
  line-height: 40px;
  padding-left: 12px;
  padding-right: 12px;
`
const PreButton = styled.TouchableOpacity`
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 40px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  elevation: 15;
`;
const NextButton = styled.TouchableOpacity`
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 40px;
 border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  elevation: 15;
`;
const PreText = styled.Text``
const AddTaskButton = styled.TouchableOpacity`
  position: absolute;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  right: 20px;
  bottom: 20px;
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  elevation: 15;
`;
const AddTask = styled.Image`
  width: 20px;
  height: 20px;
`;
const TaskItemView = styled.TouchableOpacity`
`
const LastPageText = styled.Text`
  margin-top: 20px;
`;
const FooterView = styled.View`
  align-items: center;
`;

export default memo(HomeScreen);
