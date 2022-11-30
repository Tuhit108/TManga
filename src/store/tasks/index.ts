import { RawTask } from "@/types";
import { batch } from "react-redux";
import { createDynamicReducer } from "@/utils/createDynamicReducers";
import { store } from "@/store";


const { setStore, reducer, sync, useByKey, setQueries, removeByKey, useKeysByQuery } =
  createDynamicReducer<RawTask>("tasks", "id");

export const setTaskStore = setStore;
export const taskReducer = reducer;
export const useTask = useByKey;
export const syncTask = sync;
export const setTaskQueries = setQueries;
export const removeTaskByKey = removeByKey;
export const useTasksByQuery = useKeysByQuery;

export const syncAllTasks = (accessories: RawTask[]) => {
  let query: { [id: string]: string[] } = {};
  let ids = store.getState()?.tasks?.query['all'] || [];


  for (let access of accessories) {
    ids = ids.concat([access.id.toString()]);
  }
  batch(() => {
    syncTask(accessories);
    setTaskQueries({
      all:[...new Set(ids)],
      ...query
    });
  });
};

export const addTasksBefore = (accessories: RawTask) => {
  let ids = store.getState()?.tasks?.query['all'] || [];


  batch(() => {
    syncTask([accessories]);
    setTaskQueries({
      all:[...new Set([accessories.id,...ids])],
    });
  });
};

export const replaceAllIds = (accessories: RawTask[]) => {

  batch(() => {
    syncTask(accessories);
    setTaskQueries({
      all: accessories.map(item => item.id),
    });
  });
};


export const useTaskIds = () => {
  return useTasksByQuery("all") || [];
};




