import {RootState} from "../store";
import sumBy from "lodash/sumBy";

export const selectIdToTableDataMap = (state: RootState) => state?.tables?.data;
export const selectTablesOrder= (state: RootState) => state?.tables?.order;
export const selectTableById = (state: RootState, tableId: string) => state?.tables?.data?.[tableId as keyof {}];
export const selectGuestsCount = (state: RootState) => {
    const temp = Object.values(selectIdToTableDataMap(state));
    return sumBy(temp, 'guests');
};
export const selectMaxGuestsCount = (state: RootState) => {
    const temp = Object.values(selectIdToTableDataMap(state));
    return sumBy(temp, 'maxGuests');
};
export const selectFreeSpaceCount = (state: RootState) => selectMaxGuestsCount(state) - selectGuestsCount(state);

export const selectFreeTablesCount = (state: RootState) => {
    return Object.values(selectIdToTableDataMap(state)).filter(o => !o?.guests).length
}

