import { createReducer, on } from '@ngrx/store';
import { setList, startLoader, stopLoader } from 'src/actions/list.action';

export const initialState = {
    emailList: [],
    loader: false
};

export const listReducer = createReducer(initialState,
  on(setList, (state, {list}) => {
    return {
        ...state,
        emailList: list
    }
  }),
  on(startLoader, (state) => {
    return {
      ...state,
      loader: true
  }
  }),
  on(stopLoader, (state) => {
    return {
      ...state,
      loader: false
  }
  })
);