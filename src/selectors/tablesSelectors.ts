import {RootState} from "../store";

export const selectIdToTableDataMap = (state: RootState) => state?.tables?.data;
export const selectTablesOrder= (state: RootState) => state?.tables?.order;
export const selectCurrentSelectedTableId = (state: RootState) => state?.tables?.currentSelectedTableId;
export const selectTableById = (state: RootState, tableId: string) => state?.tables?.data?.[tableId as keyof {}];

