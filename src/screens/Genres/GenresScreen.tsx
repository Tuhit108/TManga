import * as React from "react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Text } from "react-native";
import styled from "styled-components/native";
import { TabHeader } from "@/component/TabHeader";
import useAsyncFn from "@/hooks/useAsyncFn";
import { LIST_GENRES } from "@/store/books/apinettruyen/get_list_genres";
import { IC_CHECK } from "@/assets";
import { navigateToGenresDetailScreen } from "@/utils/navigation";
import { data } from "@/store/books/genres";

const GenresScreen =() => {
  // const [data,setData] = useState()
  // const [{loading: refreshing}, getList] = useAsyncFn( async ()=> {
  //     const res = await LIST_GENRES();
  //     setData(res)
  //     console.log("hihi", res);
  //   }
  //   , [data])
  // useEffect(() => {
  //   getList().then();
  // }, []);

  const renderItem = useCallback(({ item, index }: { item: string, index: number }) => {
    const selectGenres = () => {
      navigateToGenresDetailScreen({
        id: item.url,
        name: item.name
      })
    };

    return <GenresItem id={index} onPress={selectGenres}>
      <GenresItemText>{item.name}</GenresItemText>
      {/*{chap === item.chapter_name ? <CheckIcon source={IC_CHECK} /> : null}*/}
    </GenresItem>;
  }, []);
  return (
    <WrapperView>
      <TabHeader title={"Thể loại"} />
      <FlatList
        removeClippedSubviews={true}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        data={data}
        numColumns={2}
        renderItem={renderItem}

      />
    </WrapperView>
  );
};
const WrapperView = styled.View`
flex: auto;
`;
const GenresItem = styled.TouchableOpacity`
  height: 44px;
  border-bottom-width: 1px;
  border-color: #dad3d350;
  align-items: center;
  justify-content: center;
  width: 50%;
`

const GenresItemText = styled.Text`
  text-align: center;
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 0.24px;
  color: #2A5B9C;
`;
export default memo(GenresScreen);
