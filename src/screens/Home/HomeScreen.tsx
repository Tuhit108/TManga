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
import { TaskItem } from "@/screens/Home/component/TaskItem";
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
import HOT_BOOKS from "@/store/books/functions";

interface ItemProps {
  id: string;
}
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const TaskItemCB = memo((props: ItemProps) => {
  const { id } = props;
  const task = useTask(id);

  const onPressTask = useCallback(() => {
    navigateToDetailScreen({ id: id });
  }, []);
  return (
    <TouchableOpacity onPress={onPressTask} key={id}>
      <TaskItem taskName={task?.name || ""}
                date={formatDate(task?.deadline) || "Không có deadline"}
                avatar={task?.avatar || ""}
                status={(task?.complete == "100.00")}
                userId={task?.user_id || ""}
      />
    </TouchableOpacity>
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
const [data,setData] = useState([])
  const isCarousel = React.useRef(null)

  const getData = useCallback(async () => {
    const res = await HOT_BOOKS();
    console.log("reload");
    setData(res)
  }, [])

  const _getList = useCallback(async (refreshing?: boolean, loadingMorePage?: boolean) => {

    const taskParams = {
      access_token: user.access_token,
      client_key: user.client_key,
      page: loadingMorePage ? page : 1,
      ...defaultParams
    };

    const res = await requestGetTaskList(taskParams);

    if (!res.length || res.length < 50) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
    setLoadingMore(false);

  }, [page,user])

  const [{loading: refreshing}, refresh] = useAsyncFn(async () => _getList(true), [_getList])
  const [{loading: loadingMorePage}, loadMore] = useAsyncFn(async () => _getList(false, true), [_getList])

  const onRefresh = useCallback(() => {
    setPage(1)
    refresh().then()
  }, []);

  const getListMember = useCallback(async () => {
    await requestGetListMember({
      access_token: user.access_token,
      client_key: user.client_key,
      ...defaultParams
    });
  }, [user]);

  const handleLoadMore = useCallback(() => {
    if (loadingMore || loadingMorePage || isLastPage ) {
      return;
    }
    console.log(new Date());
    setLoadingMore(true);
    setPage(page + 1);

  }, [loadingMorePage, loadingMore, page, isLastPage]);

  useEffect(() => {
    loadMore().then();
  }, [page]);

  useEffect(() => {
    getData().then();
  }, []);

  const renderFooter = useCallback(() => {
    return (
      <FooterView>
        {loadingMore ? (
          <View
            style={{
              width: "100%",
              height: 150,
              alignItems: "center",
              justifyContent: "center"
            }}>
            <ActivityIndicator size={"large"} color="pink" />
          </View>
        ) : null}
        {(isLastPage && page > 1) ? (
          <LastPageText>hết</LastPageText>
        ) : null}
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
      <Carousel
        layout="default"
        ref={isCarousel}
        data={data}
        autoplay={true}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
      />
      <View style={{flex: 1, height: '100%'}}>

        <FlatList
          removeClippedSubviews={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={taskIds}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={handleLoadMore}
          ListFooterComponent={renderFooter}
          onEndReachedThreshold={1}

        />
      </View>


      <AddTaskButton onPress={navigateToCreateTaskScreen}>
        <AddTask source={IC_ADD_TASK} />
      </AddTaskButton>
    </WrapperView>
  );
};

const WrapperView = styled.View`
  flex: auto;
  background-color: white;
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

const LastPageText = styled.Text`
  margin-top: 20px;
`;
const FooterView = styled.View`
  align-items: center;
`;

export default memo(HomeScreen);
