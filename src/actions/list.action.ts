import { createAction, createSelector } from '@ngrx/store';

export const setList = createAction('[App Component] SET_LIST',
(list = []) => ({ list }));
export const startLoader = createAction('[App Component] START_LOADER');
export const stopLoader = createAction('[App Component] STOP_LOADER');

export const selectFeature = (state: any) => state.listData;
 
export const selectFeatureCount = createSelector(
  selectFeature,
  (state: any) => state.emailList
);
export const loader = createSelector(
  selectFeature,
  (state: any) => state.loader
);