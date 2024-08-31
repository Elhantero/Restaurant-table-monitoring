import { createSlice, createAsyncThunk, AsyncThunkAction } from '@reduxjs/toolkit';
import keyBy from 'lodash/keyBy';
import tableDataGenerator from "../helpers/tableDataGenerator";

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
    fetchTablesData: (state, action) => {
      const data = keyBy(tableDataGenerator(), 'id');
      const order = Object.keys(data);
      order.sort((a, b) => Number(a) - Number(b));
      state.data = data;
      state.order = order;
      state.status = 'loaded';
    },
    changeWarningByTableId: (state, action) => {
      const {id, warning} : { id: string, warning: boolean } = action.payload;
      console.log(id, warning, 'tableSlices.ts', 26)
      if(id) {
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
