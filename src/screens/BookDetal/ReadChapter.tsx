import * as React from "react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity
} from "react-native";
import styled from "styled-components/native";
import { TabHeader } from "@/component/TabHeader";
import useAsyncFn from "@/hooks/useAsyncFn";
import { LIST_GENRES } from "@/store/books/apinettruyen/get_list_genres";
import { IC_BACK, IC_CHECK, IC_OPTION } from "@/assets";
import { useNavigationParams } from "@/hooks/useNavigationParams";
import { DetailScreenProps, GenresProps } from "@/types";
import { goBack } from "@/utils/navigation";
import { statusBarHeight } from "@/themes/styles";
import { BookItem } from "@/screens/Home/component/BookItem";
import { LIST_BY_GENRES } from "@/store/books/apinettruyen/list_by_genres";
import READING_CHAPTER from "@/store/books/apimanhuarock/get_chapter_content";
import { longPressHandlerName } from "react-native-gesture-handler/lib/typescript/handlers/LongPressGestureHandler";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const ReadChapter =() => {
  const params = useNavigationParams<GenresProps>();
  const [data,setData] = useState()
  const [page,setPage] = useState(1)
  const bookId = useMemo(() => {
    return params?.id || "";
  }, [params]);
  console.log(bookId);
  const [{loading: refreshing}, getList] = useAsyncFn( async ()=> {
      console.log("url",bookId);

      const res = await READING_CHAPTER(bookId );
      setData(res)
      console.log("resaaaaa",res);
    }
    , [data,page])
  const onRefresh = useCallback(() => {
    setPage(1);
    getList().then()
  }, []);
  useEffect(() => {
    getList().then();
  }, []);

  const _renderItem = ({ item, index }: { item: string, index: number }) => {
    console.log("âja",item);

    return <ItemView>
    <ImgItem id={index}  source={{uri:item}}/>
    </ItemView>
    ;
  };
  const keyExtractor = (item: any) => item.toString();


  return (
    <WrapperView>
      <HeaderView>
        <TouchableOpacity onPress={goBack}>
          <BackIc source={IC_BACK} />
        </TouchableOpacity>
        <HeaderText numberOfLines={1}>{params?.name}</HeaderText>
        <OptionImage  />
      </HeaderView>
      {refreshing ?<ActivityIndicator size={"large"} color={"#626262"} />:null}
      <ContainerItem>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={data}
          renderItem={_renderItem}
          keyExtractor={keyExtractor}

        />
      </ContainerItem>

    </WrapperView>
  );
};
const WrapperView = styled.View`
flex: auto;
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
const ImgItem = styled.Image`
  width: ${windowWidth}px;
  height: auto;
  height: 700px;
`
const ContainerItem = styled.ScrollView`
  background-color: #ef3bbb;
`
const ItemView = styled.View`
`
export default memo(ReadChapter);
