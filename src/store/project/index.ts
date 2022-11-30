import { RawProject } from "@/types";
import { batch, useSelector } from "react-redux";
import { createDynamicReducer } from "@/utils/createDynamicReducers";
import { RootState } from "@/store";


const { setStore, reducer, sync, useByKey, setQueries, removeByKey, useKeysByQuery } =
  createDynamicReducer<RawProject>("project", "id");

export const setProjectStore = setStore;
export const projectReducer = reducer;
export const useProject = useByKey;
export const syncProject = sync;
export const setProjectQueries = setQueries;
export const removeProjectByKey = removeByKey;
export const useProjectsByQuery = useKeysByQuery;

export const syncAllProjects = (accessories: RawProject[]) => {
  let query: { [id: string]: string[] } = {};
  let ids: string[] = [];

  for (let access of accessories) {
    ids.push(access.id.toString());
  }
  batch(() => {
    syncProject(accessories);
    setProjectQueries({
      all: ids,
      ...query
    });
  });
};


export const useProjectIds = () => {
  return useProjectsByQuery("all") || [];
};



