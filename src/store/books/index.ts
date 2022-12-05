import { RawProject } from "@/types";
import { batch, useSelector } from "react-redux";
import { createDynamicReducer } from "@/utils/createDynamicReducers";
import { RootState } from "@/store";
interface RawBook{
  id: string;
  bookImg: string;
  title: string;
  view : string
}

const { setStore, reducer, sync, useByKey, setQueries, removeByKey, useKeysByQuery } =
  createDynamicReducer<RawBook>("books", "id");

export const setBookStore = setStore;
export const bookReducer = reducer;
export const useBook = useByKey;
export const syncBook = sync;
export const setBookQueries = setQueries;
export const removeBookByKey = removeByKey;
export const useBooksByQuery = useKeysByQuery;

export const syncAllBooks = (accessories: RawBook[]) => {
  let query: { [id: string]: string[] } = {};
  let ids: string[] = [];

  for (let access of accessories) {
    ids.push(access.id.toString());
  }
  batch(() => {
    syncBook(accessories);
    setBookQueries({
      all: ids,
      ...query
    });
  });
};


export const useBookIds = () => {
  return useBooksByQuery("all") || [];
};



