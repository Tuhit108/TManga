import * as React from "react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, Text, TouchableOpacity } from "react-native";
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
import { LIST_BY_GENRES } from "@/store/books/apimanhuarock/list_by_genres";

const GenresDetail =() => {
  const params = useNavigationParams<GenresProps>();
  const [data,setData] = useState()
  const [page,setPage] = useState(1)
  const bookId = useMemo(() => {
    return params?.id || "";
  }, [params]);
  const [{loading: refreshing}, getList] = useAsyncFn( async ()=> {

      const res = await LIST_BY_GENRES(bookId);
      setData(res)
      console.log("resss",res);
    }
    , [data,page])
  const onRefresh = useCallback(() => {
    setPage(1)
    console.log(" hihi");
    getList().then()
  }, []);
  useEffect(() => {
    getList().then();
  }, []);

  const renderItem = ({ item, index }: { item: string, index: number }) => {
    return <BookItem id={index} img={item.bookImg} name={item.title} status={item.latest} url={item.id}/>;
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
      <ScrollView>
        <FlatList
          removeClippedSubviews={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReachedThreshold={1}

        />
      </ScrollView>

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
export default memo(GenresDetail);
