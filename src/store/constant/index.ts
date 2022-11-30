import {createSlice,  PayloadAction, Store} from '@reduxjs/toolkit'
import { combineReducers} from 'redux'
import { useSelector } from "react-redux";
import { RawUser } from "@/types";



const initialState = {};
const initialClient = {};

const client = createSlice({
  name: 'client',
  initialState:initialClient,
  reducers: {
    setClient: (state, action: PayloadAction<any>) => {
      if (action.payload) {
        return {
          ...action.payload
        }
      }
      return null
    },
  }
});
const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      if (action.payload) {
        return {
          ...action.payload
        }
      }
      return null
    },
  }
});


export const constantReducer = combineReducers({
  user: user.reducer,
  client: client.reducer,
});
let _store: Store | undefined;

export const constantSetStore = (store: Store) => {
  _store = store;
};

export const setUserAction = (data?: RawUser) => {
  _store && _store.dispatch(user.actions.setUser(data))
};
export const useUser = () => {
  return useSelector((state:any) => {
    return state.constant.user
  });
};


