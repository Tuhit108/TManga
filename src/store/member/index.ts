import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { RawMember, } from "@/types";
import { createDynamicReducer } from "@/utils/createDynamicReducers";
import { batch } from "react-redux";

const { setStore, reducer, sync, useByKey, setQueries, removeByKey, useKeysByQuery } =
  createDynamicReducer<RawMember>("member", "id");

export const setMemberStore = setStore;
export const memberReducer = reducer;
export const useMember = useByKey;
export const syncMember = sync;
export const setMemberQueries = setQueries;
export const removeMemberByKey = removeByKey;
export const useMembersByQuery = useKeysByQuery;

export const syncAllMembers = (accessories: RawMember[]) => {
  let query: { [id: string]: string[] } = {};
  let ids: string[] = [];

  for (let access of accessories) {
    ids.push(access.id.toString());
  }
  batch(() => {
    syncMember(accessories);
    setMemberQueries({
      all: ids,
      ...query
    });
  });
};


export const useMemberIds = () => {
  return useMembersByQuery("all") || [];
};
