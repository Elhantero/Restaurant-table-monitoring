import {createSlice} from '@reduxjs/toolkit';
import keyBy from 'lodash/keyBy';
import tableDataGenerator from "../helpers/tableDataGenerator";
import {RootState} from "../store";

const tablesSlice = createSlice({
  name: 'tables',
  initialState: {
    data: {},
    order: [],
    status: '',
    error: '',
  },
  reducers: {
    // no server, just emulation
    fetchTablesData: (state: RootState) => {
      const data = keyBy(tableDataGenerator(), 'id');
      const order = Object.keys(data);
      order.sort((a, b) => Number(a) - Number(b));
      state.data = data;
      state.order = order;
      state.status = 'loaded';
    },
    changeWarningByTableId: (state: RootState, action) => {
      const {id, warning}: { id: string, warning: boolean } = action.payload;
      if (id) {
        state.data[id] = {
          ...state.data[id],
          warning,
        };
      }
    },
  },
});

export const {
  fetchTablesData,
  changeWarningByTableId,
} = tablesSlice.actions;

export default tablesSlice.reducer;
