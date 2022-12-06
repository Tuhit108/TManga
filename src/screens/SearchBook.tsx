import * as React from "react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, RefreshControl, ScrollView, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { TabHeader } from "@/component/TabHeader";
import useAsyncFn from "@/hooks/useAsyncFn";
import { LIST_GENRES } from "@/store/books/apinettruyen/get_list_genres";
import { IC_BACK, IC_CHECK, IC_OPTION, IC_SEARCH } from "@/assets";
import { useNavigationParams } from "@/hooks/useNavigationParams";
import { DetailScreenProps, GenresProps } from "@/types";
import { goBack } from "@/utils/navigation";
import { statusBarHeight } from "@/themes/styles";
import { BookItem } from "@/screens/Home/component/BookItem";
import { LIST_BY_GENRES } from "@/store/books/apinettruyen/list_by_genres";
import { SEARCH_MANGA } from "@/store/books/apimanhuarock/search_manga";

const SearchBook =() =>{
  const [data,setData] = useState()
 const [searchText, onChangeSearchText] = useState("");
  const [page,setPage] = useState(1)
  const [{loading: refreshing}, getList] = useAsyncFn( async (search)=> {

      const res = await SEARCH_MANGA(search);
      setData(res)

    }
    , [data,searchText])
  const onRefresh = useCallback(() => {
    getList('').then()
  }, []);
  const onPressSearch = useCallback(()=>{
    getList(searchText).then()
  },[searchText])

  console.log("s",data);

  const renderItem = ({ item, index }: { item: string, index: number }) => {
    return <BookItem id={index} img={item.bookImg} name={item.title} status={item.latest} url={item.id} />;
  };
  const keyExtractor = (item: any) => item.toString();
  return (
    <WrapperView>
      <HeaderView>
        <TouchableOpacity onPress={goBack}>
          <BackIc source={IC_BACK} />
        </TouchableOpacity>
        <HeaderText numberOfLines={1}>Tìm truyện</HeaderText>
        <OptionImage  />
      </HeaderView>
      <SearchView>
        <SearchChildView>
          <IC_SEARCHonImage source={IC_SEARCH} />
          <SearchTextInput
            onChangeText={onChangeSearchText}
            value={searchText}
            placeholder="Tìm truyện"
          />
          <SearchButton onPress={onPressSearch}>
            <SearchTextButton>Tìm</SearchTextButton>
          </SearchButton>
        </SearchChildView>
      </SearchView>
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
const SearchButton = styled.TouchableOpacity`
  background-color: #2A5B9C;
  height: 44px;
  width: 64px;
  right: 12px;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`
const SearchTextButton = styled.Text`
color: white;
`
const SearchView = styled.View`
  height: 60px;
  background-color: #FFFFFF;
  align-items: center;
  justify-content: center;
`;
const SearchChildView = styled.View`
  background-color: #F9F9F9;
  align-items: center;
  width: 95%;
  height: 44px;
  bottom: 4px;
  flex-direction: row;
  border-radius: 6px;
`;
const IC_SEARCHonImage = styled.Image`
  width: 14px;
  height: 14px;
  margin-left: 10px;
  margin-right: 8px;
  tint-color: black
`;
const SearchTextInput = styled.TextInput`
  width: 80%;
  height: 44px;
`;

export default memo(SearchBook);
