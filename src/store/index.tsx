import {applyMiddleware, createStore, combineReducers} from 'redux';
import { persistReducer} from 'redux-persist';
import {setTaskStore, taskReducer} from './tasks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {composeWithDevTools} from 'redux-devtools-extension';
import { constantReducer, constantSetStore,  } from "@/store/constant";
import { projectReducer, setProjectStore } from "@/store/project";
import { memberReducer, setMemberStore } from "@/store/member";
import { bookReducer, setBookStore } from "@/store/books";
const middlewares: any[] = [];

const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

const reducers = combineReducers({
  tasks: taskReducer,
  books: bookReducer,
  constant: constantReducer,
  project: projectReducer,
  member: memberReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer, enhancer);
export type RootState = ReturnType<typeof store.getState>;
setBookStore(store)
setTaskStore(store);
setProjectStore(store);
constantSetStore(store);
setMemberStore(store)
